import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Route } from 'react-router-dom'
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react'
import moment from 'moment'
import gql from 'graphql-tag'
import ApprovedRequisitionsQuery from './queries/fetchSalaryRequestsIssued'

class SalaryCashIssued extends Component {
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
					<Link to={'/advancerequests/new'} className="ui button primary">
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
			this.props.requisitionFeed.issuedSalaryRequestFeed === undefined ||
			this.props.requisitionFeed.issuedSalaryRequestFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Fragment>
				<Header as="h4" color="green" textAlign="center">
					Issued Salary Requests List
				</Header>
				<Table celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Person Requesting</Table.HeaderCell>
							<Table.HeaderCell>Amount Requested</Table.HeaderCell>
							<Table.HeaderCell>Requested By</Table.HeaderCell>
							<Table.HeaderCell>Request Date </Table.HeaderCell>
							<Table.HeaderCell> Issued</Table.HeaderCell>
							<Table.HeaderCell> Date Issued</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body />
					{this.props.requisitionFeed.issuedSalaryRequestFeed.map(request => (
						<Table.Row>
							<Table.Cell>
								{request.payee.firstName} {request.payee.lastName}
							</Table.Cell>
							<Table.Cell>{request.amountRequested}</Table.Cell>
							<Table.Cell>
								{request.requestedBy.personnelDetails.firstName}{' '}
								{request.requestedBy.personnelDetails.lastName}
							</Table.Cell>
							<Table.Cell>
								{moment(request.requestDate).format('MMM Do YYYY')}
							</Table.Cell>
							<Table.Cell>
								<Icon name="checkmark " color="green" />
							</Table.Cell>
							<Table.Cell>
								{moment(request.cashIssueDetails.dateIssued).format(
									'MMM Do YYYY',
								)}
							</Table.Cell>
						</Table.Row>
					))}
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="6">
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

export default graphql(ApprovedRequisitionsQuery, {
	name: 'requisitionFeed',
})(SalaryCashIssued)
