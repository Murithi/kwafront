import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { Table, Header, Message, Icon, Tab } from 'semantic-ui-react'
import _ from 'lodash'

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
			<Message.Header>No Vehicle Owners with that ID Found</Message.Header>
		</Message.Content>
	</Message>
)

const timeoutMessage = (
	<Message icon negative>
		<Icon name="wait" />
		<Message.Content>
			<Message.Header>Error Processing Request</Message.Header>
			Is the backend server running?
		</Message.Content>
	</Message>
)
class VehicleFuelRequisitions extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		if (this.props.fueldetail.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.fueldetail.loading) {
			return <div>{timeoutMessage}</div>
		}
		console.log(this.props)
		const { getVehicle } = this.props.fueldetail
		if (_.isEmpty(getVehicle)) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Tab.Pane attached={false}>
				<Header as="h4" color="green" textAlign="center">
					Fuel Requisitions
				</Header>

				<Table celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Amount Charged</Table.HeaderCell>
							<Table.HeaderCell>Other Details</Table.HeaderCell>
							<Table.HeaderCell> Requested By</Table.HeaderCell>
							<Table.HeaderCell>Approved By</Table.HeaderCell>
							<Table.HeaderCell>Request Date </Table.HeaderCell>
							<Table.HeaderCell> Approval Date</Table.HeaderCell>
							<Table.HeaderCell> Date Issued</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{getVehicle.fuelrequests.map(request => {
							if (request.paymentsDetails !== null) {
								return (
									<Table.Row>
										<Table.Cell>
											{request.paymentsDetails.amountCharged}
										</Table.Cell>
										<Table.Cell>{request.otherDetails}</Table.Cell>
										<Table.Cell>
											{request.requestedBy.personnelDetails.firstName}{' '}
											{request.requestedBy.personnelDetails.lastName}
										</Table.Cell>
										<Table.Cell>
											{request.requestApprovedBy.personnelDetails.firstName}{' '}
											{request.requestApprovedBy.personnelDetails.lastName}
										</Table.Cell>
										<Table.Cell>
											{moment(request.requestDate).format('MMM DD YYYY')}
										</Table.Cell>
										<Table.Cell>
											{moment(request.approvalDate).format('MMM DD YYYY')}
										</Table.Cell>
										<Table.Cell>
											{moment(request.paymentsDetails.dateIssued).format(
												'MMM DD YYYY',
											)}
										</Table.Cell>
									</Table.Row>
								)
							}
						})}
					</Table.Body>
				</Table>
			</Tab.Pane>
		)
	}
}

const GETFUELDETAILS = gql`
	query getVehicleDetailsQuery($id: ID!, $startDate: String, $endDate: String) {
		getVehicle(id: $id) {
			fuelrequests(startDate: $startDate, endDate: $endDate) {
				id
				requestDate
				approvalDate
				otherDetails
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				requestApprovedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateIssued
				}
			}
		}
	}
`
export default graphql(GETFUELDETAILS, {
	name: 'fueldetail',
	options: props => ({
		variables: {
			id: props.id,
			startDate: props.startDate,
			endDate: props.endDate,
		},
	}),
})(VehicleFuelRequisitions)
