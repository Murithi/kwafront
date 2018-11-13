import gql from 'graphql-tag';

export default gql`
query issuedInspections{
  issuedVehicleInspectionsFeed{
     id
  
  requestedBy{
    id
    personnelDetails{
      firstName
      lastName
    }
  }
  vehicleToBeInspected{
    id
    registrationNumber
  }
  approxCostOfInspection
  requestApprovedBy{
    id
    personnelDetails{
      firstName
      lastName
    }
  }
  approvalDate
  approvalStatus
  otherDetails
  issuedCash
  paymentsDetails{
    id
    amountIssued
  }
  createdAt
  dateInspected
  updatedAt
  }
}
`