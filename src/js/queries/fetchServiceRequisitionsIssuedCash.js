import gql from 'graphql-tag';

export default gql`
query getIssuedServiceRequisitions{
  issuedRequisitionsFeed{
      id
      vehicleToBeServiced{
          registrationNumber
      }
      requestDate
      approvalDate
      requestApprovedBy{
          personnelDetails{
              firstName
              lastName
          }
      }
      approxCostOFService
      otherDetails
      requestedBy{
          personnelDetails{
              firstName
              lastName
          }
      }
      paymentsDetails{
          id
          amountIssued
          cashReported
          dateIssued
          }
  }
}
`;