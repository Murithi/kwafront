import gql from 'graphql-tag';

export default gql`
  query getPersonnelDetailsQuery($id: ID!) {
    personnel(id: $id) {
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
    }
  }
`;
