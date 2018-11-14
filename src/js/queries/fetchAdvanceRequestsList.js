import gql from 'graphql-tag'

export default gql`
	query advanceRequests {
		advanceRequestFeed {
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
			cashIssueDetails {
				dateIssued
				amountIssued
				amountCharged
				amountReturned
			}
		}
	}
`
