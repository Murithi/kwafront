import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { Divider, Segment, Form, Header } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import PersonnelSalaryList from './PersonnelSalaryList'

class PersonnelSalariesRecieved extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	handleDateFromChange = date => {
		this.setState({ startDate: date })
	}

	handleDateToChange = date => {
		this.setState({ endDate: date })
	}
	render() {
		return (
			<Fragment>
				<Header as="h2" dividing color="green" textAlign="center">
					Personnel Salary List Summary
				</Header>
				<Divider color="olive" />
				<Form>
					<Segment.Group horizontal>
						<Segment />

						<Segment>
							<Form.Field>
								<DatePicker
									selected={this.state.startDate}
									onChange={this.handleDateFromChange}
								/>
								<label>Date From: </label>{' '}
							</Form.Field>
						</Segment>
						<Segment>
							<Form.Field>
								<DatePicker
									selected={this.state.endDate}
									onChange={this.handleDateToChange}
								/>
								<label>Date To: </label>{' '}
							</Form.Field>
						</Segment>
					</Segment.Group>
				</Form>

				<hr color="pink" />
				<PersonnelSalaryList
					id={this.props.id}
					startDate={moment(this.state.startDate).format('MMM DD YYYY')}
					endDate={moment(this.state.endDate).format('MMM DD YYYY')}
				/>
			</Fragment>
		)
	}
}

export default PersonnelSalariesRecieved
