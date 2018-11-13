import gql from 'graphql-tag'

export default gql `
query userDetails($id:ID!){
  user(id:$id){
    personnelDetails{
      firstName
      lastName
    }
    name
    role
    email
    locked
    authorized
  }
}
`