import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import {
	Message,
	Menu,
	Button,
	Icon,
	Grid,
	Segment,
	Divider,
	Header,
	Table,
} from 'semantic-ui-react'

import getMaterialDetails from './queries/fetchMaterialDetails'

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
			<Message.Header>No Record with that ID Found</Message.Header>
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
class MaterialsDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		console.log(this.props)
		if (this.props.materialDetails.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.materialDetails.loading) {
			return <div>{timeoutMessage}</div>
		}

		const { materialsCosting } = this.props.materialDetails
		if (materialsCosting.length === 0) {
			return <div>{emptyMessage}</div>
		}
		console.log(materialsCosting)
		const { transactions } = materialsCosting
		var RECIEPTS = transactions.filter(
			obj => obj.transactionType === 'RECIEPTS',
		)
		var ISSUES = transactions.filter(obj => obj.transactionType === 'ISSUES')

		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 1600 }}>
					<Header as="h4" color="green" textAlign="center">
						{materialsCosting.materialName} Details
					</Header>
					<Segment>
						<React.Fragment />
						<Divider />
						<React.Fragment>
							<b>Standard Unit:</b> {materialsCosting.standardUnit}
						</React.Fragment>
						<Divider />
						<React.Fragment>
							<b>Cost Per Unit:</b> {materialsCosting.costPerUnit}
						</React.Fragment>
						<Divider />
						<React.Fragment>
							<b>
								Value of{' '}
								{materialsCosting.materialName[0].toUpperCase() +
									materialsCosting.materialName.slice(1).toLowerCase()}{' '}
								in Store:
							</b>{' '}
							{materialsCosting.costPerUnit * materialsCosting.balance.balance}
						</React.Fragment>
						<Divider />
						<React.Fragment>
							<b>Balance in Store:</b> {materialsCosting.balance.balance}
						</React.Fragment>
						<Divider />
					</Segment>
					<Segment.Group horizontal>
						<Segment>
							<Header as="h5" color="green" textAlign="center">
								{materialsCosting.materialName[0].toUpperCase() +
									materialsCosting.materialName.slice(1).toLowerCase()}{' '}
								Recieved
							</Header>
							<Table celled selectable>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell> Supplier</Table.HeaderCell>
										<Table.HeaderCell>Bal Before </Table.HeaderCell>
										<Table.HeaderCell>Quantity </Table.HeaderCell>
										<Table.HeaderCell> Bal After</Table.HeaderCell>
										<Table.HeaderCell> Date </Table.HeaderCell>
										<Table.HeaderCell>Delivery Note</Table.HeaderCell>
										<Table.Header> </Table.Header>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{RECIEPTS.map(request => (
										<Table.Row>
											<Table.Cell>
												{request.materialsRecievedFrom.supplierName}
											</Table.Cell>
											<Table.Cell>{request.balanceBefore}</Table.Cell>
											<Table.Cell>{request.unitsTransacted}</Table.Cell>
											<Table.Cell>{request.balanceAfter}</Table.Cell>
											<Table.Cell>
												{moment(request.transactionDate).format('MMM Do YYYY')}
											</Table.Cell>
											<Table.Cell>{request.deliveryNote}</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell colSpan="6">
											<Menu floated="right" pagination>
												<Menu.Item as="a" icon>
													<Icon name="chevron left" />
												</Menu.Item>
												<Menu.Item as="a">1</Menu.Item>
												<Menu.Item as="a">2</Menu.Item>
												<Menu.Item as="a">3</Menu.Item>

												<Menu.Item as="a" icon>
													<Icon name="chevron right" />
												</Menu.Item>
											</Menu>
										</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						</Segment>
						<Segment>
							<Header as="h5" color="green" textAlign="center">
								{materialsCosting.materialName[0].toUpperCase() +
									materialsCosting.materialName.slice(1).toLowerCase()}{' '}
								Issued
							</Header>
							<Table celled selectable>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell> Project </Table.HeaderCell>
										<Table.HeaderCell>Bal Before </Table.HeaderCell>
										<Table.HeaderCell>Quantity </Table.HeaderCell>
										<Table.HeaderCell> Bal After</Table.HeaderCell>
										<Table.HeaderCell> Date </Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{ISSUES.map(request => (
										<Table.Row>
											<Table.Cell>
												{request.materialsIssuedTo.projectName}
											</Table.Cell>
											<Table.Cell>{request.balanceBefore}</Table.Cell>
											<Table.Cell>{request.unitsTransacted}</Table.Cell>
											<Table.Cell>{request.balanceAfter}</Table.Cell>
											<Table.Cell>
												{moment(request.transactionDate).format('MMM Do YYYY')}
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell colSpan="6">
											<Menu floated="right" pagination>
												<Menu.Item as="a" icon>
													<Icon name="chevron left" />
												</Menu.Item>
												<Menu.Item as="a">1</Menu.Item>
												<Menu.Item as="a">2</Menu.Item>
												<Menu.Item as="a">3</Menu.Item>

												<Menu.Item as="a" icon>
													<Icon name="chevron right" />
												</Menu.Item>
											</Menu>
										</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						</Segment>
					</Segment.Group>
				</Grid.Column>
			</Grid>
		)
	}
}

export default graphql(getMaterialDetails, {
	name: 'materialDetails',
	options: props => ({
		variables: {
			id: props.match.params.id,
		},
	}),
})(MaterialsDetails)
