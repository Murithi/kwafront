import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
	Form,
	Segment,
	Grid,
	Header,
	TextArea,
	Message,
	Dropdown,
	Divider,
	Image,
} from 'semantic-ui-react'
import InlineError from './messages/InlineError'
import Advance_Request_Feed_Query from './queries/fetchAdvanceRequests'
import Personnel_Feed_Query from './queries/fetchPersonnel'
import getUserDetails from './queries/getUserDetails'
import InitiatedRequisitionsQuery from './queries/fetchAdvanceRequests'
var personnelOptions = []
class AdvanceRequestCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amountRequested: '',
			advancePayee: '',
			otherDetails: '',
			errors: {},
			loading: false,
		}
	}
	handleRequestDateChange = date => {
		this.setState({ requestDate: date })
	}
	setPersonValue = (e, data) => {
		personnelOptions.forEach(element => {
			if (element.value === data.value) {
				this.setState({ advancePayee: element.id })
				this.setState({ personnelValue: element.Value })
			}
		})
	}
	validate = () => {
		const errors = {}

		if (!this.state.advancePayee) errors.advancePayee = "Can't be blank"
		if (!this.state.amountRequested) errors.amountRequested = "Can't be blank"
		if (!this.state.otherDetails) errors.otherDetails = "Can't be blank"
		if (!this.state.requestDate) errors.requestDate = "Can't be blank"
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._createAdvanceRequest()
		}
		return errors
	}
	onSubmit = () => {
		const errors = this.validate()
		this.setState({ errors })
	}
	render() {
		const { errors, loading } = this.state

		if (this.props.personnelFeed.loading === false) {
			let tempOp = this.props.personnelFeed.personnelFeed
			personnelOptions = []
			tempOp.map(element => {
				personnelOptions.push({
					id: element.id,
					text: element.firstName + ' ' + element.lastName,
					value: element.firstName + ' ' + element.lastName,
				})
			})
		}

		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					<Header as="h2" color="green" textAlign="center">
						Create Advance Request
					</Header>
					<Divider />
					<Form size="large" onSubmit={this.onSubmit} loading={loading}>
						{errors.global && (
							<Message negative>
								<Message.Header> Something went wrong </Message.Header>
								<p>{errors.global}</p>
							</Message>
						)}
						<Segment stacked>
							<Form.Field error={!!errors.advancePayee}>
								<label>Employee Name</label>
								<Dropdown
									value={this.state.personnelValue}
									search
									selection
									options={personnelOptions}
									onChange={this.setPersonValue.bind(this)}
								/>
								{errors.advancePayee && (
									<InlineError text={errors.advancePayee} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.amountRequested}>
								<label>Amount Requested</label>
								<input
									placeholder="0000"
									value={this.state.amountRequested}
									type="number"
									onChange={e =>
										this.setState({ amountRequested: e.target.value })
									}
								/>
								{errors.amountRequested && (
									<InlineError text={errors.amountRequested} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.otherDetails}>
								<label>Other Details</label>
								<TextArea
									autoHeight
									value={this.state.otherDetails}
									rows={2}
									onChange={e =>
										this.setState({ otherDetails: e.target.value })
									}
								/>

								{errors.otherDetails && (
									<InlineError text={errors.otherDetails} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.requestDate}>
								<label>Request Date</label>{' '}
								<DatePicker
									selected={this.state.requestDate}
									onChange={this.handleRequestDateChange}
								/>
							</Form.Field>
							<Form.Button fluid positive>
								Submit
							</Form.Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		)
	}
	_createAdvanceRequest = async () => {
		const { amountRequested, advancePayee, otherDetails } = this.state
		if (!this.state.requestDate) {
			var requestDate = moment().format()
		} else {
			var requestDate = this.state.requestDate
		}
		await this.props.createAdvanceRequest({
			variables: {
				amountRequested,
				personnelId: advancePayee,
				otherDetails,
				requestDate,
			},
			refetchQueries: [
				{ query: getUserDetails },
				{ query: Personnel_Feed_Query },
				{ query: InitiatedRequisitionsQuery },
			],
		})
		this.props.history.push('/advancerequests/initiated')
	}
}

const CREATEADVANCEMUTATION = gql`
	mutation createAdvanceRequest(
		$amountRequested: Int!
		$personnelId: ID!
		$otherDetails: String!
		$requestDate: String!
	) {
		addAdvanceRequest(
			amountRequested: $amountRequested
			personnelId: $personnelId
			otherDetails: $otherDetails
			requestDate: $requestDate
		)
	}
`

export default compose(
	graphql(Personnel_Feed_Query, {
		name: 'personnelFeed',
	}),
	graphql(CREATEADVANCEMUTATION, {
		name: 'createAdvanceRequest',
	}),
)(AdvanceRequestCreate)
