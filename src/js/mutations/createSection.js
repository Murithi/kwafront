import gql from 'graphql-tag';

export default gql`
mutation createSection(
    $sectionName:String!,
    $sectionDescription:String!,
    $sectionProjectId:String!,
    $sectionStartDate:DateTime,
    $sectionEndDate:DateTime,
    $sectionlocation:String!
){
    addSection(
        sectionName:$sectionName
        sectionDescription:$sectionDescription
        sectionProjectId:$sectionProjectId
        sectionStartDate:$sectionStartDate
        sectionCompletionDate:$sectionCompletionDate
        sectionLocation:$sectionLocation
    ){
        id 
        sectionName
    }
}
`;