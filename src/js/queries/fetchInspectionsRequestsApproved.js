import gql from 'graphql-tag'

export default gql`
	query approvedInspections {
		approvedVehicleInspectionsFeed {
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
				amountCharged
			}
			createdAt
			dateInspected
			updatedAt
		}
	}
`
