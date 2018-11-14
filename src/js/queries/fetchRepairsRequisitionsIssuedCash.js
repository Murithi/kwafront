import gql from 'graphql-tag'

export default gql`
	query getApprovedRequisitionsIssuedPayment {
		issuedRepairsRequisitionsFeed {
			id
			issuedCash
			requestDate

			approxCostOfRepair
			otherDetails
			paymentsDetails {
				id
				amountIssued
				recieptNumber
				dateIssued
			}
			vehicleToBeRepaired {
				id
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
