import gql from 'graphql-tag';

export default gql`
    query ProjectFeed{
        projectFeed{
            id
            projectName
            projectDescription
            projectValuation
            projectStartDate
            projectCompletionDate
            projectLocation
            sections{
            id
            sectionName
          }
        }
    }
`