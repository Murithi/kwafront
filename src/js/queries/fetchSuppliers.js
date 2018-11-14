import gql from 'graphql-tag'

export default gql`
	query getSuppliers {
		suppliersFeed {
			id
			negotiatedRate
			otherDetails
			supplierName
			supplierPhone
			material {
				id
				materialName
				costPerUnit
			}
		}
	}
`
