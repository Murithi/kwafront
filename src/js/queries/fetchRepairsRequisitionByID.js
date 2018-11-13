import gql from 'graphql-tag';

export default gql`
query getRepairsRequisition($id:ID!){
  initiatedRepairsRequisition(repairrequisitionId:$id){
    id
    vehicleToBeRepaired{
      registrationNumber
    }
    requestDate
    approvalDate
    approxCostOfRepair
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    otherDetails
    approvalStatus
  }
}
`;