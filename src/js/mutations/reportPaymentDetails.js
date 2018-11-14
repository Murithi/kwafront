import gql from 'graphql-tag'

export default gql`
	mutation addPaymentDetails(
		$paymentIssue_id: ID!
		$amountCharged: Int!
		$recieptNumber: String!
		$amountReturned: Int!
		$requestId: ID!
		$dateReported: String!
	) {
		reportPayment(
			paymentIssue_id: $paymentIssue_id
			amountCharged: $amountCharged
			recieptNumber: $recieptNumber
			amountReturned: $amountReturned
			dateReported: $dateReported
			requestId: $requestId
		)
	}
`
