import gql from 'graphql-tag'

export default gql`
query getMaterialDetail($id:ID!){
materialsCosting(id:$id){
   id
    materialDescription
    materialName
    costPerUnit
    standardUnit
    balance{
      id
      balance
      
    }
  transactions{
    id
    transactionType
    balanceBefore
    balanceAfter
    unitsTransacted
    materialsIssuedTo{
      id
      projectName
      
    }
    materialsRecievedFrom{
      supplierName
    }
    transactionDate
    deliveryNote
    
  }
  
  
}
  
}
`;