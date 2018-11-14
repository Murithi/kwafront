import React, { Component, Fragment } from 'react'
import {
	Message,
	Icon,
	Segment,
	Form,
	Table,
	Header,
	Tab,
	Menu,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import SalariesRecieved from './queries/fetchSalariesRecieved'
import { graphql } from 'react-apollo'

class PersonnelSalaryList extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		console.log(this.props.salaryFeed)
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
					<Message.Header>No Salaris Found</Message.Header>
					<p>Add some new Requisitions to get started.</p>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.salaryFeed.errorl}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)

		if (this.props.salaryFeed && this.props.salaryFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.salaryFeed && this.props.salaryFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.salaryFeed === undefined ||
			this.props.requisitionFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}

		return (
			<Fragment>
				<Header as="h4" color="green" textAlign="center">
					Salary Requests List
				</Header>
				<Table celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Beneficiary</Table.HeaderCell>
							<Table.HeaderCell>Amount Recieved</Table.HeaderCell>
							<Table.HeaderCell>Requested By</Table.HeaderCell>
							<Table.HeaderCell>Request Date</Table.HeaderCell>
							<Table.HeaderCell>Other Details </Table.HeaderCell>
							<Table.HeaderCell>Date Issued</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.salaryFeed.personnel.salariesRecieved.map(request => (
							<Table.Row key={request.payee.id}>
								<Table.Cell>
									{request.payee.firstName} {request.payee.lastName}
								</Table.Cell>
								<Table.Cell>{request.cashIssueDetails.amountIssued}</Table.Cell>
								<Table.Cell>
									{request.requestedBy.personnelDetails.firstName}{' '}
									{request.requestedBy.personnelDetails.lastName}
								</Table.Cell>
								<Table.Cell>
									{moment(request.requestDate).format('MMM DD YYYY')}
								</Table.Cell>
								<Table.Cell>{request.otherDetails}</Table.Cell>
								<Table.Cell>
									{moment(request.cashIssueDetails.dateIssued).format(
										'MMM DD YYYY',
									)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="6">
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

export default graphql(SalariesRecieved, {
	name: 'salaryFeed',
	options: props => ({
		variables: {
			startDate: props.startDate,
			endDate: props.endDate,
			id: props.id,
		},
	}),
})(PersonnelSalaryList)
