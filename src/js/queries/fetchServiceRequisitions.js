import gql from 'graphql-tag'

export default gql`
	query serviceRequisitionFeed {
		requestServiceFeed {
			id
			vehicleToBeServiced {
				registrationNumber
			}
			otherDetails
			approxCostOFService
			createdAt
			requestedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			approvalStatus
			approvalDate
			requestDate
			requestApprovedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			paymentsDetails {
				amountIssued
				dateIssued
				amountCharged
				amountReturned
				dateReported
			}
		}
	}
`
