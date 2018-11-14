import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import gql from 'graphql-tag'
import { Link, Route } from 'react-router-dom'
import { Table, Grid, Message, Icon, Menu } from 'semantic-ui-react'
import Service_Requisition_Feed_Query from './queries/fetchServiceRequisitions'

class ServiceRequisitionsList extends Component {
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
					<p>Make a new requisitoin to get started.</p>
					<Link to={'/servicerequisitions/new'} className="ui button primary">
						Add New Requisition{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>
						{this.props.ServiceRequisitionFeed.errorl}
					</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)
		if (
			this.props.ServiceRequisitionFeed &&
			this.props.ServiceRequisitionFeed.loading
		) {
			return <div>{loadingMessage}</div>
		}

		if (
			this.props.ServiceRequisitionFeed &&
			this.props.ServiceRequisitionFeed.error
		) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.ServiceRequisitionFeed.requestServiceFeed === undefined ||
			this.props.ServiceRequisitionFeed.requestServiceFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Table celled selectable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>VehicleReg. No</Table.HeaderCell>
						<Table.HeaderCell>Details</Table.HeaderCell>
						<Table.HeaderCell>Approx Cost</Table.HeaderCell>
						<Table.HeaderCell>Requested On</Table.HeaderCell>
						<Table.HeaderCell> Requested By </Table.HeaderCell>
						<Table.HeaderCell> Approval Status</Table.HeaderCell>
						<Table.HeaderCell> Approval Date</Table.HeaderCell>
						<Table.HeaderCell> Approved By</Table.HeaderCell>
						<Table.HeaderCell> Amount Issued</Table.HeaderCell>
						<Table.HeaderCell> Date Issued</Table.HeaderCell>
						<Table.HeaderCell> Amount Charged</Table.HeaderCell>
						<Table.HeaderCell> Amount Returned</Table.HeaderCell>
						<Table.HeaderCell> Date Returned</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{this.props.ServiceRequisitionFeed.requestServiceFeed.map(request => (
						<Table.Row>
							<Table.Cell>
								{request.vehicleToBeServiced.registrationNumber}
							</Table.Cell>
							<Table.Cell>{request.otherDetails}</Table.Cell>
							<Table.Cell>{request.approxCostOFService}</Table.Cell>
							<Table.Cell>
								{moment(request.createdAt).format('MMM Do YYYY')}
							</Table.Cell>
							<Table.Cell>
								{(() => {
									if (request.requestedBy.personnelDetails !== null) {
										return `${request.requestedBy.personnelDetails.firstName} ${
											request.requestedBy.personnelDetails.lastName
										}`
									} else {
										return <React.Fragment />
									}
								})()}
							</Table.Cell>
							<Table.Cell>
								{(() => {
									if (request.approvalStatus) {
										return <Icon name="checkmark " color="green" />
									} else {
										return <Icon name="delete " />
									}
								})()}
							</Table.Cell>
							<Table.Cell>
								{moment(request.approvalDate).format('MMM Do YYYY')}
							</Table.Cell>
							<Table.Cell>
								{(() => {
									if (
										request.requestApprovedBy !== null &&
										request.requestApprovedBy.personnelDetails !== null
									) {
										return `${
											request.requestApprovedBy.personnelDetails.firstName
										} ${request.requestApprovedBy.personnelDetails.lastName}`
									} else {
										return <React.Fragment />
									}
								})()}
							</Table.Cell>
							{(() => {
								if (request.paymentsDetails !== null) {
									return (
										<Table.Cell>
											{request.paymentsDetails.amountIssued}
										</Table.Cell>
									)
								} else {
									;<Table.Cell />
								}
							})()}
							{(() => {
								if (request.paymentsDetails !== null) {
									return (
										<Table.Cell>
											{moment(request.paymentsDetails.dateIssued).format(
												'MMM Do YYYY',
											)}
										</Table.Cell>
									)
								} else {
									;<Table.Cell />
								}
							})()}
							{(() => {
								if (request.paymentsDetails !== null) {
									return (
										<Table.Cell>
											{request.paymentsDetails.amountCharged}
										</Table.Cell>
									)
								} else {
									;<Table.Cell />
								}
							})()}
							{(() => {
								if (request.paymentsDetails !== null) {
									return (
										<Table.Cell>
											{request.paymentsDetails.amountReturned}
										</Table.Cell>
									)
								} else {
									;<Table.Cell />
								}
							})()}
							{(() => {
								if (request.paymentsDetails !== null) {
									return (
										<Table.Cell>
											{moment(request.paymentsDetails.dateReported).format(
												'MMM Do YYYY',
											)}
										</Table.Cell>
									)
								} else {
									;<Table.Cell />
								}
							})()}
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		)
	}
}

export default graphql(Service_Requisition_Feed_Query, {
	name: 'ServiceRequisitionFeed',
})(ServiceRequisitionsList)
