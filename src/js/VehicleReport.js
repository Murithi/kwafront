import React, { Component, Fragment } from 'react'
import {
	Header,
	Grid,
	Segment,
	Divider,
	Message,
	Icon,
	Menu,
} from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'
import moment from 'moment'
import { graphql } from 'react-apollo'
import getVehicle from './queries/fetchVehicle'

class VehicleReport extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
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
					<Message.Header>No Requisitions Found</Message.Header>
					<p>Add some new Requisitions to get started.</p>
					<Link
						to={'/inspectionrequisitions/new'}
						className="ui button primary"
					>
						Add New Requisition{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.vehicle.error}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)
		if (this.props.vehicle && this.props.vehicle.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.vehicle && this.props.vehicle.error) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.vehicle.getVehicle === undefined ||
			this.props.vehicle.getVehicle === 0
		) {
			return <div>{emptyMessage}</div>
		}

		return (
			<Fragment>
				<Header as="h3" dividing color="green" textAlign="center">
					Vehicle Report
				</Header>
				<Divider color="olive" />
				<Grid columns={2} relaxed>
					<Grid.Column>
						<b>REGISTRATION NO</b>
						:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KCB 201K
						<Divider />
						<b>VEHICLE ASSIGNED TO</b>
						:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Angela Mbithe
						<Divider />
						<b>INSURANCE RENEWAL DATE</b>
						:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						{moment('May 12 2016').format('MMM Do YYYY')}
						<Divider />
					</Grid.Column>

					<Grid.Column>
						<b>VEHICLE OWNER</b>
						:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KEWA
						EAST AFRICA
						<Divider />
						<b>DATE ASSIGNED</b>
						:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;May
						10th 2018
						<Divider />
						<b>INSURANCE VALUATION</b>
						:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12,000,000
						<Divider />
					</Grid.Column>
				</Grid>

				<hr color="olive" />
			</Fragment>
		)
	}
}

export default graphql(getVehicle, {
	name: 'vehicle',
	options: props => ({
		variables: {
			id: props.match.params.id,
		},
	}),
})(VehicleReport)
