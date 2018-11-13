import gql from 'graphql-tag';

export default gql`
    mutation updatePersonnel($index: String!, $value:String!){
        updatePersonnel(index: $index, value: $value) @client{
            firstName
            lastName
            personnelID
            photoUrl
            assignedAccount
        }
    }
`