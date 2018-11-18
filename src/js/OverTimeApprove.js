import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {
	Header,
	Grid,
	Message,
	Button,
	Icon,
	Divider,
	Segment,
} from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import gql from 'graphql-tag'

import InitiatedRequisitionsQuery from './queries/fetchOverTimeRequests'
import getUserDetails from './queries/getUserDetails'
import getOverTimeRequisition from './queries/fetchOverTimeRequestById'

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

class OverTimeApprove extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	handleApprovalDateChange = date => {
		this.setState({ approvalDate: date })
	}
	render() {
		const { loading } = this.state

		if (this.props.overTimeRequest.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.overTimeRequest.loading) {
			return <div>{timeoutMessage}</div>
		}
		const { initiatedOverTimeRequest } = this.props.overTimeRequest
		if (!initiatedOverTimeRequest) {
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
						Overtime Request Details
					</Header>
					<Segment.Group horizontal>
						<Segment>
							<p>
								<b>Employee Seeking Over Time:</b>{' '}
								{initiatedOverTimeRequest.payee.firstName} &nbsp;{' '}
								{initiatedOverTimeRequest.payee.lastName}
							</p>
							<Divider />
							<p>
								<b>Amount Requested:</b>{' '}
								{initiatedOverTimeRequest.amountRequested}
							</p>
							<Divider />
							<p>
								<b>Other Details:</b> {initiatedOverTimeRequest.otherDetails}
							</p>
							<Divider />
							<p>
								<b>Requested By:</b>{' '}
								{
									initiatedOverTimeRequest.requestedBy.personnelDetails
										.firstName
								}{' '}
								&nbsp;{' '}
								{initiatedOverTimeRequest.requestedBy.personnelDetails.lastName}
							</p>
							<Divider />
							<p>
								<b>Requested On:</b>{' '}
								{moment(initiatedOverTimeRequest.requestDate).format(
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
		const overtimerequestId = this.props.match.params.id
		if (!this.state.approvalDate) {
			var approvalDate = moment().format()
		} else {
			var approvalDate = this.state.approvalDate
		}
		await this.props.approveOverTimeRequest({
			variables: { overtimerequestId, approvalDate, approvalStatus },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedRequisitionsQuery },
			],
		})
		this.props.history.push('/overtimerequests/initiated')
	}
}
const APPROVEMUTATION = gql`
	mutation approveoverTimeRequest(
		$approvalStatus: Boolean
		$overtimerequestId: ID!
		$approvalDate: String!
	) {
		approveOverTimeRequest(
			overtimerequestId: $overtimerequestId
			approvalDate: $approvalDate
			approvalStatus: $approvalStatus
		)
	}
`

export default compose(
	graphql(getOverTimeRequisition, {
		name: 'overTimeRequest',
		options: props => ({
			variables: {
				overtimerequestId: props.match.params.id,
			},
		}),
	}),
	graphql(APPROVEMUTATION, {
		name: 'approveOverTimeRequest',
	}),
)(OverTimeApprove)
