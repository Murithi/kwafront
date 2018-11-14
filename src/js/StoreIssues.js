import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
	Form,
	Segment,
	Grid,
	Header,
	TextArea,
	Message,
	Dropdown,
	Divider,
	Image,
} from 'semantic-ui-react'
import InlineError from './messages/InlineError'

import getProjects from './queries/fetchProjectList'
import getMaterialCosting from './queries/fetchMaterials'

var materialOptions = []
var projectOptions = []
class StoreIssues extends Component {
	constructor(props) {
		super(props)
		this.state = {
			itemId: '',
			balBefore: '',
			unitsIssued: '',
			dateOfTran: moment(),
			materialsIssuedTo: '',
			StoreBalId: '',
			loading: false,
			errors: {},
		}
	}

	handleDateOfTranChange = date => {
		this.setState({ dateOfTran: date })
	}

	setProjectValue = (e, data) => {
		projectOptions.forEach(element => {
			if (element.value === data.value) {
				this.setState({ materialsIssuedTo: element.id })
				this.setState({ project: element.value })
			}
		})
	}
	setMaterialValue = (e, data) => {
		materialOptions.forEach(element => {
			if (element.value === data.value) {
				this.setState({ itemId: element.id })
				this.setState({ material: element.value })
			}
		})
	}

	validate = () => {
		const errors = {}
		if (!this.state.itemId) errors.itemId = "Can't be blank"
		if (!this.state.materialsIssuedTo)
			errors.materialsIssuedTo = "Can't be blank"
		if (!this.state.unitsIssued) errors.unitsIssued = "Can't be blank"

		if (Object.keys(errors).length === 0) {
			this._addIssue()
		}
		return errors
	}

	onSubmit = () => {
		const errors = this.validate()

		this.setState({ errors })
	}
	render() {
		console.log(this.props)
		const { loading, errors } = this.state
		if (this.props.projectFeed.loading === false) {
			if (
				this.props.projectFeed.projectFeed !== undefined ||
				this.props.projectFeed.projectFeed.length !== 0
			) {
				let tempOp = [...new Set(this.props.projectFeed.projectFeed)]
				projectOptions = []
				tempOp.map(element => {
					return projectOptions.push({
						id: element.id,
						text: element.projectName,
						value: element.projectName,
					})
				})
			}
		}

		if (this.props.materialsCostFeed.loading === false) {
			if (
				this.props.materialsCostFeed.materialsCostingFeed !== undefined ||
				this.props.materialsCostFeed.materialsCostingFeed.length !== 0
			) {
				let tempOp = [
					...new Set(this.props.materialsCostFeed.materialsCostingFeed),
				]
				materialOptions = []
				tempOp.map(element => {
					return materialOptions.push({
						id: element.id,
						text: element.materialName,
						value: element.materialName,
					})
				})
			}
		}
		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					<Header as="h2" color="green" textAlign="center">
						Add Issues Details
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
							<Form.Field error={!!errors.itemId}>
								<label> Goods Issued </label>{' '}
								<Dropdown
									value={this.state.material}
									search
									selection
									options={materialOptions}
									onChange={this.setMaterialValue.bind(this)}
								/>
								{errors.itemId && <InlineError text={errors.itemId} />}
							</Form.Field>

							<Form.Field error={!!errors.materialsIssuedTo}>
								<label> Goods Issued To </label>{' '}
								<Dropdown
									value={this.state.project}
									search
									selection
									options={projectOptions}
									onChange={this.setProjectValue.bind(this)}
								/>
								{errors.materialsIssuedTo && (
									<InlineError text={errors.materialsIssuedTo} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.unitsIssued}>
								<label> Units Issued</label>{' '}
								<input
									placeholder="0000"
									value={this.state.unitsIssued}
									type="number"
									onChange={e => this.setState({ unitsIssued: e.target.value })}
								/>
								{errors.unitsIssued && (
									<InlineError text={errors.unitsIssued} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.dateOfTran}>
								<label> Date</label>{' '}
								<DatePicker
									isClearable={true}
									selected={this.state.dateOfTran}
									onChange={this.handleDateOfTranChange}
									todayButton={'Today'}
								/>
								{errors.dateOfTran && <InlineError text={errors.dateOfTran} />}
							</Form.Field>
							<Form.Button fluid positive>
								Submit
							</Form.Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		)
	}
	_addIssue = async () => {
		const { itemId, unitsIssued, dateOfTran, materialsIssuedTo } = this.state

		const StoreBalId = this.props.materialsCostFeed.materialsCostingFeed[0]
			.balance.id
		const balanceBefore = this.props.materialsCostFeed.materialsCostingFeed[0]
			.balance.balance

		await this.props.addIssue({
			variables: {
				materialsCostingId: itemId,
				balanceBefore,
				unitsTransacted: unitsIssued,
				transactionDate: dateOfTran,
				projectId: materialsIssuedTo,
				StoreBalId,
			},
		})
		this.props.history.push('/')
	}
}

const ADDISSUE = gql`
	mutation issueMaterial(
		$materialsCostingId: ID!
		$balanceBefore: Int!
		$unitsTransacted: Int!
		$StoreBalId: ID!
		$transactionDate: String!
		$projectId: ID!
	) {
		addIssue(
			materialsCostingId: $materialsCostingId
			balanceBefore: $balanceBefore
			unitsTransacted: $unitsTransacted
			transactionDate: $transactionDate
			projectId: $projectId
			StoreBalId: $StoreBalId
		)
	}
`

export default compose(
	graphql(getMaterialCosting, {
		name: 'materialsCostFeed',
	}),
	graphql(getProjects, {
		name: 'projectFeed',
	}),
	graphql(ADDISSUE, {
		name: 'addIssue',
	}),
)(StoreIssues)
