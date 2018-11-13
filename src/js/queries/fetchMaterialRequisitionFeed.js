import { gql } from 'apollo-boost'

export default gql`
query getMaterialRequisitions{
	materialRequisitionFeed{
    id
    materialType{
      
      materialName
    }
    paymentMode
    approvalDate
    approxCost
    approvalDate
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    requestApprovedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    createdAt
  }
}`