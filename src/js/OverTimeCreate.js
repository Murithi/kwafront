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
import OverTime_Request_Feed_Query from './queries/fetchOverTimeRequests'
import Personnel_Feed_Query from './queries/fetchPersonnel'
import getUserDetails from './queries/getUserDetails'

var personnelOptions = []

class OverTimeRequestCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amountRequested: '',
			overTimePayee: '',
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
				this.setState({ overTimePayee: element.id })
				this.setState({ personnelValue: element.Value })
			}
		})
	}
	validate = () => {
		const errors = {}

		if (!this.state.overTimePayee) errors.overTimePayee = "Can't be blank"
		if (!this.state.amountRequested) errors.amountRequested = "Can't be blank"
		if (!this.state.otherDetails) errors.otherDetails = "Can't be blank"
		if (!this.state.requestDate) errors.requestDate = "Can't be blank"
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._createOverTimeRequest()
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
						Create Overtime Request
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
							<Form.Field error={!!errors.overTimePayee}>
								<label>Employee Name</label>
								<Dropdown
									value={this.state.personnelValue}
									search
									selection
									options={personnelOptions}
									onChange={this.setPersonValue.bind(this)}
								/>
								{errors.overTimePayee && (
									<InlineError text={errors.overTimePayee} />
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

	_createOverTimeRequest = async () => {
		const { amountRequested, overTimePayee, otherDetails } = this.state
		if (!this.state.requestDate) {
			var requestDate = moment().format()
		} else {
			var requestDate = this.state.requestDate
		}
		await this.props.createOverTimeRequest({
			variables: {
				amountRequested,
				personnelId: overTimePayee,
				otherDetails,
				requestDate,
			},
			refetchQueries: [
				{ query: getUserDetails },
				{ query: OverTime_Request_Feed_Query },
			],
		})
		this.props.history.push('/overtimerequests/initiated')
	}
}

const CREATEOVERTIMEMUTATION = gql`
	mutation createOverTimeRequest(
		$requestDate: String
		$amountRequested: Int!
		$personnelId: ID!
		$otherDetails: String!
	) {
		addOverTimeRequest(
			requestDate: $requestDate
			personnelId: $personnelId
			amountRequested: $amountRequested
			otherDetails: $otherDetails
		)
	}
`

export default compose(
	graphql(Personnel_Feed_Query, {
		name: 'personnelFeed',
	}),
	graphql(CREATEOVERTIMEMUTATION, {
		name: 'createOverTimeRequest',
	}),
	graphql(getUserDetails, {
		name: 'userDetails',
	}),
)(OverTimeRequestCreate)
