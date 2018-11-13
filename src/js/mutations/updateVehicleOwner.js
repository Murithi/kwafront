import gql from 'graphql-tag';

export default gql`
  mutation updateVehicleOwner($id: ID!, $name: String!, $phone: String!, $email: String!) {
    editVehicleOwner(id: $id, name: $name, phone: $phone, email: $email) {
      id
      name
      phone
      email
    }
  }
`;
