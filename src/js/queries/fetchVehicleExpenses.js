import gql from 'graphql-tag'
export default gql`
	query vehicleRequestsSum($startDate: String!, $endDate: String!) {
		INSPECTIONREQUESTS: paymentIssuedSumByType(
			paymentType: "INSPECTIONREQUESTS"
			startDate: $startDate
			endDate: $endDate
		)
		FUELREQUESTS: paymentIssuedSumByType(
			paymentType: "FUELREQUESTS"
			startDate: $startDate
			endDate: $endDate
		)
		REPAIRSREQUESTS: paymentIssuedSumByType(
			paymentType: "REPAIRSREQUESTS"
			startDate: $startDate
			endDate: $endDate
		)
		SERVICEREQUESTS: paymentIssuedSumByType(
			paymentType: "SERVICEREQUESTS"
			startDate: $startDate
			endDate: $endDate
		)
		INSPECTIONTOTALS: paymentIssueSumByTypeGrouped(
			paymentType: "INSPECTIONREQUESTS"
			startDate: $startDate
			endDate: $endDate
		) {
			month
			amount
		}
		FUELTOTALS: paymentIssueSumByTypeGrouped(
			paymentType: "FUELREQUESTS"
			startDate: $startDate
			endDate: $endDate
		) {
			month
			amount
		}
		REPAIRSTOTALS: paymentIssueSumByTypeGrouped(
			paymentType: "REPAIRSREQUESTS"
			startDate: $startDate
			endDate: $endDate
		) {
			month
			amount
		}
		SERVICETOTALS: paymentIssueSumByTypeGrouped(
			paymentType: "SERVICEREQUESTS"
			startDate: $startDate
			endDate: $endDate
		) {
			month
			amount
		}
	}
`
