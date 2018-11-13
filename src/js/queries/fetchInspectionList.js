import gql from 'graphql-tag';

export default gql`
query inspectionFeed
    {
  vehicleInspectionFeed{
     
    id
	vehicleToBeInspected{
  	registrationNumber
    
    }
    otherDetails
    approxCostOfInspection
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