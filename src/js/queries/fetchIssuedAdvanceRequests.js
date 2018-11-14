import gql from 'graphql-tag'

export default gql`
	query advanceRequests {
		issuedAdvanceRequestFeed {
			id
			createdAt
			amountRequested
			otherDetails
			approvalStatus
			requestDate
			approvalDate
			cashIssueDetails {
				dateIssued
			}
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
