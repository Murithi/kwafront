import gql from 'graphql-tag';
export default gql`
query getPaymentDetails($id:ID! ) {
    paymentIssue(id: $id) {
  id
  requestedInspectionPayment{
  id
      issuedCash
      otherDetails
      vehicleToBeInspected{
        registrationNumber
      }
      requestedBy{
        personnelDetails{
          firstName
          lastName
        }
      
      }
  }
  }
}
`