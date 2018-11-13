import gql from 'graphql-tag';

export default gql`
query DriversQueryFeed{
  driverFeed{
    id
    licenseNumber
    licenseExpiry
    personnelDetails{
      id
      idNumber
      firstName
      lastName
    }
  }
}
`;