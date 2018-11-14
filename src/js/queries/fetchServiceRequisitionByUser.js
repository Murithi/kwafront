import gql from 'graphql-tag'

export default gql`
	query InitiatedRequisitionsFeed {
		InitiatedRequisitionsFeed {
			id
			vehicleToBeServiced {
				id
				registrationNumber
			}
			requestDate
			approxCostOFService
			requestedBy {
				id
				personnelDetails {
					id
					firstName
					lastName
				}
			}
			otherDetails
			approvalStatus
		}
	}
`
