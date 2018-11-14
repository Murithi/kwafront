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
import _ from 'lodash'

import InitiatedRequisitionsQuery from './queries/fetchSalaryRequests'
import getUserDetails from './queries/getUserDetails'
import getSalaryRequisition from './queries/fetchSalaryRequestById'

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

class SalaryRequestApprove extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	handleApprovalDateChange = date => {
		this.setState({ approvalDate: date })
	}
	render() {
		const { loading } = this.state

		if (this.props.salaryRequest.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.salaryRequest.loading) {
			return <div>{timeoutMessage}</div>
		}
		const { initiatedSalaryRequest } = this.props.salaryRequest
		if (!initiatedSalaryRequest) {
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
						Advance Request Details
					</Header>
					<Segment.Group horizontal>
						<Segment>
							<p>
								<b>Employee Seeking Salary:</b>{' '}
								{initiatedSalaryRequest.payee.firstName} &nbsp;{' '}
								{initiatedSalaryRequest.payee.lastName}
							</p>
							<Divider />
							<p>
								<b>Amount Requested:</b>{' '}
								{initiatedSalaryRequest.amountRequested}
							</p>
							<Divider />
							<p>
								<b>Other Details:</b> {initiatedSalaryRequest.otherDetails}
							</p>
							<Divider />
							<p>
								<b>Requested By:</b>{' '}
								{initiatedSalaryRequest.requestedBy.personnelDetails.firstName}{' '}
								&nbsp;{' '}
								{initiatedSalaryRequest.requestedBy.personnelDetails.lastName}
							</p>
							<Divider />
							<p>
								<b>Requested On:</b>{' '}
								{moment(initiatedSalaryRequest.requestDate).format(
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
		const salaryrequestId = this.props.match.params.id
		if (!this.state.approvalDate) {
			var approvalDate = moment().format()
		} else {
			var approvalDate = this.state.approvalDate
		}
		await this.props.approveSalaryRequest({
			variables: { salaryrequestId, approvalDate, approvalStatus },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedRequisitionsQuery },
			],
		})
		this.props.history.push('/salaryrequests/initiated')
	}
}

const APPROVEMUTATION = gql`
	mutation approveSalaryRequest(
		$approvalStatus: Boolean
		$salaryrequestId: ID!
		$approvalDate: String!
	) {
		approveSalaryRequest(
			salaryrequestId: $salaryrequestId
			approvalDate: $approvalDate
			approvalStatus: $approvalStatus
		)
	}
`

export default compose(
	graphql(getSalaryRequisition, {
		name: 'salaryRequest',
		options: props => ({
			variables: {
				salaryrequestId: props.match.params.id,
			},
		}),
	}),
	graphql(APPROVEMUTATION, {
		name: 'approveSalaryRequest',
	}),
	graphql(getUserDetails, {
		name: 'userDetails',
	}),
)(SalaryRequestApprove)
