import gql from 'graphql-tag';

export default gql`
mutation createProject(
    $projectName: String!,
    $projectDescription: String!,
    $projectValuation: Int!,
    $projectStartDate: String!,
    $projectCompletionDate: String!,
    $projectLocation: String!

    ){
        addProject(
            projectName:$projectName,
            projectDescription:$projectDescription,
            projectValuation:$projectValuation,
            projectStartDate:$projectStartDate,
            projectCompletionDate:$projectCompletionDate,
            projectLocation:$projectLocation
        )
    }
`;