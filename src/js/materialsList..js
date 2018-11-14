import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Table, Message, Icon, Menu } from 'semantic-ui-react'
import Material_Feed_Query from './queries/fetchMaterials'
class MaterialsList extends Component {
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
					<Message.Header>No Materials Found</Message.Header>
					<p>Make a new requisitoin to get started.</p>
					<Link to={'/materials/new'} className="ui button primary">
						Add New Requisition{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.materialsFeed.error}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)
		if (this.props.materialsFeed && this.props.materialsFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.materialsFeed && this.props.materialsFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (
			this.props.materialsFeed.materialsCostingFeed === undefined ||
			this.props.materialsFeed.materialsCostingFeed === 0
		) {
			return <div>{emptyMessage}</div>
		}
		return (
			<Table celled selectable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Description</Table.HeaderCell>
						<Table.HeaderCell>Units</Table.HeaderCell>
						<Table.HeaderCell>Standard Unit</Table.HeaderCell>
						<Table.HeaderCell> Cost Per Unit </Table.HeaderCell>
						<Table.HeaderCell> Edit </Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{this.props.materialsFeed.materialsCostingFeed.map(request => (
						<Table.Row>
							<Table.Cell>
								<Link to={`/materials/details/${request.id}`}>
									{request.materialName}
								</Link>
							</Table.Cell>
							<Table.Cell>{request.materialDescription}</Table.Cell>
							<Table.Cell>{request.units}</Table.Cell>
							<Table.Cell>{request.standardUnit}</Table.Cell>
							<Table.Cell>{request.costPerUnit}</Table.Cell>
							<Table.Cell>
								<Link to={`/materials/edit/${request.id}`}>
									<Icon name="edit circle green " />
								</Link>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="6">
							<Link to={'/materials/new'}>
								<Icon name="add circle green right" size="huge" />
							</Link>

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
		)
	}
}

export default graphql(Material_Feed_Query, { name: 'materialsFeed' })(
	MaterialsList,
)
