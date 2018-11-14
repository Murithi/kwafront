import gql from 'graphql-tag'

export default gql`
	query getIssuedPayments {
		paymentsIssuedFeed {
			id
			vehicleToBeServiced {
				registrationNumber
			}
			approvalDate
			requestApprovedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			approxCostOFService
			otherDetails
			requestedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			paymentsDetails {
				id
				amountIssued
			}
		}
	}
`
