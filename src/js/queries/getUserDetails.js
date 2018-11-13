import gql from 'graphql-tag'

export default gql`
query getUserRole{
    me{
        id
        role
        }
}
`;
