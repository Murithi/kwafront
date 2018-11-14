import gql from 'graphql-tag'
export default gql`
	mutation issuePayment(
		$accountchargedId: ID!
		$cashbalId: ID!
		$balbefore: Int!
		$otherDetails: String
		$paymentType: String!
		$projectId: ID!
		$amountIssued: Int!
		$dateIssued: String!
		$requestId: ID!
	) {
		addPaymentIssue(
			accountchargedId: $accountchargedId
			cashbalId: $cashbalId
			balbefore: $balbefore
			otherDetails: $otherDetails
			paymentType: $paymentType
			projectId: $projectId
			requestId: $requestId
			dateIssued: $dateIssued
			amountIssued: $amountIssued
		)
	}
`
