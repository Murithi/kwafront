import gql from 'graphql-tag'

export default gql`
query getAccount($id:ID!){
  account(id:$id){
    id
    name
    accountName
    location
   
    description
    balance{
      balance
    }
    cashTransactions{
        id
        dateIssued
        cashBalanceBefore
        amountIssued
        amountRecieved
        amountCharged
        amountReturned
        cashBalanceAfter
        dateReported
      }
 
  }
}
`