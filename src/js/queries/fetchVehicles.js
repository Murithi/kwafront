import gql from 'graphql-tag';

export default gql`
  query VehicleFeed {
    vehicleFeed {
      id
      registrationNumber
      logBookNumber
      model
      fuelType
      insuranceValuation
      insuranceRenewalDate
      manufactureDate
      owner {
        id
        name
      }
    }
  }
`;
