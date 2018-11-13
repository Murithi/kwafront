import gql from 'graphql-tag';

export default gql`
  mutation createPersonnel(
    $firstName:String!,
    $lastName: String!,  
    $idNumber: String!, 
    $nssfId: String!, 
    $nhifId: String!, 
    $phoneNumber: String!, 
    $gender: Boolean!, 
    $addressNo: String!,   
    $location: String!, 
    $photoUrl: String!, 
    $highestEducationLevel: String!,   
    $certificatesUrl: String!,
    $curriculumVitaeUrl: String!, 
    $roleId:String!, 
    $dateOfEmployment: String!, 
    $currentSalary: String!
  ) {
    addPersonnel(
      firstName:$firstName
      lastName: $lastName
      idNumber: $idNumber
      nssfId: $nssfId
      nhifId: $nhifId
      phoneNumber: $phoneNumber
      gender: $gender
      addressNo: $addressNo
      location: $location
      photoUrl: $photoUrl
      highestEducationLevel: $highestEducationLevel
      certificatesUrl: $certificatesUrl
      curriculumVitaeUrl: $curriculumVitaeUrl
      roleId: $roleId
      dateOfEmployment: $dateOfEmployment
      currentSalary: $currentSalary
    ) 
  }
`;
