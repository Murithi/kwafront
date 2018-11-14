import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import gql from 'graphql-tag'
import { Link, Route } from 'react-router-dom'
import { Table, Grid, Message, Icon, Menu, Header } from 'semantic-ui-react'

import VehicleItem from './VehicleItem'
import Vehicle_Feed_Query from './queries/fetchVehicles'
class Vehicles extends Component {
	state = {
		data: {},
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
					<Link to={'/vehicles/new'} className="ui button primary">
						Add New Vehicle{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.VehicleFeed.errorl}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)
		if (this.props.VehicleFeed && this.props.VehicleFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.VehicleFeed && this.props.VehicleFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (this.props.VehicleFeed.vehicleFeed.length === 0) {
			return <div>{emptyMessage}</div>
		}

		return (
			<div>
				<Header as="h4" color="green" textAlign="center">
					Vehicle List
				</Header>
				<Table celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Reg. No</Table.HeaderCell>
							<Table.HeaderCell>Model</Table.HeaderCell>
							<Table.HeaderCell>Owner </Table.HeaderCell>
							<Table.HeaderCell> Edit</Table.HeaderCell>
							<Table.HeaderCell> Delete</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{this.props.VehicleFeed.vehicleFeed.map(Vehicle => (
							<Table.Row>
								<Table.Cell>
									<Link to={`/vehicles/${Vehicle.id}`}>
										{Vehicle.registrationNumber}
									</Link>
								</Table.Cell>
								<Table.Cell>{Vehicle.model}</Table.Cell>

								<Table.Cell>
									<Link to={`/vehicleowner/${Vehicle.owner.id}`}>
										{Vehicle.owner.name}
									</Link>
								</Table.Cell>
								<Table.Cell>
									<Link to={`/vehicles/edit/${Vehicle.id}`}>
										<Icon name="edit circle green " />
									</Link>
								</Table.Cell>
								<Table.Cell>
									<Icon
										onClick={() => this._deleteVehicle(Vehicle.id)}
										name="delete circle red"
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>

					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="5">
								<Link to={'/vehicles/new'}>
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
			</div>
		)
	}

	_deleteVehicle = async id => {
		await this.props.deleteVehicle({
			variables: { id },
		})
		this.props.VehicleFeed.refetch()
		this.props.history.push('/vehicles/list')
	}
}

const DELETEVEHICLEMUTATION = gql`
	mutation deleteVehicle($id: ID!) {
		removeVehicle(id: $id) {
			id
		}
	}
`

export default compose(
	graphql(Vehicle_Feed_Query, { name: 'VehicleFeed' }),
	graphql(DELETEVEHICLEMUTATION, { name: 'deleteVehicle' }),
)(Vehicles)
