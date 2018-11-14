import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import gql from 'graphql-tag'
import { Link, Route } from 'react-router-dom'
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react'

import getAdvanceRequisitions from './queries/fetchIssuedAdvancesList'

class AdvanceRequestList extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		console.log(this.props)
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
					<p>Make a new requisition to get started.</p>
					<Link to={'/fuelrequisitions/new'} className="ui button primary">
						Add New Requisition{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.requisitionFeed.errorl}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)

		if (this.props.requisitionFeed && this.props.requisitionFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.requisitionFeed && this.props.requisitionFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.requisitionFeed.issuedAdvanceRequestFeed === undefined ||
			this.props.requisitionFeed.issuedAdvanceRequestFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Fragment>
				<Header as="h4" color="green" textAlign="center">
					Advance Requests List
				</Header>
				<Table celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Person Requesting</Table.HeaderCell>
							<Table.HeaderCell>Amount Requested</Table.HeaderCell>
							<Table.HeaderCell>Requested By</Table.HeaderCell>
							<Table.HeaderCell>Other Details </Table.HeaderCell>
							<Table.HeaderCell> Approval Status</Table.HeaderCell>
							<Table.HeaderCell> Approval Date</Table.HeaderCell>
							<Table.HeaderCell> Approved By </Table.HeaderCell>
							<Table.HeaderCell> Amount Issued </Table.HeaderCell>
							<Table.HeaderCell> Date Issued </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.requisitionFeed.issuedAdvanceRequestFeed.map(
							request => (
								<Table.Row>
									<Table.Cell>
										{request.payee.firstName} {request.payee.lastName}
									</Table.Cell>
									<Table.Cell>{request.amountRequested}</Table.Cell>
									<Table.Cell>
										{request.requestedBy.personnelDetails.firstName}{' '}
										{request.requestedBy.personnelDetails.lastName}
									</Table.Cell>
									<Table.Cell>{request.otherDetails}</Table.Cell>

									<Table.Cell>
										{(() => {
											if (request.approvalStatus) {
												return <Icon name="checkmark " color="green" />
											} else {
												return <Icon name="delete " color="red" />
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
												} ${
													request.requestApprovedBy.personnelDetails.lastName
												}`
											} else {
												return <React.Fragment />
											}
										})()}
									</Table.Cell>
									{(() => {
										if (request.cashIssueDetails !== null) {
											return (
												<Table.Cell>
													{request.cashIssueDetails.amountIssued}
												</Table.Cell>
											)
										} else {
											;<Table.Cell>
												<React.Fragment />
											</Table.Cell>
										}
									})()}
									{(() => {
										if (request.cashIssueDetails !== null) {
											return (
												<Table.Cell>
													{moment(request.cashIssueDetails.dateIssued).format(
														'MMM Do YYYY',
													)}
												</Table.Cell>
											)
										} else {
											;<Table.Cell>
												<React.Fragment />
											</Table.Cell>
										}
									})()}
								</Table.Row>
							),
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="9">
								<Menu floated="right" pagination>
									<Menu.Item as="a" icon>
										<Icon name="chevron left" color="green" />
									</Menu.Item>
									<Menu.Item as="a">1</Menu.Item>
									<Menu.Item as="a">2</Menu.Item>
									<Menu.Item as="a">3</Menu.Item>
									<Menu.Item as="a">4</Menu.Item>
									<Menu.Item as="a" icon>
										<Icon name="chevron right" color="green" />
									</Menu.Item>
								</Menu>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</Fragment>
		)
	}
}

export default graphql(getAdvanceRequisitions, {
	name: 'requisitionFeed',
})(AdvanceRequestList)
