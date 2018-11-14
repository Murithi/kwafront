import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import VehicleOwnerFeedQuery from './queries/fetchVehicleOwners'
import Phone from 'react-phone-number-input'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'
import gql from 'graphql-tag'
import InlineError from './messages/InlineError'
import { Form, Segment, Grid, Header, Message } from 'semantic-ui-react'

class CreateVehicleOwner extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			phone: '',
			email: '',

			errors: {},
			loading: false,
		}
	}

	onSubmit = () => {
		const errors = this.validate()
		this.setState({ errors })
	}

	validate = () => {
		const errors = {}
		if (!this.state.name) errors.name = "Can't be blank"
		if (!this.state.phone) errors.phone = "Can't be blank"
		if (!this.state.email) errors.email = "Can't be blank"

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._createVehicleOwner()
		}
		return errors
	}
	render() {
		const { errors, loading } = this.state
		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					<Header as="h4" color="green" textAlign="center">
						Add Vehicle Owner
					</Header>
					<Form size="large" onSubmit={this.onSubmit} loading={loading}>
						{errors.global && (
							<Message negative>
								<Message.Header> Something went wrong </Message.Header>
								<p>{errors.global}</p>
							</Message>
						)}
						<Segment stacked>
							<Form.Field error={!!errors.name}>
								<label>Company Name</label>
								<input
									placeholder="County Engineering"
									value={this.state.name}
									onChange={e => this.setState({ name: e.target.value })}
								/>
								{errors.name && <InlineError text={errors.name} />}
							</Form.Field>

							<Form.Field error={!!errors.phone}>
								<label>Phone Number</label>
								<Phone
									placeholder="Enter phone number"
									value={this.state.phone}
									onChange={phone => this.setState({ phone })}
								/>
								{errors.phone && <InlineError text={errors.phone} />}
							</Form.Field>
							<Form.Field error={!!errors.email}>
								<label>email</label>
								<input
									placeholder="email"
									value={this.state.email}
									onChange={e => this.setState({ email: e.target.value })}
								/>
								{errors.email && <InlineError text={errors.email} />}
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

	_createVehicleOwner = async () => {
		const { name, phone, email } = this.state

		await this.props.createVehicleOwner({
			variables: {
				name,
				phone,
				email,
			},
			refetchQueries: [{ query: VehicleOwnerFeedQuery }],
		})
		this.props.history.push(`/vehicleowner/list`)
	}
}

const CREATEVEHICLEOWNERMUTATION = gql`
	mutation createVehicleOwner(
		$name: String!
		$phone: String!
		$email: String!
	) {
		addVehicleOwner(name: $name, phone: $phone, email: $email)
	}
`
export default graphql(CREATEVEHICLEOWNERMUTATION, {
	name: 'createVehicleOwner',
})(withRouter(CreateVehicleOwner))
