import gql from 'graphql-tag';

export default gql`
    mutation updateUserDetails($index: String!, $value:String!){
        updateUserDetails(index: $index, value: $value) @client{
            userName
            loggedIn
            userRole
        }
    }
`