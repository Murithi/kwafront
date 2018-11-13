import gql from "graphql-tag";
export default gql`
  mutation approveServiceRequisition(
    $requestserviceId: ID!
    $approvalDate: String!
    $approvalStatus: Boolean
  ) {
    approveRequestService(
      requestserviceId: $requestserviceId
      approvalDate: $approvalDate
      approvalStatus: $approvalStatus
    )
  }
`;
