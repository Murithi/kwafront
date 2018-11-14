import React, { Component, Fragment } from 'react'
import ReactChartkick, {
	LineChart,
	PieChart,
	ColumnChart,
	BarChart,
} from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class LinearChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<Fragment>
				<LineChart data={{ '2017-01-01': 11, '2017-01-02': 6 }} />
				<PieChart data={[['Blueberry', 44], ['Strawberry', 23]]} />
				<ColumnChart data={[['Sun', 32], ['Mon', 46], ['Tue', 28]]} />
				<BarChart data={[['Work', 32], ['Play', 1492]]} />
			</Fragment>
		)
	}
}

export default LinearChart
