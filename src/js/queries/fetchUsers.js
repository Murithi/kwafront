import gql from 'graphql-tag';
export default gql`
  {
    userFeed{
    id
    name
    email
    authorized    
    role
    locked
    personnelDetails {
      id
      lastName
      firstName
    }
  }
  }
`