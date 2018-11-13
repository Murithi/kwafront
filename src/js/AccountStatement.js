import React, { Component } from 'react';
import {Message, Table, Tab, Icon, Grid, Header, Segment, Divider} from 'semantic-ui-react'
import { graphql } from 'react-apollo';
import getAccountDetails from './queries/fetchAccountDetails'
import  moment from 'moment';

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
        <Message.Header>No Account with that ID Found</Message.Header>
      </Message.Content>
    </Message>
  );
  
  const timeoutMessage = (
    <Message icon negative>
      <Icon name="wait" />
      <Message.Content>
        <Message.Header>Error Processing Request</Message.Header>
        Is the backend server running?
      </Message.Content>
    </Message>
  );

  const panes = [
    { menuItem: 'Account Statement', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  
   
  ]
  
  const TabExampleVerticalTabularRight = () => (
    <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
  )

class AccountStatement extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      if (this.props.accountDetail.loading) {
        return <div>{loadingMessage}</div>            
    }
    if (this.props.accountDetail.error) {
        return <div>{timeoutMessage}</div>
    }
      const {account}=this.props.accountDetail
      const {cashTransactions}= this.props.accountDetail.account
      if (!account ) {
        return <div>{emptyMessage}</div>
     }
      
      const reversedCashTrans = cashTransactions.slice(0).reverse()
      console.log(reversedCashTrans)
        return (
              <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Account Details
                    </Header>
                    <Segment.Group horizontal>
                            <Segment> 
                            <Divider />
                            <Table basic='very' celled >
                                    <Table.Body>
                                    <Table.Row>
                                        <Table.Cell><b>ACCOUNT NAME</b></Table.Cell>
                                        <Table.Cell>
                                          {account.name}
                                          </Table.Cell>
                                        </Table.Row>  
                                        <Table.Row>
                                        <Table.Cell><b>ACCOUNT NUMBER</b></Table.Cell>
                                        <Table.Cell>
                                         {account.accountNumber}
                                         </Table.Cell>
                                        </Table.Row> 
                                        <Table.Row>
                                        <Table.Cell><b>ACCOUNT BALANCE</b></Table.Cell>
                                        <Table.Cell>
                                           {account.balance[0].balance}
                                    </Table.Cell>
                                   </Table.Row>
                                       
                                       
                                </Table.Body>
                                </Table>    
                       
                            </Segment>                        
                        </Segment.Group>
                        <Divider />
                        <Segment>
                        <Header as="h4" color="green" textAlign="center">
                        Account Details
                        </Header>
                        <Table compact='very' celled>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Date of Issue</Table.HeaderCell>
                              <Table.HeaderCell>Prev Balance</Table.HeaderCell>
                              <Table.HeaderCell>Amt Recieved</Table.HeaderCell>
                              <Table.HeaderCell>Amt Issued</Table.HeaderCell>
                              <Table.HeaderCell>Amt Charged</Table.HeaderCell>
                              <Table.HeaderCell>Amt Returned</Table.HeaderCell>
                              <Table.HeaderCell>Balance</Table.HeaderCell>
                              <Table.HeaderCell>Date Reported</Table.HeaderCell>
                             
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            { 
                              reversedCashTrans.map(request=>(
                                <Table.Row key={request.id}>
                                  <Table.Cell>{moment(request.dateIssued).calendar()}</Table.Cell>
                                  <Table.Cell>{request.amountRecieved}</Table.Cell>
                                  <Table.Cell>{request.cashBalanceBefore}</Table.Cell>
                                  <Table.Cell>{request.amountIssued}</Table.Cell>
                                  <Table.Cell>{request.amountCharged}</Table.Cell>
                                  <Table.Cell>{request.amountReturned}</Table.Cell>
                                  <Table.Cell>{request.cashBalanceAfter}</Table.Cell>
                                  <Table.Cell>{request.dateReported}</Table.Cell>
                                </Table.Row>
                              ))
                            }
                            </Table.Body>
                          </Table>
                        </Segment>
                       <TabExampleVerticalTabularRight/>
                </Grid.Column>
            </Grid>
         );
    }
}
 
export default graphql(getAccountDetails, {
    name: 'accountDetail',
    options: props=>({
        variables:{
          id: props.match.params.id
        }
    })
  }
)(AccountStatement);