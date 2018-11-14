import gql from 'graphql-tag'

export default gql`
	query overTimeRequests {
		approvedOverTimeRequestFeed {
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
