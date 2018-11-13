import gql from 'graphql-tag'

export default gql`
query issuesList($transactionType: String $startDate: String
								$endDate: String $projectId: ID){
	storageFeed(
    transactionType:$transactionType
    startDate:$startDate
    endDate:$endDate
    projectId:$projectId
  ){
    id
    itemTransacted{
      materialName
    }
    materialsRecievedFrom{
      id
      supplierName
    }
    materialsIssuedTo{
      id
      projectName
    }
    balanceBefore
    balanceAfter
    unitsTransacted
    transactionDate
    transactionType    
    deliveryNote
    transactedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    
    
    
    
    
  }
}`