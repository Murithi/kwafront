import gql from 'graphql-tag'

export default gql`
	query GetVehicle($id: ID!) {
		getVehicle(id: $id) {
			id
			registrationNumber
			assigned
			assignee {
				id
				firstName
				lastName
			}
			dateAssigned
			owner {
				id
				name
			}
			service {
				id
				requestDate
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateReported
				}
			}
			repairs {
				id
				requestDate
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateReported
				}
			}
			inspection {
				id
				requestDate
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateReported
				}
			}
			fuelrequests {
				id
				requestDate
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateReported
				}
			}
		}
	}
`
