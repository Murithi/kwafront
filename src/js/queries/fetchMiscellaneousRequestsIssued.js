import gql from 'graphql-tag'

export default gql`
	query getMiscel {
		issuedMiscellaneousRequisitionsFeed {
			id
			amountRequested
			paymentMode
			misceltype
			requestDate
			approvalDate
			issuedCash
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
				amountCharged
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
