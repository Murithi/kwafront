import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { Table, Message, Icon } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'

import assignedVehiclesFeed from './queries/fetchVehiclesAssigned'

class VehicleAssignmentList extends Component {
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
					<Message.Header>No Vehicles Found</Message.Header>
					<p>Add some new Vehicles to get started.</p>
					<Link to={'/vehicles/assign'} className="ui button primary">
						Add New Vehicle{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>
						{this.props.assignedVehiclesFeed.errorl}
					</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)
		if (
			this.props.assignedVehiclesFeed &&
			this.props.assignedVehiclesFeed.loading
		) {
			return <div>{loadingMessage}</div>
		}

		if (
			this.props.assignedVehiclesFeed &&
			this.props.assignedVehiclesFeed.error
		) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.assignedVehiclesFeed.vehicleAssignmentFeed.length === 0 ||
			this.props.assignedVehiclesFeed.vehicleAssignmentFeed === null
		) {
			return <div>{emptyMessage}</div>
		}

		return (
			<Table celled selectable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Driver Name</Table.HeaderCell>
						<Table.HeaderCell>Vehicle Assigned</Table.HeaderCell>
						<Table.HeaderCell>Date Assigned </Table.HeaderCell>
						<Table.HeaderCell> Date Relieved</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{this.props.assignedVehiclesFeed.vehicleAssignmentFeed.map(
						vehicle => {
							return (
								<Table.Row>
									<Table.Cell>
										{vehicle.assignee.firstName} {vehicle.assignee.lastName}
									</Table.Cell>
									<Table.Cell>
										{vehicle.motorVehicle.registrationNumber}
									</Table.Cell>
									<Table.Cell>
										{moment(vehicle.dateOfAssignment).format('MMM Do YYYY')}
									</Table.Cell>
									<Table.Cell>
										{!vehicle.dateRelieved &&
											moment(vehicle.dateRelieved).format('MMM Do YYYY')}
									</Table.Cell>
								</Table.Row>
							)
						},
					)}
				</Table.Body>
			</Table>
		)
	}
}

export default graphql(assignedVehiclesFeed, { name: 'assignedVehiclesFeed' })(
	VehicleAssignmentList,
)
