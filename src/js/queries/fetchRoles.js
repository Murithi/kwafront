import gql from 'graphql-tag';

export default gql`
query RoleFeed{
    personnelRoleFeed{
        id
        roleName
        minimumSalary
        maximumSalary
    }
}
`;