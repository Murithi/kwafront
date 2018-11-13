import gql from 'graphql-tag';

export default gql`
query getPaymentDetails($id:ID! ) {
  issuedMaterialRequisition(materialrequisitionId:$id){
     id
     
      issuedCash
      otherDetails
      materialType{
        materialName
      }
      requestedBy{
        personnelDetails{
          firstName
          lastName
        }
      }
    cashPaymentsDetails{
      id
      amountIssued
   
    }
    }
}`;