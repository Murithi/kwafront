import gql from 'graphql-tag'

export default gql`
query approvedInspections{
  approvedVehicleInspectionsFeed{
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
    amountCharged
  }
  createdAt
  dateInspected
  updatedAt
  }
}
`