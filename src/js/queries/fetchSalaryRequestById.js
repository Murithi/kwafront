import gql from 'graphql-tag'

export default gql`
query salaryRequests($salaryrequestId:ID!){
  initiatedSalaryRequest(salaryrequestId:$salaryrequestId){
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