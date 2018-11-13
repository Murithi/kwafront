import { gql } from 'apollo-boost'

export default gql`
query getInitiatedMaterialRequisitions{
  initiatedMaterialRequisitionsFeed{
    id
    materialType{
      
      materialName
    }
    supplier{
      supplierName
    }
    quantity
    approvalDate
    approxCost
    requestDate
    approvalDate
    approvalStatus
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
}
`;