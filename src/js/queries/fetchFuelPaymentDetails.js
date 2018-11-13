import  gql from "graphql-tag";

export default gql`
query getPaymentDetails($id:ID! ) {
  issuedFuelRequisition(fuelRequisitionId: $id) {         
  	id
    paymentsDetails{
        id
        amountIssued
      }  
  	createdAt
  	issuedCash
    otherDetails
    vehicleToBeFueled{
      registrationNumber
    }
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }  
  }
}`