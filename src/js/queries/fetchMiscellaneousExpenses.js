import gql from 'graphql-tag'

export default gql`
query miscellaneousSum($startDate:String!, $endDate:String!){

  MISCELLANEOUSREQUESTS: paymentIssuedSumByType(paymentType:"MISCELLANEOUSREQUESTS",
  startDate:$startDate,endDate:$endDate),
  
  MISCELLANEOUSTOTALS:  paymentIssueSumByTypeGrouped(paymentType:"MISCELLANEOUSREQUESTS",
  startDate:$startDate,endDate:$endDate){
    month,
    amount
  },

}
`