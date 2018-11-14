import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Link, Route } from 'react-router-dom'
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react'

import ProjectFeedQuery from './queries/fetchProjectList'

class ProjectList extends Component {
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
					<Message.Header>No Projects Found</Message.Header>
					<p>Add some new projects to get started.</p>
					<Link to={'/projects/new'} className="ui button primary">
						Add New Project{' '}
					</Link>
				</Message.Content>
			</Message>
		)

		const timeoutMessage = (
			<Message icon negative>
				<Icon name="wait" />
				<Message.Content>
					<Message.Header>{this.props.projectFeed.errorl}</Message.Header>
					Is the backend server running?
				</Message.Content>
			</Message>
		)
		if (this.props.projectFeed && this.props.projectFeed.loading) {
			return <div>{loadingMessage}</div>
		}

		if (this.props.projectFeed && this.props.projectFeed.error) {
			return <div>{timeoutMessage}</div>
		}

		if (this.props.projectFeed.projectFeed.length === 0) {
			return <div>{emptyMessage}</div>
		}

		return (
			<div>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Project Name</Table.HeaderCell>
							<Table.HeaderCell>Description</Table.HeaderCell>
							<Table.HeaderCell>Valuation</Table.HeaderCell>
							<Table.HeaderCell>Edit</Table.HeaderCell>
							<Table.HeaderCell>Delete</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.projectFeed.projectFeed.map(project => (
							<Table.Row>
								<Table.Cell>
									<Link to={`/projects/${project.id}`}>
										{project.projectName}
									</Link>
								</Table.Cell>
								<Table.Cell>{project.projectDescription}</Table.Cell>
								<Table.Cell>{project.projectValuation}</Table.Cell>
								<Table.Cell>
									<Link to={`/projects/edit/${project.id}`}>
										<Icon name="edit circle green " />
									</Link>
								</Table.Cell>
								<Table.Cell>
									<Icon
										onClick={() => this._deleteProject(project.id)}
										name="delete circle red"
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		)
	}
	_deleteProject = async id => {
		await this.props.deleteProject({
			variable: { id },
		})
		this.props.projectFeed.refetch()
		this.props.history.push('/projects/list')
	}
}

const DELETEPROJECTMUTATION = gql`
	mutation deleteProject($id: ID!) {
		removeProject(id: $id) {
			id
		}
	}
`
export default graphql(ProjectFeedQuery, { name: 'projectFeed' })(ProjectList)
