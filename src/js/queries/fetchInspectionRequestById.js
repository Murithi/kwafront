import gql from "graphql-tag";

export default gql`
  query getVehicleInspection($id: ID!) {
    initiatedVehicleInspection(vehicleinspectionId: $id) {
      id
      vehicleToBeInspected {
        id
        registrationNumber
      }
      approxCostOfInspection
      requestDate
      approvalDate
      requestedBy {
        id
        personnelDetails {
          id
          firstName
          lastName
        }
      }
      createdAt
    }
  }
`;
