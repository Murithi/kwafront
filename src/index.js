import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './js/App'
// import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from 'apollo-boost'
import { BrowserRouter } from 'react-router-dom'
import { AUTH_TOKEN } from './constants'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const cache = new InMemoryCache()
const defaultState = {
	userDetails: {
		__typename: 'UserDetails',
		userName: '',
		loggedIn: false,
		userRole: '',
	},
	searchedPersonnelDetails: {
		__typename: 'UserCredentials',
		firstName: '',
		lastName: '',
		personnelID: '',
		photoUrl: '',
		assignedAccount: '',
	},
}

const stateLink = withClientState({
	cache,
	defaults: defaultState,
	resolvers: {
		Mutation: {
			updatePersonnel: (_, { index, value }, { cache }) => {
				const query = gql`
					query {
						searchedPersonnelDetails @client {
							firstName
							lastName
							personnelID
							photoUrl
							assignedAccount
						}
					}
				`
				const previous = cache.readQuery({ query })
				const data = {
					searchedPersonnelDetails: {
						...previous.searchedPersonnelDetails,
						[index]: value,
					},
				}

				cache.writeData({ query, data })
			},

			updateUserDetails: (_, { index, value }, { cache }) => {
				const query = gql`
					query {
						userDetails @client {
							userName
							loggedIn
							userRole
						}
					}
				`
				const previous = cache.readQuery({ query })
				const data = {
					userDetails: {
						...previous.userDetails,
						[index]: value,
					},
				}

				cache.writeData({ query, data })
			},
		},
	},
})
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
// const httpLink = new HttpLink({ uri: 'http://165.227.152.127:4000/' });
//  const httpLink = new HttpLink({ uri: 'https://dodkyqakz5.execute-api.eu-west-1.amazonaws.com/staging' });
//configure apollo with authentication token
const middlewareAuthLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	const authorizationHeader = token ? `Bearer ${token}` : null
	operation.setContext({
		headers: {
			authorization: authorizationHeader,
		},
	})
	return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
	link: ApolloLink.from([stateLink, httpLinkWithAuthToken]),
	cache,
})

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root'),
)
