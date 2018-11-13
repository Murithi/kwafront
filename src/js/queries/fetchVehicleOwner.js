import gql from 'graphql-tag';

export default gql`
  query getVehicleOwnerQuery($id: ID!) {
    vehicleOwner(id: $id) {
      id
      name
      phone
      email
      createdAt
      updatedAt
    }
  }
`;
