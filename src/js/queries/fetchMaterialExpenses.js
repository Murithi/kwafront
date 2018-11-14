import gql from 'graphql-tag'

export default gql`
	query vehicleRequestsSum($startDate: String!, $endDate: String!) {
		MATERIALREQUESTS: paymentIssuedSumByType(
			paymentType: "MATERIALREQUESTS"
			startDate: $startDate
			endDate: $endDate
		)
		MATERIALTOTALS: paymentIssueSumByTypeGrouped(
			paymentType: "MATERIALREQUESTS"
			startDate: $startDate
			endDate: $endDate
		) {
			month
			amount
		}
	}
`
