import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Route } from 'react-router-dom'

import {
	Header,
	Table,
	Grid,
	Message,
	Icon,
	Menu,
	Segment,
	SegmentGroup,
	Button,
} from 'semantic-ui-react'
import moment from 'moment'
import gql from 'graphql-tag'
import InitiatedRequisitionsQuery from './queries/fetchServiceRequisitionByUser'
import getUserDetails from './queries/getUserDetails'
import approveServiceRequisition from './mutations/approveServiceRequisition'

class ServiceRequisitionsInitiated extends Component {
	constructor(props) {
		super(props)
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
					<Message.Header>No Sections Found</Message.Header>
					<p>Add some new sections to get started.</p>
					<Link to={'/sections/new'} className="ui button primary">
						Add New Section{' '}
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
			this.props.requisitionFeed.InitiatedRequisitionsFeed === undefined ||
			this.props.requisitionFeed.InitiatedRequisitionsFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}
		return (
			<React.Fragment>
				<Header as="h4" color="green" textAlign="center">
					Initiated Service Requisitions List
				</Header>
				{(() => {
					if (this.props.userDetails.me.role === 'DIRECTOR') {
						return (
							<SegmentGroup horizontal>
								<Segment />
								<Segment>
									<Button onClick={() => this._approvall()} fluid positive>
										{' '}
										Approve All{' '}
									</Button>
								</Segment>
							</SegmentGroup>
						)
					}
				})()}
				<Table celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Vehicle Registration No</Table.HeaderCell>
							<Table.HeaderCell> Approximate Cost</Table.HeaderCell>
							<Table.HeaderCell>Requested By</Table.HeaderCell>
							<Table.HeaderCell>Request Date</Table.HeaderCell>
							<Table.HeaderCell>Other Details </Table.HeaderCell>
							<Table.HeaderCell> Details</Table.HeaderCell>
							<Table.HeaderCell>Approve</Table.HeaderCell>
							<Table.HeaderCell>Decline</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.requisitionFeed.InitiatedRequisitionsFeed.map(
							request => (
								<Table.Row>
									<Table.Cell>
										{request.vehicleToBeServiced.registrationNumber}
									</Table.Cell>
									<Table.Cell>{request.approxCostOFService}</Table.Cell>
									<Table.Cell>
										{request.requestedBy.personnelDetails.firstName}{' '}
										{request.requestedBy.personnelDetails.lastName}
									</Table.Cell>
									<Table.Cell>
										{moment(request.requestDate).format('MMM Do YYYY')}
									</Table.Cell>
									<Table.Cell>{request.otherDetails}</Table.Cell>
									<Table.Cell>
										{(() => {
											if (request.approvalStatus) {
												return <Icon name="checkmark" color="green" />
											} else {
												if (this.props.userDetails.me.role === 'DIRECTOR') {
													return (
														<Link
															to={`/servicerequisitions/approve/${request.id}`}
														>
															Approve
															<Icon name="angle double right" color="green" />
														</Link>
													)
												} else {
													return <Icon name="remove " color="gray" />
												}
											}
										})()}
									</Table.Cell>
									<Table.Cell>
										<Icon
											color="blue"
											name="check circle"
											onClick={() => this._approveRequest(true, request.id)}
										/>
									</Table.Cell>
									<Table.Cell>
										<Icon
											color="red"
											name="remove circle"
											onClick={() => this._approveRequest(false, request.id)}
										/>
									</Table.Cell>
								</Table.Row>
							),
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="8">
								<Link to={'/servicerequisitions/new'}>
									<Icon name="add circle green " size="huge" />
								</Link>

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
			</React.Fragment>
		)
	}
	_approveRequest = async (approvalStatus, requestserviceId) => {
		let approvalDate = moment().format()

		await this.props.approveServiceRequisition({
			variables: { requestserviceId, approvalDate, approvalStatus },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedRequisitionsQuery },
			],
		})
		this.props.history.push('/servicerequisitions/initiated')
	}

	_approvall = async () => {
		const approvalDate = moment().format()
		this.props.approveAll({
			variables: { approvalDate },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedRequisitionsQuery },
			],
		})
		this.props.history.push('/servicerequisitions/initiated')
	}
}
const APPROVEALL = gql`
	mutation approveAll($approvalDate: String!) {
		approveAllRequestService(approvalDate: $approvalDate)
	}
`
export default compose(
	graphql(APPROVEALL, { name: 'approveAll' }),
	graphql(InitiatedRequisitionsQuery, { name: 'requisitionFeed' }),
	graphql(approveServiceRequisition, {
		name: 'approveServiceRequisition',
	}),
	graphql(getUserDetails, { name: 'userDetails' }),
)(ServiceRequisitionsInitiated)
