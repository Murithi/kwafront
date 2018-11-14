import gql from 'graphql-tag'

export default gql`
	query accountFeed {
		accountFeed {
			id
			name
			accountName
			location

			description
			balance {
				id
				balance
			}
		}
	}
`
