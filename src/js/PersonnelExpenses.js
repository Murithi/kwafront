import React, { Component, Fragment } from 'react'
import { Grid, Divider, Segment, Header } from 'semantic-ui-react'
import currencyFormatter from 'currency-formatter'
import { graphql, compose } from 'react-apollo'
import ReactChartkick, {
	LineChart,
	PieChart,
	ColumnChart,
	BarChart,
} from 'react-chartkick'
import Chart from 'chart.js'
import getSalaryTotals from './queries/fetchPersonnelSalaryExpenses'

class PersonnelExpenses extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		var salarydata = {}
		var advancedata = {}
		var overtimedata = {}

		if (this.props.totalsFeed.SALARYTOTALS !== undefined) {
			this.props.totalsFeed.SALARYTOTALS.map(request => {
				let { month, amount } = request
				salarydata[`"${month}"`] = `${amount}`
			})
		}

		if (this.props.totalsFeed.ADVANCETOTALS !== undefined) {
			this.props.totalsFeed.ADVANCETOTALS.map(advancerequest => {
				let { month, amount } = advancerequest
				advancedata[`"${month}"`] = `${amount}`
			})
		}

		if (this.props.totalsFeed.OVERTIMETOTALS !== undefined) {
			this.props.totalsFeed.OVERTIMETOTALS.map(overtimerequest => {
				let { month, amount } = overtimerequest
				overtimedata[`"${month}"`] = `${amount}`
			})
		}
		return (
			<Segment>
				<Grid columns={2} relaxed>
					<Grid.Column>
						<b>TOTAL SALARIES</b>
						<Divider />
						<b>TOTAL ADVANCE REQUESTS</b>
						<Divider />
						<b>TOTAL OVERTIME REQUESTS</b>
						<Divider />
					</Grid.Column>

					<Grid.Column>
						<b>
							{currencyFormatter.format(this.props.totalsFeed.SALARYREQUESTS, {
								code: 'KES',
							})}
						</b>
						<Divider />
						<b>
							{currencyFormatter.format(this.props.totalsFeed.ADVANCEREQUESTS, {
								code: 'KES',
							})}
						</b>
						<Divider />
						<b>
							{currencyFormatter.format(
								this.props.totalsFeed.OVERTIMEREQUESTS,
								{ code: 'KES' },
							)}
						</b>
						<Divider />
					</Grid.Column>
				</Grid>
				{this.props.startDate && this.props.endDate && (
					<Fragment>
						<hr color="pink" />
						<div class="ui segments">
							<div class="ui segment" />
							<div class="ui secondary segment">
								<LineChart
									data={salarydata}
									legend={true}
									width="800px"
									height="500px"
									colors={['#008080', '#008080']}
									xtitle="Time"
									ytitle="Amount in KES"
								/>
							</div>
							<div className="ui segment">
								<Header as="h4" dividing color="green" textAlign="center">
									Salary Requests
								</Header>
							</div>
						</div>
						<div class="ui clearing divider " color="pink" />
						<div class="ui segments">
							<div class="ui segment" />
							<div class="ui secondary segment">
								<LineChart
									data={advancedata}
									legend={true}
									width="800px"
									height="500px"
									colors={['#008080', '#008080']}
									xtitle="Time"
									ytitle="Amount in KES"
								/>
							</div>
							<div className="ui segment">
								<Header as="h4" dividing color="green" textAlign="center">
									Advance Requests
								</Header>
							</div>
						</div>
						<div class="ui clearing divider " color="pink" />
						<div class="ui segments">
							<div class="ui segment" />
							<div class="ui secondary segment">
								<LineChart
									data={overtimedata}
									legend={true}
									width="800px"
									height="500px"
									colors={['#008080', '#008080']}
									xtitle="Time"
									ytitle="Amount in KES"
								/>
							</div>
							<div className="ui segment">
								<Header as="h4" dividing color="green" textAlign="center">
									Overtime Requests
								</Header>
							</div>
						</div>
						<div class="ui clearing divider " color="pink" />
					</Fragment>
				)}
			</Segment>
		)
	}
}

export default graphql(getSalaryTotals, {
	name: 'totalsFeed',
	options: props => ({
		variables: {
			startDate: props.startDate,
			endDate: props.endDate,
		},
	}),
})(PersonnelExpenses)
