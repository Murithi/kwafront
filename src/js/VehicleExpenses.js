import React, { Component, Fragment } from 'react'
import { Grid, Divider, Segment, Header } from 'semantic-ui-react'
import currencyFormatter from 'currency-formatter'
import ReactChartkick, {
	LineChart,
	PieChart,
	ColumnChart,
	BarChart,
} from 'react-chartkick'
import Chart from 'chart.js'
import getTotals from './queries/fetchVehicleExpenses'
import { graphql } from 'react-apollo'

class VehicleExpenses extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		// const {month, amount}=this.props.totalsFeed.INSPECTIONTOTALS[0]
		var inspectionsdata = {}
		var repairsdata = {}
		var servicedata = {}
		var fueldata = {}

		if (this.props.totalsFeed.INSPECTIONTOTALS !== undefined) {
			this.props.totalsFeed.INSPECTIONTOTALS.map(request => {
				let { month, amount } = request
				inspectionsdata[`"${month}"`] = `${amount}`
			})
			console.log(this.props.totalsFeed.INSPECTIONTOTALS)
		}

		if (this.props.totalsFeed.REPAIRSTOTALS !== undefined) {
			this.props.totalsFeed.REPAIRSTOTALS.map(repairrequest => {
				let { month, amount } = repairrequest
				repairsdata[`"${month}"`] = `${amount}`
			})
			console.log(this.props.totalsFeed.REPAIRSTOTALS)
		}

		if (this.props.totalsFeed.SERVICETOTALS !== undefined) {
			this.props.totalsFeed.SERVICETOTALS.map(request => {
				let { month, amount } = request
				servicedata[`"${month}"`] = `${amount}`
			})
			console.log(this.props.totalsFeed.SERVICETOTALS)
		}

		if (this.props.totalsFeed.FUELTOTALS !== undefined) {
			this.props.totalsFeed.FUELTOTALS.map(request => {
				let { month, amount } = request
				fueldata[`"${month}"`] = `${amount}`
			})
			console.log(this.props.totalsFeed.FUELTOTALS)
		}

		return (
			<Segment>
				<Grid columns={2} relaxed>
					<Grid.Column>
						<b>TOTAL REPAIRS</b>
						<Divider />
						<b>TOTAL INSPECTION REQUESTS</b>
						<Divider />
						<b>TOTAL SERVICE REQUESTS</b>
						<Divider />
						<b>TOTAL FUEL REQUESTS</b>
						<Divider />
					</Grid.Column>

					<Grid.Column>
						<b>
							{currencyFormatter.format(this.props.totalsFeed.REPAIRSREQUESTS, {
								code: 'KES',
							})}
						</b>
						<Divider />
						<b>
							{currencyFormatter.format(
								this.props.totalsFeed.INSPECTIONREQUESTS,
								{ code: 'KES' },
							)}
						</b>
						<Divider />
						<b>
							{currencyFormatter.format(this.props.totalsFeed.SERVICEREQUESTS, {
								code: 'KES',
							})}
						</b>
						<Divider />
						<b>
							{currencyFormatter.format(this.props.totalsFeed.FUELREQUESTS, {
								code: 'KES',
							})}
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
									data={inspectionsdata}
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
									Vehicle Inspections
								</Header>
							</div>
						</div>
						<div class="ui clearing divider " color="pink" />
						<div class="ui segments">
							<div class="ui segment" />
							<div class="ui secondary segment">
								<LineChart
									data={fueldata}
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
									Fuel Requests
								</Header>
							</div>
						</div>
						<div class="ui clearing divider " color="pink" />

						<div class="ui segments center">
							<div class="ui segment" />
							<div class="ui secondary segment">
								<LineChart
									data={repairsdata}
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
									Repair Requests
								</Header>
							</div>
						</div>
						<div class="ui clearing divider " color="pink" />
						<div class="ui segments">
							<div class="ui segment" />
							<div class="ui secondary segment">
								<LineChart
									data={servicedata}
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
									Service Requests
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

export default graphql(getTotals, {
	name: 'totalsFeed',
	options: props => ({
		variables: {
			startDate: props.startDate,
			endDate: props.endDate,
		},
	}),
})(VehicleExpenses)
