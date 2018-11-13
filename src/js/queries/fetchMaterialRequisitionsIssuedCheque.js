import gql from 'graphql-tag';

export default gql`
query getApprovedMaterialRequisitionsIssuedCash{
  approvedMaterialRequisitionsFeed{
    id
    materialType{
      materialName
    }
    proposedSupplier{
      supplierName
    }
    quantity
    approxCost
   requestedBy{
    personnelDetails{
      firstName
      lastName
    }
  }
    
    createdAt
    otherPaymentDetails{
      id
      amountPaid
      discountRecieved
      datePaid
    }
    
  }
}
`;