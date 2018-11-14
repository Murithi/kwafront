import gql from 'graphql-tag'
export default gql`
	query getPaymentDetails($repairrequisitionId: ID!) {
		issuedRepairsRequisition(repairrequisitionId: $repairrequisitionId) {
			id
			issuedCash
			otherDetails
			vehicleToBeRepaired {
				id
				registrationNumber
			}
			requestedBy {
				id
				personnelDetails {
					id
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
