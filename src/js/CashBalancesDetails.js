import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {
	Header,
	Table,
	Grid,
	Message,
	Button,
	Icon,
	Menu,
	Divider,
	Form,
	Segment,
	Checkbox,
} from 'semantic-ui-react'
import moment from 'moment'
import gql from 'graphql-tag'
import _ from 'lodash'
import { Link, Route } from 'react-router-dom'

import getAccountDetails from './queries/fetchAccountDetails'

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
class CashBalancesDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return <div>Hey</div>
	}
}

export default graphql(getAccountDetails, {
	name: 'accountRequest',
	options: props => ({
		variables: {
			id: props.match.params.id,
		},
	}),
})(CashBalancesDetails)
