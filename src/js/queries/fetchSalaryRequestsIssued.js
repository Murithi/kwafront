import gql from 'graphql-tag'

export default gql`
	query salaryRequests {
		issuedSalaryRequestFeed {
			id
			createdAt
			amountRequested
			otherDetails
			requestDate
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
