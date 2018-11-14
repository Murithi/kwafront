import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import {
	Container,
	Header,
	Segment,
	Divider,
	Button,
	Icon,
} from 'semantic-ui-react'
import { AUTH_TOKEN } from '../constants'
import Vehicles from './Vehicles'
import LoginForm from './Login'
import HomePage from './HomePage'
import CreateVehicle from './CreateVehicle'
import CreateVehicleOwner from './CreateVehicleOwner'
import VehicleOwnerList from './VehicleOwnerList'
import Signup from './Signup'
class App extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN)

		if (this.props.location.pathname === '/signup') return <Signup />
		return (
			<React.Fragment>
				{authToken ? (
					<Segment>
						<Button
							color="green"
							floated="right"
							onClick={() => {
								localStorage.removeItem(AUTH_TOKEN)
								this.props.history.push(`/`)
							}}
						>
							{' '}
							Log Out{' '}
						</Button>
						<div>
							<Header as="h2" icon textAlign="center">
								<Icon name="home" color="green" circular />

								<Header.Content>
									Karakana Project Management System
								</Header.Content>
							</Header>
						</div>

						<Divider clearing />
						<HomePage />
					</Segment>
				) : (
					<LoginForm />
				)}
			</React.Fragment>
		)
	}
}

export default withRouter(App)
