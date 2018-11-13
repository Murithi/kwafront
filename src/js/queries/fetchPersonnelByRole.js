import gql from 'graphql-tag'

export default gql`
query personnelByRoleFeed($id: ID!){
    personnelRole(id:$id){
      id
      roleName
      personnels{
        id
        idNumber
        firstName
        lastName
        phoneNumber
        assignedToProject
        projectAssignedTo {
          id
          projectName
        }
      }
    }
  }
`;