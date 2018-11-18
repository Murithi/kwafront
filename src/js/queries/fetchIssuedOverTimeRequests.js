import gql from 'graphql-tag'

export default gql`
	query overTimeRequests {
		issuedOverTimeRequestFeed {
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
