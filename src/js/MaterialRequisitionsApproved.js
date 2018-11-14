import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Header, Table, Message, Icon, Menu } from 'semantic-ui-react'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import getUserDetails from './queries/getUserDetails'
import getApprovedRequisitions from './queries/fetchApprovedMaterialRequisitions'
class MaterialRequisitionsApproved extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		console.log(this.props.userDetails)
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
					<p>Add some new requisitions to get started.</p>
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
			this.props.requisitionFeed.approvedMaterialRequisitionsFeed ===
				undefined ||
			this.props.requisitionFeed.approvedMaterialRequisitionsFeed.length === 0
		) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Fragment>
				<Header as="h4" color="green" textAlign="center">
					Approved Material Requisitions List
				</Header>
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Material Ordered</Table.HeaderCell>
							<Table.HeaderCell> Supplier</Table.HeaderCell>
							<Table.HeaderCell>Quantity</Table.HeaderCell>
							<Table.HeaderCell>Cost </Table.HeaderCell>
							<Table.HeaderCell> Date Requested</Table.HeaderCell>
							<Table.HeaderCell> Date Approved</Table.HeaderCell>
							<Table.HeaderCell> Requested By</Table.HeaderCell>
							<Table.HeaderCell> Approval Status</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.requisitionFeed.approvedMaterialRequisitionsFeed.map(
							request => {
								if (
									request.paymentMode === 'CHEQUE' &&
									request.otherPaymentDetails === null
								) {
									return (
										<Table.Row>
											<Table.Cell>
												{request.materialType.materialName}
											</Table.Cell>
											<Table.Cell>
												{request.proposedSupplier.supplierName}
											</Table.Cell>
											<Table.Cell>{request.quantity}</Table.Cell>
											<Table.Cell>
												{currencyFormatter.format(request.approxCost, {
													code: 'KES',
												})}
											</Table.Cell>
											<Table.Cell>
												{moment(request.createdAt).format('MMM Do YYYY')}
											</Table.Cell>
											<Table.Cell>
												{moment(request.approvalDate).format('MMM Do YYYY')}
											</Table.Cell>
											<Table.Cell>
												{request.requestedBy.personnelDetails.firstName}{' '}
												{request.requestedBy.personnelDetails.lastName}
											</Table.Cell>
											<Table.Cell>
												{(() => {
													if (this.props.userDetails.me.role === 'ACCOUNTANT') {
														return (
															<Link
																to={`/materialrequisitions/issuecheque/${
																	request.id
																}`}
															>
																Issue Cheque
																<Icon name="angle double right" color="green" />
															</Link>
														)
													} else {
														return <Icon name="checkmark " color="green" />
													}
												})()}
											</Table.Cell>
										</Table.Row>
									)
								} else if (
									request.paymentMode === 'CASH' &&
									request.cashPaymentsDetails === null
								) {
									return (
										<Table.Row>
											<Table.Cell>
												{request.materialType.materialName}
											</Table.Cell>
											<Table.Cell>{request.supplier.supplierName}</Table.Cell>
											<Table.Cell>{request.quantity}</Table.Cell>
											<Table.Cell>{request.approxCost}</Table.Cell>
											<Table.Cell>
												{moment(request.createdAt).format('MMM Do YYYY')}
											</Table.Cell>
											<Table.Cell>
												{moment(request.approvalDate).format('MMM Do YYYY')}
											</Table.Cell>
											<Table.Cell>
												{request.requestedBy.personnelDetails.firstName}{' '}
												{request.requestedBy.personnelDetails.lastName}
											</Table.Cell>
											<Table.Cell>
												{(() => {
													if (this.props.userDetails.me.role === 'ACCOUNTANT') {
														return (
															<Link
																to={`/materialrequisitions/issuecash/${
																	request.id
																}`}
															>
																Issue Cash
																<Icon name="angle double right" color="green" />
															</Link>
														)
													} else {
														return <Icon name="checkmark " color="green" />
													}
												})()}
											</Table.Cell>
										</Table.Row>
									)
								}
							},
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="8">
								{/* <Link to={'/repairsrequisitions/new'}>
              <Icon name="add circle green " size="huge" />
            </Link> */}

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

export default compose(
	graphql(getApprovedRequisitions, {
		name: 'requisitionFeed',
	}),
	graphql(getUserDetails, {
		name: 'userDetails',
	}),
)(MaterialRequisitionsApproved)
