import gql from 'graphql-tag';

export default gql`
mutation createRole(
        $roleName:String!
    $minimumSalary:String!
    $maximumSalary:String!

    ){
        addRole(
            roleName:$roleName
            minimumSalary:$minimumSalary
            maximumSalary:$maximumSalary
        )
    }
`;