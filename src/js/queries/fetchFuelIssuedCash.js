import gql from 'graphql-tag'
export default gql`
	query getIssuedFuelIssuedPayment {
		issuedFuelRequisitionsFeed {
			id
			paymentsDetails {
				amountIssued
				dateIssued
			}
			createdAt
			issuedCash
			otherDetails
			vehicleToBeFueled {
				registrationNumber
			}
			requestedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
		}
	}
`
