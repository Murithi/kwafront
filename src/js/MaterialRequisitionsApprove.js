import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import moment from 'moment'
import DatePicker from 'react-datepicker'
import {
	Message,
	Button,
	Icon,
	Grid,
	Segment,
	Divider,
	Header,
} from 'semantic-ui-react'
import getMaterialRequisition from './queries/fetchMaterialsRequestById'
import approveMaterialRequisitions from './mutations/approveMaterialRequisitions'
import InitiatedMaterialRequisitionQuery from './queries/fetchMaterialRequisitionInitiated'
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

class MaterialRequisitionsApprove extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
		}
	}

	handleApprovalDateChange = date => {
		this.setState({ approvalDate: date })
	}
	render() {
		const { loading } = this.state
		if (this.props.materialRequest.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.materialRequest.error) {
			return <div>{timeoutMessage}</div>
		}
		const { initiatedMaterialRequisition } = this.props.materialRequest
		if (initiatedMaterialRequisition.length === 0) {
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
						Material Request Details
					</Header>
					<Segment.Group horizontal>
						<Segment>
							<p>
								<b>Material Requested:</b>{' '}
								{initiatedMaterialRequisition.materialType.materialName}
							</p>
							<Divider />
							<p>
								<b>Requested By:</b>{' '}
								{
									initiatedMaterialRequisition.requestedBy.personnelDetails
										.firstName
								}{' '}
								{
									initiatedMaterialRequisition.requestedBy.personnelDetails
										.lastName
								}
							</p>
							<Divider />
							<p>
								<b>Date Requested:</b>{' '}
								{moment(initiatedMaterialRequisition.requestDate).format(
									'MMM Do YYYY',
								)}
							</p>
						</Segment>
						<Segment>
							<p>
								<b>Quantity Requested:</b>{' '}
								{initiatedMaterialRequisition.quantity}
							</p>
							<Divider />
							<p>
								<b>Approximate Cost:</b>{' '}
								{initiatedMaterialRequisition.approxCost}
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
						</Segment>
					</Segment.Group>
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

		await this.props.approveRequisition({
			variables: { id, approvalDate, approvalStatus },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedMaterialRequisitionQuery },
			],
		})
		this.props.history.push('/materialrequisitions/initiated')
	}
}

export default compose(
	graphql(getMaterialRequisition, {
		name: 'materialRequest',
		options: props => ({
			variables: {
				id: props.match.params.id,
			},
		}),
	}),
	graphql(approveMaterialRequisitions, {
		name: 'approveRequisition',
	}),
)(MaterialRequisitionsApprove)
