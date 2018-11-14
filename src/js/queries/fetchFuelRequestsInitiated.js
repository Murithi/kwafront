import gql from 'graphql-tag'

export default gql`
	query initiatedFuelRequests {
		initiatedFuelRequisitionsFeed {
			id
			requestDate
			requestedBy {
				id
				personnelDetails {
					firstName
					lastName
				}
			}
			vehicleToBeFueled {
				id
				registrationNumber
			}
			approxCostOfFuel
			requestApprovedBy {
				id
				personnelDetails {
					firstName
					lastName
				}
			}
			approvalDate
			approvalStatus
			otherDetails
			issuedCash
			paymentsDetails {
				id
				amountCharged
			}
			createdAt
			dateFueled
			updatedAt
		}
	}
`
