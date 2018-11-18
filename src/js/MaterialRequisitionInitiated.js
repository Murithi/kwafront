import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link, Route } from 'react-router-dom'
import moment from 'moment'
import gql from 'graphql-tag'
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

import InitiatedMaterialRequisitionQuery from './queries/fetchMaterialRequisitionInitiated'
import getUserDetails from './queries/getUserDetails'
import approveMaterialRequisitions from './mutations/approveMaterialRequisitions'

class MaterialRequistionInitiated extends Component {
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

		return (
			<Fragment>
				<Header as="h4" color="green" textAlign="center">
					Initiated Material Requisitions List
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
										<Table.HeaderCell>Material</Table.HeaderCell>
										<Table.HeaderCell> Supplier</Table.HeaderCell>
										<Table.HeaderCell>Quantity</Table.HeaderCell>
										<Table.HeaderCell>Cost </Table.HeaderCell>
										<Table.HeaderCell> Requested By</Table.HeaderCell>
										<Table.HeaderCell> Date Requested </Table.HeaderCell>
										<Table.HeaderCell> Details</Table.HeaderCell>
										<Table.HeaderCell>Approve</Table.HeaderCell>
										<Table.HeaderCell>Decline</Table.HeaderCell>
									</Table.Row>
								)
							} else {
								return (
									<Table.Row>
										<Table.HeaderCell>Material</Table.HeaderCell>
										<Table.HeaderCell> Supplier</Table.HeaderCell>
										<Table.HeaderCell>Quantity</Table.HeaderCell>
										<Table.HeaderCell>Cost </Table.HeaderCell>
										<Table.HeaderCell> Requested By</Table.HeaderCell>
										<Table.HeaderCell> Date Requested </Table.HeaderCell>
										<Table.HeaderCell> Approval Status</Table.HeaderCell>
									</Table.Row>
								)
							}
						})()}
					</Table.Header>
					<Table.Body>
						{this.props.requisitionFeed.initiatedMaterialRequisitionsFeed.map(
							request => (
								<Table.Row>
									<Table.Cell>{request.materialType.materialName}</Table.Cell>
									<Table.Cell>{request.supplier.supplierName}</Table.Cell>
									<Table.Cell>{request.quantity}</Table.Cell>
									<Table.Cell>{request.approxCost}</Table.Cell>
									<Table.Cell>
										{request.requestedBy.personnelDetails.firstName}{' '}
										{request.requestedBy.personnelDetails.lastName}
									</Table.Cell>
									<Table.Cell>
										{moment(request.requestDate).format('MMM Do YYYY')}
									</Table.Cell>

									{(() => {
										if (this.props.userDetails.me.role === 'DIRECTOR') {
											return (
												<Fragment>
													<Table.Cell>
														<Link
															to={`/materialrequisitions/approve/${request.id}`}
														>
															View
															<Icon name="angle double right" />
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
							<Table.HeaderCell colSpan="9">
								<Link to={'/materialrequisitions/new'}>
									<Icon name="add circle" color="green" size="huge" />
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
	_approveRequest = async (approvalStatus, id) => {
		let approvalDate = moment().format()

		await this.props.approveRequisition({
			variables: { id, approvalDate, approvalStatus },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedMaterialRequisitionQuery },
			],
		})
		this.props.history.push('/materialrequisitions/initiated')
	}
	_approvall = async () => {
		const approvalDate = moment().format()
		this.props.approveAll({
			variables: { approvalDate },
			refetchQueries: [
				{ query: getUserDetails },
				{ query: InitiatedMaterialRequisitionQuery },
			],
		})
		this.props.history.push('/materialrequisitions/initiated')
	}
}

const APPROVEALL = gql`
	mutation approveAll($approvalDate: String!) {
		approveAllMaterialRequisition(approvalDate: $approvalDate)
	}
`
export default compose(
	graphql(APPROVEALL, { name: 'approveAll' }),
	graphql(approveMaterialRequisitions, {
		name: 'approveRequisition',
	}),
	graphql(InitiatedMaterialRequisitionQuery, { name: 'requisitionFeed' }),
	graphql(getUserDetails, { name: 'userDetails' }),
)(MaterialRequistionInitiated)
