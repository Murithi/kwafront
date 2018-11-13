import gql from "graphql-tag";

export default gql`
  mutation approveMaterials(
    $id: ID!
    $approvalDate: String!
    $approvalStatus: Boolean
  ) {
    approveMaterialRequisition(
      materialrequisitionId: $id
      approvalDate: $approvalDate
      approvalStatus: $approvalStatus
    )
  }
`;
