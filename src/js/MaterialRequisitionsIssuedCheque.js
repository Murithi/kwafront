import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import { Header, Table, Message, Icon, Menu } from 'semantic-ui-react'

import chequedRequisitions from './queries/fetchMaterialRequisitionsIssuedCheque'

class MaterialRequisitionsIssuedCheque extends Component {
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
		if (this.props.requisitionFeed && this.props.requisitionFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.requisitionFeed && this.props.requisitionFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.requisitionFeed.issuedMaterialRequisitionsFeed === undefined ||
			this.props.requisitionFeed.issuedMaterialRequisitionsFeed.length === 0
		) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Fragment>
				<Header as="h4" color="green" textAlign="center">
					Material Requisitions Issued Cheque
				</Header>
				<Table celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Material</Table.HeaderCell>
							<Table.HeaderCell> Supplier</Table.HeaderCell>
							<Table.HeaderCell>Quantity</Table.HeaderCell>
							<Table.HeaderCell>Cost </Table.HeaderCell>
							<Table.HeaderCell> Requested By</Table.HeaderCell>
							<Table.HeaderCell> Date Requested </Table.HeaderCell>
							<Table.HeaderCell>Amount Paid</Table.HeaderCell>
							<Table.HeaderCell> Discount Recieved </Table.HeaderCell>
							<Table.HeaderCell>Date Paid </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.requisitionFeed.issuedMaterialRequisitionsFeed.map(
							request => {
								if (request.otherPaymentDetails !== null) {
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
												{request.requestedBy.personnelDetails.firstName}{' '}
												{request.requestedBy.personnelDetails.lastName}
											</Table.Cell>
											<Table.Cell>
												{moment(request.createdAt).format('MMM Do YYYY')}
											</Table.Cell>
											<Table.Cell>
												{currencyFormatter.format(
													request.otherPaymentDetails.amountPaid,
													{ code: 'KES' },
												)}
											</Table.Cell>
											<Table.Cell>
												{currencyFormatter.format(
													request.otherPaymentDetails.discountRecieved,
													{ code: 'KES' },
												)}
											</Table.Cell>
											<Table.Cell>
												{moment(request.otherPaymentDetails.datePaid).format(
													'MMM Do YYYY',
												)}
											</Table.Cell>
										</Table.Row>
									)
								}
							},
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="9">
								<Menu floated="right" pagination>
									<Menu.Item as="a" icon>
										<Icon name="chevron left" />
									</Menu.Item>
									<Menu.Item as="a">1</Menu.Item>
									<Menu.Item as="a">2</Menu.Item>
									<Menu.Item as="a">3</Menu.Item>
									<Menu.Item as="a">4</Menu.Item>
									<Menu.Item as="a" icon>
										<Icon name="chevron right" />
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

export default graphql(chequedRequisitions, {
	name: 'requisitionFeed',
})(MaterialRequisitionsIssuedCheque)
