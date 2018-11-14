import React, { Fragment } from 'react'
import {
	Icon,
	Message,
	Form,
	Divider,
	Menu,
	Header,
	Segment,
	Dropdown,
	Table,
	Tab,
} from 'semantic-ui-react'
import moment from 'moment'
import { graphql, compose } from 'react-apollo'

import IssuesFeedQuery from './queries/fetchStoreIssuesList'

const StoreIssuesDisplay = props => {
	if (props.transactionList.storageFeed) {
		console.log(props.transactionType)
		console.log(props.transactionList)
		return (
			<Fragment>
				<Header as="h3" color="green" textAlign="center">
					Store{' '}
					{props.transactionList.storageFeed[0].transactionType === 'ISSUES'
						? 'Issues'
						: 'Receipts'}{' '}
					List
				</Header>
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Material Issued</Table.HeaderCell>
							<Table.HeaderCell>
								{props.transactionList.storageFeed[0].transactionType ===
								'ISSUES'
									? 'Issued To'
									: 'Materials From'}
							</Table.HeaderCell>

							<Table.HeaderCell>Quantity Before</Table.HeaderCell>

							<Table.HeaderCell>
								{' '}
								{props.transactionList.storageFeed[0].transactionType ===
								'ISSUES'
									? 'Quantity Issued'
									: 'Quantity Recieved'}{' '}
							</Table.HeaderCell>
							<Table.HeaderCell>Quantity After</Table.HeaderCell>
							<Table.HeaderCell> Date Issued</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{props.transactionList.storageFeed.map(request => {
							return (
								<Table.Row>
									<Table.Cell>
										{' '}
										{request.itemTransacted.materialName}{' '}
									</Table.Cell>
									<Table.Cell>
										{' '}
										{request.transactionType === 'ISSUES'
											? request.materialsIssuedTo.projectName
											: request.materialsRecievedFrom.materialName}{' '}
									</Table.Cell>
									<Table.Cell> {request.balanceBefore} </Table.Cell>
									<Table.Cell> {request.unitsTransacted} </Table.Cell>
									<Table.Cell> {request.balanceAfter} </Table.Cell>
									<Table.Cell>
										{' '}
										{moment(request.transactionDate).format('MMM DD YYYY')}{' '}
									</Table.Cell>
								</Table.Row>
							)
						})}
					</Table.Body>
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
	} else {
		return (
			<Fragment>
				<Message icon negative>
					<Icon name="info" />
					<Message.Content>
						<Message.Header>Choose time frame and project</Message.Header>
						Specify options for data
					</Message.Content>
				</Message>
			</Fragment>
		)
	}
}

export default graphql(IssuesFeedQuery, {
	name: 'transactionList',
	options: props => ({
		variables: {
			startDate: props.startDate,
			endDate: props.endDate,
			projectId: props.projectId,
			transactionType: props.transactionType,
		},
	}),
})(StoreIssuesDisplay)
