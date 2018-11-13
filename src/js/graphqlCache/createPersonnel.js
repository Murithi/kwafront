import gql from 'graphql-tag';

export default gql`
    mutation createPersonnel(   
        $firstName: String!
        $lastName:String!
        $personnelID:String!
        $photoUrl:String!
        $assignedAccount:String!
        ){
        createPersonnel(
            firstName: $firstName
            lastName: $lastName
            personnelID:$personnelID
            photoUrl:$photoUrl
            assignedAccount:$assignedAccount
        ){
            firstName
            lastName
            personnelID
            photoUrl
            assignedAccount
        }
        }
`;