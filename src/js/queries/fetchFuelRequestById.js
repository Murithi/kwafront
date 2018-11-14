import gql from 'graphql-tag'

export default gql`
	query getFuelRequest($id: ID!) {
		initiatedFuelRequisition(fuelRequisitionId: $id) {
			id
			vehicleToBeFueled {
				id
				registrationNumber
			}
			approxCostOfFuel
			requestDate
			approvalDate
			requestedBy {
				id
				personnelDetails {
					id
					firstName
					lastName
				}
			}
			createdAt
		}
	}
`
