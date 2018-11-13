import gql from 'graphql-tag';

export default gql`
query getProjectDetails($id: ID!){
    project(id: $id){
        projectName
        projectDescription
        projectValuation
        projectStartDate
        projectCompletionDate
        projectLocation
    }
}
`