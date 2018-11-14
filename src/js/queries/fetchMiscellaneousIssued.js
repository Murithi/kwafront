import gql from 'graphql-tag'

export default gql`
	query getMiscel {
		approvedMiscellaneousRequisitionFeed {
			id
			amountRequested
			paymentMode
			misceltype
			requestDate
			approvalDate
			approvalStatus
			issuedCash
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
