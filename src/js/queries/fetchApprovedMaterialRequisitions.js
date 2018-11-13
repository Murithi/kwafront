import gql from "graphql-tag";

export default gql`
  query approvedRequisitions {
    approvedMaterialRequisitionsFeed {
      id
      materialType {
        id
        materialName
      }
      supplier {
        id
        supplierName
      }
      quantity
      approvalDate
      approxCost
      paymentMode
      cashPaymentsDetails {
        id
      }
      otherPaymentDetails {
        id
      }
      approvalDate
      requestedBy {
        id
        personnelDetails {
          id
          firstName
          lastName
        }
      }
      requestApprovedBy {
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
