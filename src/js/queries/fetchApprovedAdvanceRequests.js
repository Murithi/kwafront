import gql from 'graphql-tag'

export default gql`
	query advanceRequests {
		approvedAdvanceRequestFeed {
			id
			createdAt
			amountRequested
			otherDetails
			approvalStatus
			payee {
				id
				firstName
				lastName
			}
			requestedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			requestApprovedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
		}
	}
`
