import gql from 'graphql-tag';

export default gql`
    mutation createUserDetails (
        $userName: String!
        $loggedIn: String!
        $userRole: String!
    ){
        createUserDetails  (
            userName: $userName
            loggedIn: $loggedIn
            userRole: $userRole
        )@client {
            userName
            loggedIn
            userRole
        }
    }
`