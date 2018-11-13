import gql from 'graphql-tag'

export default gql`
  query {
    searchedPersonnelDetails @client {
      firstName
      lastName
      personnelID
      photoUrl
      assignedAccount
    }
  }

`;