import gql from 'graphql-tag';

export default gql`
query getApprovedRequisitions{
  approvedRepairsRequisitionsFeed{
    id
    vehicleToBeRepaired{
      registrationNumber
    }
    approxCostOfRepair
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    requestApprovedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    otherDetails
    approvalStatus
    approvalDate
    paymentsDetails{
                id
                amountIssued
                }
  }
}
`;