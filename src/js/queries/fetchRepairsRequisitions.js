import gql from 'graphql-tag';

export default gql`
query repairsRequisitionFeed{
  repairsRequestFeed{
    id
	vehicleToBeRepaired{
  	registrationNumber
    
    }
    otherDetails
    approxCostOfRepair
    createdAt
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    approvalStatus
    approvalDate
    requestApprovedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    paymentsDetails{
      amountIssued
      dateIssued
      amountCharged     
      amountReturned
      dateReported
    }
    
  }
  
}
`;