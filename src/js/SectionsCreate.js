import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import InlineError from './messages/InlineError'
import {
	Divider,
	Form,
	Segment,
	Grid,
	Header,
	Message,
	Dropdown,
} from 'semantic-ui-react'
import gql from 'graphql-tag'
import DatePicker from 'react-datepicker'
import SectionFeedQuery from './queries/fetchSections'
import ProjectFeedQuery from './queries/fetchProjectList'
var options = []
class SectionsCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sectionName: '',
			sectionDescription: '',
			sectionProjectId: '',
			sectionStartDate: '',
			sectionCompletionDate: '',
			sectionLocation: '',
			errors: {},
			loading: false,
		}
	}
	handleStartDateChange = date => {
		this.setState({ sectionStartDate: date })
	}
	handleCompletionDateChange = date => {
		this.setState({ sectionCompletionDate: date })
	}
	setValue = (e, data) => {
		this.setState({ value: data })
	}
	validate = () => {
		console.log('validating')
		const errors = {}
		if (!this.state.sectionName) errors.sectionName = "Can't be blank"
		if (!this.state.sectionDescription)
			errors.sectionDescription = "Can't be blank"
		if (!this.state.value) errors.value = "Can't be blank"
		if (!this.state.sectionStartDate) errors.sectionStartDate = "Can't be blank"
		if (!this.state.sectionCompletionDate)
			errors.sectionCompletionDate = "Can't be blank"
		if (!this.state.sectionLocation) errors.sectionLocation = "Can't be blank"
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._createSection()
		}
		return errors
	}
	onSubmit = () => {
		const errors = this.validate()
		this.setState({ errors })
	}
	render() {
		const { errors, loading } = this.state
		if (this.props.projectFeed.loading === false) {
			const tempOps = this.props.projectFeed.projectFeed
			options = []
			tempOps.map(element => {
				options.push({
					id: element.id,
					text: element.projectName,
					value: element.projectName,
				})
			})
		}
		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					<Header as="h4" color="green" textAlign="center">
						Create Project
					</Header>
					<Divider />
					<Form size="large" onSubmit={this.onSubmit} loading={loading}>
						{errors.global && (
							<Message negative>
								<Message.Header> Something went wrong </Message.Header>
								<p>{errors.global}</p>
							</Message>
						)}
						<Segment stacked>
							<Form.Field error={!!errors.sectionName}>
								<label>Section Name</label>
								<input
									placeholder="Lare Road"
									value={this.state.sectionName}
									onChange={e => this.setState({ sectionName: e.target.value })}
								/>
							</Form.Field>
							<Divider />
							<Form.Field error={!!errors.sectionDescription}>
								<label>Section Description</label>
								<input
									placeholder="Lare Road"
									value={this.state.sectionDescription}
									onChange={e =>
										this.setState({ sectionDescription: e.target.value })
									}
								/>
							</Form.Field>
							<Divider />
							<Form.Field error={!!errors.projectId}>
								<label>Project</label>
								<Dropdown
									value={this.state.projectId}
									search
									selection
									options={options}
									onChange={this.setValue.bind(this)}
								/>
								{errors.projectId && <InlineError text={errors.projectId} />}
							</Form.Field>

							<Divider />
							<Form.Field error={!!errors.sectionStartDate}>
								<label>Section Commencement Date </label>{' '}
								<DatePicker
									selected={this.state.sectionStartDate}
									onChange={this.handleStartDateChange}
								/>
							</Form.Field>
							<Divider />
							<Form.Field error={!!errors.sectionCompletionDate}>
								<label>Section Completion Date </label>{' '}
								<DatePicker
									selected={this.state.sectionCompletionDate}
									onChange={this.handleCompletionDateChange}
								/>
							</Form.Field>
							<Divider />
							<Form.Field error={!!errors.sectionLocation}>
								<label>Section Location</label>
								<input
									placeholder="Lare Road"
									value={this.state.sectionLocation}
									onChange={e =>
										this.setState({ sectionLocation: e.target.value })
									}
								/>
							</Form.Field>

							<Form.Button fluid positive>
								{' '}
								Submit{' '}
							</Form.Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		)
	}

	_createSection = async () => {
		const {
			sectionName,
			sectionDescription,
			sectionStartDate,
			sectionCompletionDate,
			sectionLocation,
			value,
		} = this.state

		const result = options.find(project => project.value === value.value)
		const sectionProjectId = result.id
		let projectId = sectionProjectId
		await this.props.createSection({
			variables: {
				sectionName,
				sectionDescription,
				projectId,
				sectionStartDate,
				sectionCompletionDate,
				sectionLocation,
			},

			refetchQueries: [{ query: SectionFeedQuery }],
		})

		this.props.history.push('/sections/list')
	}
}

const CREATESECTIONMUTATION = gql`
	mutation createSection(
		$sectionName: String!
		$sectionDescription: String!
		$projectId: ID!
		$sectionStartDate: String
		$sectionCompletionDate: String
		$sectionLocation: String!
	) {
		addSection(
			sectionName: $sectionName
			sectionDescription: $sectionDescription
			projectId: $projectId
			sectionStartDate: $sectionStartDate
			sectionEndDate: $sectionCompletionDate
			sectionLocation: $sectionLocation
		)
	}
`
export default compose(
	graphql(ProjectFeedQuery, { name: 'projectFeed' }),
	graphql(CREATESECTIONMUTATION, { name: 'createSection' }),
)(withRouter(SectionsCreate))
