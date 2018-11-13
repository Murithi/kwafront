import gql from 'graphql-tag';

export default gql`
query getPaymentDetails($requestServiceId:ID!){
  issuedRequisition(requestServiceId: $requestServiceId) {
     id
     
      issuedCash
      otherDetails
      vehicleToBeServiced{
        registrationNumber
      }
      requestedBy{
        personnelDetails{
          firstName
          lastName
        }
      }
    paymentsDetails{
      id
      amountIssued
    }
  }
}`;