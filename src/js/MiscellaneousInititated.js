import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Route } from 'react-router-dom'
import {
	Header,
	Table,
	Message,
	Icon,
	Menu,
	SegmentGroup,
	Segment,
	Button,
} from 'semantic-ui-react'
import moment from 'moment'
import gql from 'graphql-tag'
import InitiatedRequisitionsQuery from './queries/fetchMiscellaneousRequestsInitiated'
import getUserDetails from './queries/getUserDetails'

class MiscellaneousInititated extends Component {
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
			this.props.requisitionFeed.initiatedMiscellaneousRequisitionFeed ===
				undefined ||
			this.props.requisitionFeed.initiatedMiscellaneousRequisitionFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}

		return (
			<Fragment>
				<Header as="h3" color="green" textAlign="center">
					Initiated Miscellaneous Requisitions List
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
						{(() => {
							if (this.props.userDetails.me.role === 'DIRECTOR') {
								return (
									<Table.Row>
										<Table.HeaderCell>Requested Amount </Table.HeaderCell>
										<Table.HeaderCell> Request Date</Table.HeaderCell>
										<Table.HeaderCell>Requested By</Table.HeaderCell>
										<Table.HeaderCell>Other Details </Table.HeaderCell>
										<Table.HeaderCell> Status</Table.HeaderCell>
										<Table.HeaderCell>Approve</Table.HeaderCell>
										<Table.HeaderCell>Decline</Table.HeaderCell>
									</Table.Row>
								)
							} else {
								return (
									<Table.Row>
										<Table.HeaderCell>Requested Amount </Table.HeaderCell>
										<Table.HeaderCell> Request Date</Table.HeaderCell>
										<Table.HeaderCell>Requested By</Table.HeaderCell>
										<Table.HeaderCell>Other Details </Table.HeaderCell>
										<Table.HeaderCell> Approval Status</Table.HeaderCell>
									</Table.Row>
								)
							}
						})()}
					</Table.Header>
					<Table.Body>
						{this.props.requisitionFeed.initiatedMiscellaneousRequisitionFeed.map(
							request => (
								<Table.Row>
									<Table.Cell>{request.amountRequested}</Table.Cell>
									<Table.Cell>
										{moment(request.requestDate).format('MMM Do YYYY')}
									</Table.Cell>
									<Table.Cell>
										{request.requestedBy.personnelDetails.firstName}{' '}
										{request.requestedBy.personnelDetails.lastName}
									</Table.Cell>
									<Table.Cell>{request.otherDetails}</Table.Cell>

									{(() => {
										if (this.props.userDetails.me.role === 'DIRECTOR') {
											return (
												<Fragment>
													<Table.Cell>
														<Link to={`/miscellaneous/approve/${request.id}`}>
															View ..
															<Icon name="angle double right" color="green" />
														</Link>
													</Table.Cell>
													<Table.Cell>
														<Icon
															color="blue"
															name="check circle"
															onClick={() =>
																this._approveRequest(true, request.id)
															}
														/>
													</Table.Cell>
													<Table.Cell>
														<Icon
															color="red"
															name="remove circle"
															onClick={() =>
																this._approveRequest(false, request.id)
															}
														/>
													</Table.Cell>
												</Fragment>
											)
										} else {
											return (
												<Table.Cell>
													<Icon name="remove " color="green" />
												</Table.Cell>
											)
										}
									})()}
								</Table.Row>
							),
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="8">
								<Link to={'/miscellaneous/new'}>
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
			</Fragment>
		)
	}

	_approveRequest = async (approvalStatus, miscellaneousrequisitionId) => {
		let approvalDate = moment().format()

		await this.props.approveRequest({
			variables: { miscellaneousrequisitionId, approvalDate, approvalStatus },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedRequisitionsQuery },
			],
		})
		this.props.history.push('/miscellaneous/initiated')
	}

	_approvall = async () => {
		const approvalDate = moment().format()
		this.props.approveAll({
			variables: { approvalDate },
			refetchQueries: [{ query: InitiatedRequisitionsQuery }],
		})
		this.props.history.push('/miscellaneous/initiated')
	}
}

const APPROVEMUTATION = gql`
	mutation approveMiscellaneous(
		$approvalStatus: Boolean
		$miscellaneousrequisitionId: ID
		$approvalDate: String
	) {
		approveMiscellaneousRequest(
			miscellaneousrequisitionId: $miscellaneousrequisitionId
			approvalDate: $approvalDate
			approvalStatus: $approvalStatus
		)
	}
`

const APPROVEALL = gql`
	mutation approveAll($approvalDate: String!) {
		approveAllMiscellaneousRequest(approvalDate: $approvalDate)
	}
`
export default compose(
	graphql(APPROVEALL, { name: 'approveAll' }),
	graphql(InitiatedRequisitionsQuery, { name: 'requisitionFeed' }),
	graphql(getUserDetails, { name: 'userDetails' }),
	graphql(APPROVEMUTATION, {
		name: 'approveRequest',
	}),
)(MiscellaneousInititated)
