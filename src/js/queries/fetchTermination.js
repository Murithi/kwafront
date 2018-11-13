import gql from 'graphql-tag';

export default gql`
query getTerminationFeed{
  terminationFeed{
    id
    terminationBy
    reasonsForTermination
    subjectOfTermination {
      
      idNumber
      
    }
  }
}
`;