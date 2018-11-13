import gql from "graphql-tag";
export default gql`
  mutation approveRepairsRequisition(
    $approvalStatus: Boolean
    $repairrequisitionId: ID!
    $approvalDate: String!
  ) {
    approveRepairsRequistion(
      repairrequisitionId: $repairrequisitionId
      approvalDate: $approvalDate
      approvalStatus: $approvalStatus
    )
  }
`;
