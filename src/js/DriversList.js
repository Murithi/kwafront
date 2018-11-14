import React, { Component } from 'react'
import {
	Divider,
	Grid,
	Header,
	Message,
	Icon,
	Menu,
	Table,
} from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { Link } from 'react-router-dom'
import DRIVERSFEEDQUERY from './queries/fetchDrivers'
import gql from 'graphql-tag'
import { compose } from 'react-apollo'

class DriversList extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		const loadingMessage = (
			<Message icon info>
				<Icon name="circle notched" loading />
				<Message.Content>
					<Message.Header>Just one second</Message.Header>
					We are fetching that content for you.
				</Message.Content>
			</Message>
		)

		const emptyMessage = (
			<Message icon info>
				<Icon name="warning circle" />
				<Message.Content>
					<Message.Header>No Drivers Found</Message.Header>
					<p>Add some new Drivers to get started.</p>
					<Link to={'/drivers/new'} className="ui button primary">
						Add New Driver{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.driversFeed.error}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)
		if (this.props.driversFeed && this.props.driversFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.driversFeed && this.props.driversFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (this.props.driversFeed.driverFeed.length === 0) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 900 }}>
					<Header as="h4" color="green" textAlign="center">
						View Drivers
					</Header>
					<Table celled selectable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>National ID No.</Table.HeaderCell>
								<Table.HeaderCell>First Name</Table.HeaderCell>
								<Table.HeaderCell>Last Name</Table.HeaderCell>
								<Table.HeaderCell>License Number </Table.HeaderCell>
								<Table.HeaderCell>License Expiry Date</Table.HeaderCell>
								<Table.HeaderCell> Delete</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.props.driversFeed.driverFeed.map(driver => (
								<Table.Row>
									<Table.Cell>
										<Link to={`/personnel/${driver.id}`}>
											{driver.personnelDetails.idNumber}
										</Link>
									</Table.Cell>
									<Table.Cell>{driver.personnelDetails.firstName}</Table.Cell>
									<Table.Cell>{driver.personnelDetails.lastName}</Table.Cell>
									<Table.Cell>{driver.licenseNumber}</Table.Cell>

									<Table.Cell>
										{moment(driver.licenseExpiry).format('MMM Do YYYY')}
									</Table.Cell>
									<Table.Cell>
										<Icon
											onClick={() => this._deleteDriver(driver.id)}
											name="delete circle red"
										/>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
						<Table.Footer>
							<Table.Row>
								<Table.HeaderCell colSpan="6">
									<Link to={'/drivers/new'}>
										<Icon name="add circle green right" size="huge" />
									</Link>

									<Menu floated="right" pagination>
										<Menu.Item as="a" icon>
											<Icon name="chevron left" />
										</Menu.Item>
										<Menu.Item as="a">1</Menu.Item>
										<Menu.Item as="a">2</Menu.Item>
										<Menu.Item as="a">3</Menu.Item>
										<Menu.Item as="a">4</Menu.Item>
										<Menu.Item as="a" icon>
											<Icon name="chevron right" />
										</Menu.Item>
									</Menu>
								</Table.HeaderCell>
							</Table.Row>
						</Table.Footer>
					</Table>
				</Grid.Column>
			</Grid>
		)
	}
	_deleteDriver = async id => {
		await this.props.deleteDriver({
			variables: { id },
		})
		this.props.driversFeed.refetch()
		this.props.history.push('/drivers/list')
	}
}

const CREATEDRIVERDELETEMUTATION = gql`
	mutation deleteDriver($id: ID!) {
		removeDriver(id: $id) {
			id
		}
	}
`

export default compose(
	graphql(DRIVERSFEEDQUERY, { name: 'driversFeed' }),
	graphql(CREATEDRIVERDELETEMUTATION, { name: 'deleteDriver' }),
)(DriversList)
