import gql from 'graphql-tag';

export default gql`
query InitiatedRequisitionsFeed{
  InitiatedRequisitionsFeed{
    id
    vehicleToBeServiced{
      registrationNumber
    }
    approxCostOFService
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    otherDetails
    approvalStatus
  }
}
`;