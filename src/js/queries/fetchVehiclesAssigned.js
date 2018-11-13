import gql from 'graphql-tag';

export default gql`
query vehicleAssigned{  
  vehicleAssignmentFeed{
    id
    assignee{
      firstName
      lastName
    }
    dateOfAssignment
    motorVehicle{
      registrationNumber
    }
    dateOfAssignment
    dateRelieved
  }
}
`;
