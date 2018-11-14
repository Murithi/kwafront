import gql from 'graphql-tag'

export default gql`
	query getVehicleInspection($id: ID!) {
		initiatedMiscellaneousRequisition(miscellaneousrequisitionId: $id) {
			id
			otherDetails
			amountRequested
			requestDate
			requestedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			cashPaymentsDetails {
				id
				amountIssued
			}
			createdAt
		}
	}
`
