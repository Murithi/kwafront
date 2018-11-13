import gql from 'graphql-tag';

export default gql`
    query getSectionDetails($id:ID!){
        section(id: $id){
            
            sectionName
            sectionDescription
            sectionProjectId
            sectionStartDate
            sectionCompletionDate
            sectionLocation
        }
    }
`;