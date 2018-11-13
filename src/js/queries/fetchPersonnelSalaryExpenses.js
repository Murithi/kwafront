import gql from 'graphql-tag';

export default gql`
  query personnelExpensesSum($startDate: String!, $endDate: String!) {
    SALARYREQUESTS: paymentIssuedSumByType(paymentType: "SALARYREQUESTS", startDate: $startDate, endDate: $endDate)

    SALARYTOTALS: paymentIssueSumByTypeGrouped(
      paymentType: "SALARYREQUESTS"
      startDate: $startDate
      endDate: $endDate
    ) {
      month
      amount
    }
    ADVANCEREQUESTS: paymentIssuedSumByType(paymentType: "ADVANCEREQUESTS", startDate: $startDate, endDate: $endDate)
    ADVANCETOTALS: paymentIssueSumByTypeGrouped(
      paymentType: "ADVANCEREQUESTS"
      startDate: $startDate
      endDate: $endDate
    ) {
      month
      amount
    }
    OVERTIMEREQUESTS: paymentIssuedSumByType(paymentType: "OVERTIMEREQUESTS", startDate: $startDate, endDate: $endDate)
    OVERTIMETOTALS: paymentIssueSumByTypeGrouped(
      paymentType: "OVERTIMEREQUESTS"
      startDate: $startDate
      endDate: $endDate
    ) {
      month
      amount
    }
  }
`;
