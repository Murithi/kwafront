import gql from 'graphql-tag'

export default gql`
	query getMaterialRequisition($id: ID!) {
		initiatedMaterialRequisition(materialrequisitionId: $id) {
			id
			materialType {
				id
				materialName
			}
			supplier {
				id
				supplierName
			}
			quantity
			approvalDate
			requestDate
			approxCost
			approvalDate
			requestedBy {
				id
				personnelDetails {
					id
					firstName
					lastName
				}
			}
			requestApprovedBy {
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
