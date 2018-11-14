import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import {
	Form,
	Segment,
	Grid,
	Header,
	Message,
	Dropdown,
	Divider,
} from 'semantic-ui-react'
import InlineError from './messages/InlineError'
import DRIVERSFEEDQUERY from './queries/fetchDrivers'

var personnelOptions = []
var vehicleOptions = []
class AssignVehicle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dateAssigned: '',
			motorVehicleId: '',
			vehicleValue: '',
			personnelvalue: '',
			assigneeId: '',
			errors: {},
			loading: false,
		}
	}
	handleDateAssignedChange = date => {
		this.setState({ dateAssigned: date })
	}
	setValue = (e, data) => {
		personnelOptions.forEach(element => {
			if (element.value === data.value) {
				this.setState({ personnelvalue: data.value })
				this.setState({ assigneeId: element.id })
				return
			}
		})

		this.setState({ personnelvalue: data.value })
	}

	setVehicleValue = (e, data) => {
		vehicleOptions.forEach(element => {
			if (element.value === data.value) {
				this.setState({ motorVehicleId: element.id })
				this.setState({ vehicleValue: element.Value })
				return
			}
		})
	}
	validate = () => {
		const errors = {}
		if (!this.state.assigneeId) errors.assigneeId = "Can't be blank"
		if (!this.state.motorVehicleId) errors.motorVehicleId = "Can't be blank"

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._assignVehicle()
		}
		return errors
	}

	onSubmit = () => {
		const errors = this.validate()
		this.setState({ errors })
	}
	render() {
		const { errors, loading } = this.state
		console.log(this.props)
		if (this.props.personnelFeed.loading === false) {
			let tempOps = this.props.personnelFeed.personnelFeed
			personnelOptions = []
			tempOps.map(element => {
				if (element.projectAssignedTo !== null) {
					return personnelOptions.push({
						id: element.id,
						text: element.firstName + ' ' + element.lastName,
						value: element.firstName + ' ' + element.lastName,
					})
				}
			})
		}
		if (this.props.vehicleFeed.loading === false) {
			let tempOp = this.props.vehicleFeed.vehicleDisplayFeed
			vehicleOptions = []
			tempOp.map(element => {
				return vehicleOptions.push({
					id: element.id,
					text: element.registrationNumber,
					value: element.registrationNumber,
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
						Assign Vehicle
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
							<Form.Field error={!!errors.vehicleValue}>
								<label>Vehicle Registration Number</label>
								<Dropdown
									value={this.state.vehicleValue}
									search
									selection
									options={vehicleOptions}
									onChange={this.setVehicleValue.bind(this)}
								/>
								{errors.vehicleValue && (
									<InlineError text={errors.vehicleValue} />
								)}
							</Form.Field>

							<Form.Field error={!!errors.personnelvalue}>
								<label>Driver's Name</label>
								<Dropdown
									value={this.state.personnelvalue}
									search
									selection
									options={personnelOptions}
									onChange={this.setValue.bind(this)}
								/>
								{errors.personnelvalue && (
									<InlineError text={errors.personnelvalue} />
								)}
							</Form.Field>
							<Form.Button fluid positive>
								{' '}
								Submit{' '}
							</Form.Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		)
	}

	_assignVehicle = async () => {
		const { motorVehicleId, assigneeId } = this.state
		let vehicleId = motorVehicleId
		let personnelId = assigneeId
		const dateOfAssignment = moment().format()
		await this.props.assignVehicle({
			variables: {
				vehicleId,
				personnelId,
				dateOfAssignment,
			},
			refetchQueries: [{ query: DRIVERSFEEDQUERY }],
		})

		this.props.history.push('/vehicles/assignment/list')
	}
}

const VEHICLEFEEDQUERY = gql`
	query getVehicles {
		vehicleDisplayFeed {
			id
			registrationNumber
		}
	}
`

const PERSONNELFEEDQUERY = gql`
	query personnelFeed {
		personnelFeed {
			id
			firstName
			lastName
		}
	}
`

const CREATEASSIGNVEHICLEMUTATION = gql`
	mutation assignVehicle(
		$vehicleId: ID!
		$personnelId: ID!
		$dateOfAssignment: String!
	) {
		addVehicleAssignment(
			vehicleId: $vehicleId
			personnelId: $personnelId
			dateOfAssignment: $dateOfAssignment
		)
	}
`
export default compose(
	graphql(PERSONNELFEEDQUERY, { name: 'personnelFeed' }),
	graphql(VEHICLEFEEDQUERY, { name: 'vehicleFeed' }),
	graphql(CREATEASSIGNVEHICLEMUTATION, { name: 'assignVehicle' }),
)(AssignVehicle)
