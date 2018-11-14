import React, { Component } from 'react'
import {
	Header,
	Table,
	Grid,
	Dropdown,
	Message,
	Button,
	Input,
	Icon,
	Menu,
	Divider,
	Form,
	Segment,
	Checkbox,
} from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import InlineError from './messages/InlineError'
import getFuelRequisition from './queries/fetchFuelRequestById'
import getApprovedRequisitions from './queries/fetchFuelRequestsApproved'
import getAccountFeed from './queries/fetchCashBalFeed'
import getProjectFeed from './queries/fetchProjectList'
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
var accountOptions = []
var projectOptions = []
class FuelRequestsIssueCash extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amountRequested: '',
		}
	}
	handleApprovalDateChange = date => {
		this.setState({ approvalDate: date })
	}
	setAccountValue = (e, data) => {
		accountOptions.forEach(element => {
			if (element.value === data.value) {
				console.log(data.value)
				let result = this.props.accountFeed.accountFeed.find(obj => {
					return obj.name === data.value
				})

				this.setState({ accountchargedId: result.id })
				this.setState({ cashbalId: result.balance.id })
				this.setState({ balbefore: result.balance.balance })
				this.setState({ accountName: result.name })
			}
		})
	}

	setProjectValue = (e, data) => {
		data.options.map(element => {
			if (element.value == data.value) {
				this.setState({ projectId: element.id })
			}
		})
		let project = this.props.projectFeed.projectFeed.find(obj => {
			return obj.name === data.value
		})
	}
	render() {
		if (this.props.fuelRequest.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.fuelRequest.error) {
			return <div>{timeoutMessage}</div>
		}

		const { initiatedFuelRequisition } = this.props.fuelRequest

		if (initiatedFuelRequisition.length === 0) {
			return <div>{emptyMessage}</div>
		}

		if (this.props.accountFeed.loading === false) {
			if (
				this.props.accountFeed.accountFeed !== undefined ||
				this.props.accountFeed.accountFeed.length !== 0
			) {
				let tempOp = [...new Set(this.props.accountFeed.accountFeed)]
				accountOptions = []
				tempOp.map(element => {
					return accountOptions.push({
						id: element.id,
						text: element.name,
						value: element.name,
					})
				})
			}
		}

		if (
			this.props.projectFeed.projectFeed !== undefined ||
			this.props.projectFeed.projectFeed.length !== 0
		) {
			let temporary = [...new Set(this.props.projectFeed.projectFeed)]

			projectOptions = []
			temporary.map(element => {
				return projectOptions.push({
					id: element.id,
					text: element.projectName,
					value: element.projectName,
				})
			})
		}

		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 900 }}>
					<Header as="h4" color="green" textAlign="center">
						Request Details
					</Header>
					<Segment.Group horizontal>
						<Segment>
							<Divider />
							<Table basic="very" celled>
								<Table.Body>
									<Table.Row>
										<Table.Cell>
											<b>Project</b>
										</Table.Cell>
										<Table.Cell>
											<Dropdown
												value={this.state.projectName}
												placeholder="Select Project"
												fluid
												selection
												options={projectOptions}
												onChange={this.setProjectValue.bind(this)}
											/>
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Vehicle Registration</b>
										</Table.Cell>
										<Table.Cell>
											{
												initiatedFuelRequisition.vehicleToBeFueled
													.registrationNumber
											}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Requested By</b>
										</Table.Cell>
										<Table.Cell>
											{
												initiatedFuelRequisition.requestedBy.personnelDetails
													.firstName
											}{' '}
											&nbsp;{' '}
											{
												initiatedFuelRequisition.requestedBy.personnelDetails
													.lastName
											}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Account Issuing From</b>
										</Table.Cell>
										<Table.Cell>
											<Dropdown
												value={this.state.accountName}
												placeholder="Select Account"
												fluid
												selection
												options={accountOptions}
												onChange={this.setAccountValue.bind(this)}
											/>
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Amount Requested </b>
										</Table.Cell>
										<Table.Cell>
											{initiatedFuelRequisition.approxCostOfFuel}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Date Requested </b>
										</Table.Cell>
										<Table.Cell>
											{moment(initiatedFuelRequisition.requestDate).format(
												'MMM Do YYYY',
											)}{' '}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Date Approved </b>
										</Table.Cell>
										<Table.Cell>
											{moment(initiatedFuelRequisition.approvalDate).format(
												'MMM Do YYYY',
											)}{' '}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Other Details </b>
										</Table.Cell>
										<Table.Cell>
											{initiatedFuelRequisition.otherDetails}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Amount Issuing</b>
										</Table.Cell>
										<Table.Cell>
											<Input
												value={initiatedFuelRequisition.approxCostOfFuel}
												onChange={e => {
													this.setState({ amountRequested: e.target.value })
												}}
												type="number"
											/>
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>
											<b>Issued On:</b>
										</Table.Cell>
										<Table.Cell>
											<DatePicker
												selected={this.state.approvalDate}
												onChange={this.handleApprovalDateChange}
											/>
										</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>

							<Divider />

							<Button
								attached="bottom"
								positive
								onClick={() =>
									this._issueCash(
										initiatedFuelRequisition.id,
										initiatedFuelRequisition.approxCostOfFuel,
									)
								}
							>
								Issue Cash
							</Button>
						</Segment>
					</Segment.Group>
					<Divider />
				</Grid.Column>
			</Grid>
		)
	}

	_issueCash = async (requestId, amountIssued) => {
		if (this.state.amountRequested !== '') {
			amountIssued = this.state.amountRequested
		}
		if (!this.state.approvalDate) {
			var dateIssued = moment().format()
		} else {
			var dateIssued = this.state.approvalDate
		}
		let paymentType = 'FUELREQUESTS'
		const { accountchargedId, cashbalId, balbefore, projectId } = this.state
		await this.props.issuePayment({
			variables: {
				requestId,
				amountIssued,
				dateIssued,
				accountchargedId,
				cashbalId,
				balbefore,
				projectId,
				paymentType,
			},
			refetchQueries: [
				{ query: getApprovedRequisitions },
				{ query: getUserDetails },
			],
		})
		this.props.history.push('/fuelrequisitions/approved')
	}
}

const ADDPAYMENTDETAILS = gql`
	mutation issuePayment(
		$accountchargedId: ID!
		$cashbalId: ID!
		$balbefore: Int!
		$otherDetails: String
		$paymentType: String!
		$projectId: ID!
		$amountIssued: Int!
		$dateIssued: String!
		$requestId: ID!
	) {
		addPaymentIssue(
			accountchargedId: $accountchargedId
			cashbalId: $cashbalId
			balbefore: $balbefore
			otherDetails: $otherDetails
			paymentType: $paymentType
			projectId: $projectId
			requestId: $requestId
			dateIssued: $dateIssued
			amountIssued: $amountIssued
		)
	}
`

export default compose(
	graphql(getFuelRequisition, {
		name: 'fuelRequest',
		options: props => ({
			variables: {
				id: props.match.params.id,
			},
		}),
	}),
	graphql(ADDPAYMENTDETAILS, {
		name: 'issuePayment',
	}),
	graphql(getAccountFeed, {
		name: 'accountFeed',
	}),
	graphql(getProjectFeed, {
		name: 'projectFeed',
	}),
)(FuelRequestsIssueCash)
