import gql from 'graphql-tag';

export default gql`
  query PersonnelSearchQuery($filter: String!) {
    personnelFeed(filter: $filter) {
      id
      firstName
      lastName  
      nssfId
      nhifId
      idNumber
      phoneNumber
      gender
      location
      addressNo
      photoUrl
      highestEducationLevel
      certificatesUrl
      curriculumVitaeUrl
      designation{
        id
        roleName
      }
      dateOfEmployment
      dateOfTermination
      currentSalary
      assignedToProject
    }
  }
`;