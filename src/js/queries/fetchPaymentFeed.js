import gql from 'graphql-tag';
export default gql`
query PaymentFeed{
  paymentIssueFeed{
    
    id
    paymentType
    cashBalanceBefore
    cashBalanceAfter
    amountIssued
    issuedBy{ personnelDetails{ firstName lastName}}
    dateIssued
    cashReported
    amountCharged
    amountReturned
    dateReported
    recieptNumber
    
    
  }
}
`
