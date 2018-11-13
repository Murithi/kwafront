import gql from 'graphql-tag';

export default gql`
query fuelRequestFeed
    {
  fuelRequestFeed{
     
    id
	vehicleToBeFueled{
  	registrationNumber
    
    }
    otherDetails
    approxCostOfFuel
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

`