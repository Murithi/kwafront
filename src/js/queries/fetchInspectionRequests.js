import gql from 'graphql-tag'

export default gql`
query VehicleInspectionsFeed{
  vehicleInspectionFeed{
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