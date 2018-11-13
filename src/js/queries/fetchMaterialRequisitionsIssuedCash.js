import gql from 'graphql-tag';

export default gql`
query getApprovedMaterialRequisitionsIssuedCash{
  issuedMaterialRequisitionsFeed{
    
    id
    paymentMode
    issuedCash
    requestDate
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }}
    cashPaymentsDetails{
      id
      amountIssued
      recieptNumber
      createdAt
    }
    otherPaymentDetails{
      id
      amountPaid
      createdAt
    }
    otherDetails
    approxCost
    materialType{
      materialName   
    }   
  }
}
`;