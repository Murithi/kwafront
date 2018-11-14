import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'
import Phone from 'react-phone-number-input'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'
import { Query } from 'react-apollo'
import {
	Form,
	Segment,
	Icon,
	Grid,
	Header,
	Message,
	Divider,
} from 'semantic-ui-react'
import InlineError from './messages/InlineError'
import suppliersFeeds from './queries/fetchSuppliers'
import Supplier from './queries/fetchSupplierById'
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
			<Message.Header>No Suppliers with that ID Found</Message.Header>
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

var options = []
var materialsId
class SuppliersCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			materialsId: '',
			materialsName: '',
			negotiatedRate: '',
			otherDetails: '',
			supplierName: '',
			supplierPhone: '',
			errors: {},
			loading: false,
		}
	}
	setValue = (e, data) => {
		console.log(data)
		this.setState({
			materialsName: data.value,
		})
	}
	validate = () => {
		const errors = {}

		if (!this.state.negotiatedRate) errors.negotiatedRate = "Can't be blank"
		if (!this.state.supplierName) errors.supplierName = "Can't be blank"
		if (!this.state.supplierPhone) errors.supplierPhone = "Can't be blank"
		if (!this.state.otherDetails) errors.otherDetails = "Can't be blank"
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this._changeSupplier()
		}
		return errors
	}
	onSubmit = () => {
		const errors = this.validate()
		this.setState({ errors })
	}
	render() {
		console.log(this.props)
		const { errors, loading } = this.state

		if (this.props.suppliersFeed.loading) {
			return <div>{loadingMessage}</div>
		}
		if (this.props.suppliersFeed.loading) {
			return <div>{timeoutMessage}</div>
		}
		const { suppliersFeed } = this.props.suppliersFeed
		if (!suppliersFeed) {
			return <div>{emptyMessage}</div>
		}

		console.log(this.props.suppliersFeed.suppliersFeed[0].material.id)

		return (
			<Grid
				textAlign="center"
				style={{ height: '100%' }}
				verticalAlign="middle"
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					<Header as="h2" color="green" textAlign="center">
						Edit {suppliersFeed[0].material.materialName} Supplier Details
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
							<Form.Field error={!!errors.supplierName}>
								<label>Supplier Name</label>
								<input
									placeholder={suppliersFeed[0].supplierName}
									value={this.state.supplierName}
									onChange={e =>
										this.setState({ supplierName: e.target.value })
									}
								/>
								{errors.supplierName && (
									<InlineError text={errors.supplierName} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.supplierPhone}>
								<label>Suppliers Phone</label>
								<Phone
									placeholder={suppliersFeed[0].supplierPhone}
									value={this.state.supplierPhone}
									onChange={supplierPhone => this.setState({ supplierPhone })}
								/>

								{errors.supplierPhone && (
									<InlineError text={errors.supplierPhone} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.negotiatedRate}>
								<label>Negotiated Rate</label>
								<input
									placeholder={suppliersFeed[0].negotiatedRate}
									value={this.state.negotiatedRate}
									onChange={e =>
										this.setState({ negotiatedRate: e.target.value })
									}
								/>
								{errors.negotiatedRate && (
									<InlineError text={errors.negotiatedRate} />
								)}
							</Form.Field>
							<Form.Field error={!!errors.otherDetails}>
								<label>Other Details</label>
								<input
									placeholder={suppliersFeed[0].otherDetails}
									value={this.state.otherDetails}
									onChange={e =>
										this.setState({ otherDetails: e.target.value })
									}
								/>
								{errors.otherDetails && (
									<InlineError text={errors.otherDetails} />
								)}
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
	_changeSupplier = async () => {
		const {
			negotiatedRate,
			otherDetails,
			supplierName,
			supplierPhone,
		} = this.state

		const materialsId = this.props.suppliersFeed.suppliersFeed[0].material.id

		let id = this.props.match.params.id
		await this.props.changeSupplier({
			variables: {
				id,
				negotiatedRate,
				materialsId,
				supplierName,
				supplierPhone,
			},
			refetchQueries: [{ query: suppliersFeeds }],
		})
		this.props.history.push('/suppliers/list')
	}
}

const CHANGESUPPLIERMUTATION = gql`
	mutation changeSupplier(
		$id: ID!
		$supplierName: String!
		$supplierPhone: String!
		$negotiatedRate: Int!
		$materialsId: ID!
	) {
		editSupplier(
			id: $id
			supplierName: $supplierName
			supplierPhone: $supplierPhone
			negotiatedRate: $negotiatedRate
			materialsId: $materialsId
		)
	}
`

export default compose(
	graphql(suppliersFeeds, {
		name: 'suppliersFeed',
		options: props => ({
			variables: {
				id: props.match.params.id,
			},
		}),
	}),
	graphql(CHANGESUPPLIERMUTATION, { name: 'changeSupplier' }),
)(SuppliersCreate)
