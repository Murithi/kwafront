import gql from 'graphql-tag';

export default gql`
  query VehicleOwnerFeed {
    vehicleOwnerFeed {
      id
      name
      phone
      email
    }
  }
`;
