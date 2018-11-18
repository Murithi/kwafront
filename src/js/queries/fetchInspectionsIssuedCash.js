import gql from 'graphql-tag'

export default gql`
	query issuedInspections {
		issuedVehicleInspectionsFeed {
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
