import gql from 'graphql-tag'

export default gql`
	query getPaymentDetails($id: ID!) {
		issuedVehicleInspection(vehicleinspectionId: $id) {
			id
			requestedBy {
				id
				personnelDetails {
					id
					firstName
					lastName
				}
			}
			vehicleToBeInspected {
				id
				registrationNumber
			}
			approxCostOfInspection
			requestApprovedBy {
				id
				personnelDetails {
					id
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
				amountIssued
			}
			createdAt
			dateInspected
			updatedAt
		}
	}
`
