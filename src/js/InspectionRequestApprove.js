import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {
	Header,
	Table,
	Grid,
	Message,
	Button,
	Icon,
	Menu,
	Divider,
	Form,
	Segment,
	Checkbox,
} from 'semantic-ui-react'
import moment from 'moment'
import gql from 'graphql-tag'
import DatePicker from 'react-datepicker'
import _ from 'lodash'
import { Link, Route } from 'react-router-dom'
import { Query } from 'react-apollo'

import InitiatedRequisitionsQuery from './queries/fetchInspectionRequestsInitiated'
import getInspectionRequisition from './queries/fetchInspectionRequestById'
import getUserDetails from './queries/getUserDetails'

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
			<Message.Header>No Request with that ID Found</Message.Header>
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

class InspectionRequestApprove extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleApprovalDateChange = date => {
		this.setState({ approvalDate: date })
	}

	render() {
		console.log(this.props)
		if (this.props.inspectionRequest.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.inspectionRequest.loading) {
			return <div>{timeoutMessage}</div>
		}
		const { initiatedVehicleInspection } = this.props.inspectionRequest
		if (initiatedVehicleInspection.length === 0) {
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
						Inspection Request Details
					</Header>
					<Segment.Group horizontal>
						<Segment>
							<p>
								<b>Vehicle Registration:</b>{' '}
								{
									initiatedVehicleInspection.vehicleToBeInspected
										.registrationNumber
								}
							</p>
							<Divider />
							<p>
								<b>Approx Cost of Service:</b>{' '}
								{initiatedVehicleInspection.approxCostOfInspection}
							</p>
							<Divider />
							<p>
								<b>Other Details:</b> {initiatedVehicleInspection.otherDetails}
							</p>
							<Divider />
							<p>
								<b>Requested By:</b>{' '}
								{
									initiatedVehicleInspection.requestedBy.personnelDetails
										.firstName
								}{' '}
								&nbsp;{' '}
								{
									initiatedVehicleInspection.requestedBy.personnelDetails
										.lastName
								}
							</p>
							<Divider />
							<p>
								<b>Requested On:</b>{' '}
								{moment(initiatedVehicleInspection.requestDate).format(
									'MMM Do YYYY',
								)}
							</p>
							<Divider />
							<p>
								<b>Approved On:</b>{' '}
								<DatePicker
									selected={this.state.approvalDate}
									onChange={this.handleApprovalDateChange}
								/>
							</p>
							<Divider />
							<Button
								attached="bottom"
								positive
								onClick={() => this._approveRequest(true)}
							>
								<Icon name="check" />
								Approve
							</Button>
							<hr />
							<Button
								attached="bottom"
								color="red"
								onClick={() => this._approveRequest(false)}
							>
								<Icon name="remove" />
								Decline
							</Button>
						</Segment>
					</Segment.Group>
					<Divider />
				</Grid.Column>
			</Grid>
		)
	}
	_approveRequest = async approvalStatus => {
		const id = this.props.match.params.id
		if (!this.state.approvalDate) {
			var approvalDate = moment().format()
		} else {
			var approvalDate = this.state.approvalDate
		}

		await this.props.approveInspectionRequests({
			variables: { id, approvalDate, approvalStatus },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedRequisitionsQuery },
			],
		})
		this.props.history.push('/inspectionrequisitions/initiated')
	}
}

const APPROVEMUTATION = gql`
	mutation approveInspection(
		$id: ID!
		$approvalDate: String!
		$approvalStatus: Boolean
	) {
		approveVehicleInspection(
			vehicleinspectionId: $id
			approvalDate: $approvalDate
			approvalStatus: $approvalStatus
		)
	}
`
export default compose(
	graphql(getInspectionRequisition, {
		name: 'inspectionRequest',
		options: props => ({
			variables: {
				id: props.match.params.id,
			},
		}),
	}),
	graphql(APPROVEMUTATION, {
		name: 'approveInspectionRequests',
	}),
	graphql(getUserDetails, { name: 'userDetails' }),
)(InspectionRequestApprove)
