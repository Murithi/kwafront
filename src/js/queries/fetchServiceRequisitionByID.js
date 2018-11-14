import gql from 'graphql-tag'

export default gql`
	query getServiceRequisition($id: ID!) {
		initiatedRequisition(requestServiceId: $id) {
			id
			vehicleToBeServiced {
				registrationNumber
			}
			requestDate
			approxCostOFService
			requestedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			otherDetails
			approvalStatus
			createdAt
			approvalDate
		}
	}
`
