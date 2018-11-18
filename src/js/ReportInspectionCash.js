import React, { Component } from 'react'
import {
	Header,
	Table,
	Grid,
	Message,
	Icon,
	Divider,
	Form,
	Segment,
} from 'semantic-ui-react'
import moment from 'moment'
import { compose, graphql } from 'react-apollo'

import _ from 'lodash'

import InlineError from './messages/InlineError'
import getPaymentDetails from './queries/fetchInspectionPaymentDetails'
import getApprovedRequisitions from './queries/fetchInspectionsIssuedCash.js'
import reportPaymentDetails from './mutations/reportPaymentDetails'
import getUserDetails from './queries/getUserDetails'

var paymentIssue_id
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
			<Message.Header>No Payment with that ID Found</Message.Header>
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

class ReportInspectionCash extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errors: {},
			loading: false,
		}
	}

	validate = () => {
		const errors = {}
		if (!this.state.amountCharged) errors.amountCharged = "Can't be blank"
		if (!this.state.recieptNumber) errors.recieptNumber = "Can't be blank"
		if (!this.state.amountReturned) errors.amountReturned = "Can't be blank"
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._addPaymentDetails()
		}

		return errors
	}
	onSubmit = () => {
		const errors = this.validate()
		this.setState({ errors })
	}
	render() {
		const { errors, loading } = this.state
		console.log(this.props.paymentIssue)
		if (this.props.paymentIssue.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.paymentIssue.loading) {
			return <div>{timeoutMessage}</div>
		}

		const { issuedVehicleInspection } = this.props.paymentIssue
		if (issuedVehicleInspection === undefined) {
			return <div>{emptyMessage}</div>
		} else {
			paymentIssue_id = issuedVehicleInspection.paymentsDetails.id
		}
		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 900 }}>
					<Header as="h4" color="green" textAlign="center">
						Report Cash Usage
					</Header>
					<Segment.Group horizontal>
						<Segment>
							<Divider />
							<Table basic="very" celled>
								<Table.Body>
									<Table.Row>
										<Table.Cell>
											<b>Requested By</b>
										</Table.Cell>
										<Table.Cell>
											{
												issuedVehicleInspection.requestedBy.personnelDetails
													.firstName
											}{' '}
											&nbsp;{' '}
											{
												issuedVehicleInspection.requestedBy.personnelDetails
													.lastName
											}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Amount Issued </b>
										</Table.Cell>
										<Table.Cell>
											KES {issuedVehicleInspection.paymentsDetails.amountIssued}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Vehicle Serviced </b>
										</Table.Cell>
										<Table.Cell>
											{
												issuedVehicleInspection.vehicleToBeInspected
													.registrationNumber
											}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Details </b>
										</Table.Cell>
										<Table.Cell>
											{issuedVehicleInspection.otherDetails}
										</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
							<Divider />
							<Form size="large" onSubmit={this.onSubmit} loading={loading}>
								{errors.global && (
									<Message negative>
										<Message.Header> Something went wrong </Message.Header>
										<p>{errors.global}</p>
									</Message>
								)}
								<Form.Field error={!!errors.amountCharged}>
									<label>Amount Charged</label>
									<input
										type="number"
										value={this.state.amountCharged}
										onChange={e =>
											this.setState({ amountCharged: e.target.value })
										}
									/>
									{errors.amountCharged && (
										<InlineError text={errors.amountCharged} />
									)}
								</Form.Field>
								<Form.Field error={!!errors.recieptNumber}>
									<label>Reciept/Invoice No. </label>
									<input
										value={this.state.recieptNumber}
										onChange={e =>
											this.setState({ recieptNumber: e.target.value })
										}
									/>
									{errors.recieptNumber && (
										<InlineError text={errors.recieptNumber} />
									)}
								</Form.Field>
								<Form.Field error={!!errors.amountReturned}>
									<label>Amount Returned</label>
									<input
										type="number"
										value={this.state.amountReturned}
										onChange={e =>
											this.setState({ amountReturned: e.target.value })
										}
									/>
									{errors.amountReturned && (
										<InlineError text={errors.amountReturned} />
									)}
								</Form.Field>
								<Form.Button fluid positive>
									Submit
								</Form.Button>
							</Form>
						</Segment>
					</Segment.Group>
				</Grid.Column>
			</Grid>
		)
	}

	_addPaymentDetails = async () => {
		const { amountCharged, recieptNumber, amountReturned } = this.state

		const dateReported = moment().format()
		let requestId = this.props.match.params.id
		await this.props.addPaymentDetails({
			variables: {
				paymentIssue_id,
				amountCharged,
				recieptNumber,
				amountReturned,
				dateReported,
				requestId,
			},
			refetchQueries: [{ query: getApprovedRequisitions }],
		})
		this.props.history.push('/inspectionrequisitions/issued')
	}
}

export default compose(
	graphql(getPaymentDetails, {
		name: 'paymentIssue',
		options: props => ({
			variables: {
				id: props.match.params.id,
			},
		}),
	}),
	graphql(reportPaymentDetails, {
		name: 'addPaymentDetails',
	}),
	graphql(getUserDetails, { name: 'userDetails' }),
)(ReportInspectionCash)
