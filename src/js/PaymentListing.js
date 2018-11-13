import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Table,  Message, Icon, Menu } from 'semantic-ui-react';
import moment from 'moment';


import PaymentFeed from './queries/fetchPaymentFeed';

class PaymentListing extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const loadingMessage = (
            <Message icon info>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
              </Message.Content>
            </Message>
          );
      
          const emptyMessage = (
            <Message icon info>
              <Icon name="warning circle" />
              <Message.Content>
                <Message.Header>No Payments Found</Message.Header>
                <p>Make a new requisitoin to get started.</p>

              </Message.Content>
            </Message>
          );
      
          const timeoutMessage = (
            <Message icon negative>
              <Icon name="wait" />
              <Message.Content>
                <Message.Header>{this.props.paymentFeed.error}</Message.Header>
                Is the backend server running?
              </Message.Content>
            </Message>
          );

          if (this.props.paymentFeed && this.props.paymentFeed.loading) {
            return <div>{loadingMessage}</div>;
          }
      
          if (this.props.paymentFeed && this.props.paymentFeed.error) {
            return <div>{timeoutMessage}</div>;
          }
      
          if (this.props.paymentFeed.paymentIssueFeed === undefined ||this.props.paymentFeed.paymentIssueFeed=== 0) {
            return <div>{emptyMessage}</div>;
          }
        return ( 
                        <Table celled selectable>
          <Table.Header>
            <Table.Row>
                      <Table.HeaderCell>Payment Type</Table.HeaderCell>
                      <Table.HeaderCell>Cash Balance Before</Table.HeaderCell>         
                      <Table.HeaderCell>Cash Balance After</Table.HeaderCell>
                      <Table.HeaderCell>Amount Issued</Table.HeaderCell>        
                      <Table.HeaderCell> Issued By </Table.HeaderCell>
                      <Table.HeaderCell> Date Issued </Table.HeaderCell>
                      <Table.HeaderCell> Cash Reported </Table.HeaderCell>
                      <Table.HeaderCell> Amount Charged </Table.HeaderCell>
                      <Table.HeaderCell> Amount Returned </Table.HeaderCell>
                      <Table.HeaderCell> Reciept Number </Table.HeaderCell>
                      <Table.HeaderCell> Date Reported </Table.HeaderCell>
            </Table.Row>
                </Table.Header>
            <Table.Body>
            {this.props.paymentFeed.paymentIssueFeed.map(request => (
                        <Table.Row>
    
                            <Table.Cell>{request.paymentType}</Table.Cell>
                            <Table.Cell>{request.cashBalanceBefore}</Table.Cell>                           
                            <Table.Cell>{request.cashBalanceAfter}</Table.Cell>
                            <Table.Cell>{request.amountIssued}</Table.Cell>
                            <Table.Cell>
                                {request.issuedBy.personnelDetails.firstName} {request.issuedBy.personnelDetails.lastName}
                            </Table.Cell>
                            <Table.Cell>
                            {moment(request.dateIssued).format('MMM Do YYYY')} 
                            </Table.Cell>
                            <Table.Cell>{request.cashReported}</Table.Cell>
                            <Table.Cell>{request.amountCharged}</Table.Cell>
                            <Table.Cell>{request.amountReturned}</Table.Cell>
                            <Table.Cell>{request.recieptNumber}</Table.Cell>
                            <Table.Cell>
                            {moment(request.dateReported).format('MMM Do YYYY')} 
                            </Table.Cell>
                            
                        </Table.Row>    
                    ))} 
            </Table.Body>
            </Table>
         );
    }
}
 
export default graphql(PaymentFeed, {name:"paymentFeed"})(PaymentListing);