import gql from 'graphql-tag'

export default gql`
query advanceRequests($advanceRequestId:ID!){
  initiatedAdvanceRequest(advanceRequestId:$advanceRequestId){
    id
    createdAt
    amountRequested
    otherDetails
    requestDate
    approvalDate
    approvalStatus
    payee{
      id
      firstName
      lastName
    }
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    
  }
}
`