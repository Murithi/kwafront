import gql from 'graphql-tag'

export default gql`
	query getMiscel {
		initiatedMiscellaneousRequisitionFeed {
			id
			amountRequested
			paymentMode
			requestDate
			approvalDate
			approvalStatus
			requestedBy {
				personnelDetails {
					firstName
					lastName
				}
			}
			cashPaymentsDetails {
				id
				amountIssued
				recieptNumber
				createdAt
			}
			otherPaymentDetails {
				id
				amountPaid
				createdAt
			}
			otherDetails
		}
	}
`
