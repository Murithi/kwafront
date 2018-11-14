import gql from 'graphql-tag'

export default gql`
	query getSalariesRecieved($id: ID!, $startDate: String, $endDate: String) {
		personnel(id: $id) {
			advancesRecieved(startDate: $startDate, endDate: $endDate) {
				id
				issuedCash
				otherDetails
				approvalDate
				requestDate
				approvalStatus
				payee {
					id
					firstName
					lastName
				}
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				issuedCash
				cashIssueDetails {
					amountIssued
					dateIssued
				}
			}
		}
	}
`
