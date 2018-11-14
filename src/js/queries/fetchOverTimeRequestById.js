import gql from 'graphql-tag'

export default gql`
	query overTimeRequest($overtimerequestId: ID!) {
		initiatedOverTimeRequest(overtimerequestId: $overtimerequestId) {
			id
			createdAt
			amountRequested
			otherDetails
			requestDate
			approvalDate
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
		}
	}
`
