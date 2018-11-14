import gql from 'graphql-tag'
export default gql`
	query getVehicleDetailsQuery($id: ID!, $startDate: String, $endDate: String) {
		getVehicle(id: $id) {
			id
			registrationNumber
			logBookNumber
			model
			fuelType
			manufactureDate
			insuranceValuation
			insuranceRenewalDate
			owner {
				id
				name
			}
			service(startDate: $startDate, endDate: $endDate) {
				id
				requestDate
				approvalDate
				otherDetails
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				requestApprovedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateIssued
				}
			}
			repairs(startDate: $startDate, endDate: $endDate) {
				id
				requestDate
				approvalDate
				otherDetails
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				requestApprovedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateIssued
				}
			}
			inspection(startDate: $startDate, endDate: $endDate) {
				id
				requestDate
				approvalDate
				otherDetails
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				requestApprovedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateIssued
				}
			}
			fuelrequests(startDate: $startDate, endDate: $endDate) {
				id
				requestDate
				approvalDate
				otherDetails
				requestedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				requestApprovedBy {
					id
					personnelDetails {
						firstName
						lastName
					}
				}
				paymentsDetails {
					amountCharged
					dateIssued
				}
			}
		}
	}
`
