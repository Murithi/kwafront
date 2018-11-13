import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { Link, Route } from 'react-router-dom';
import { Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import CashBalFeedQuery from './queries/fetchCashBalFeed'

class CashBalancesList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log(this.props.accountFeed.accountFeed)
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
                <Message.Header>No Balances Found</Message.Header>
                <p>Make a new balances to get started.</p>
                <Link to={'/cashbalances/new'} className="ui button primary">
                  Add New Balance{' '}
                </Link>
              </Message.Content>
            </Message>
          );
      
          const timeoutMessage = (
            <Message icon negative>
              <Icon name="wait" />
              <Message.Content>
                <Message.Header>{this.props.accountFeed.errorl}</Message.Header>
                Is the backend server running?
              </Message.Content>
            </Message>
          );

          if (this.props.accountFeed && this.props.accountFeed.loading) {
            return <div>{loadingMessage}</div>;
          }
      
          if (this.props.accountFeed && this.props.accountFeed.error) {
            return <div>{timeoutMessage}</div>;
          }
      
          if (this.props.accountFeed.accountFeed === undefined ||this.props.accountFeed.accountFeed=== 0) {
            return <div>{emptyMessage}</div>;
          }
        return ( 
                        <Table celled selectable>
          <Table.Header>
            <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Account Name</Table.HeaderCell>   
                      <Table.HeaderCell>Location</Table.HeaderCell>
                      <Table.HeaderCell>Balance</Table.HeaderCell>        
                      <Table.HeaderCell> Details </Table.HeaderCell>
                   
              
            </Table.Row>
                      </Table.Header>
                      <Table.Body>
                      {this.props.accountFeed.accountFeed.map(request => (
                        <Table.Row>
                        <Table.Cell>{request.name}</Table.Cell>
                        <Table.Cell>{request.accountName}</Table.Cell>
                        <Table.Cell>{request.location}</Table.Cell>
                        <Table.Cell>{request.balance.balance}</Table.Cell>
                        <Table.Cell>  <Link to={`/cash/statement/${request.id}`}>View Details...</Link> </Table.Cell>
                            </Table.Row>
                      ))
                      }
                          </Table.Body>
                          </Table>
         );
    }
}
 
export default
graphql(CashBalFeedQuery,
   {
        name:'accountFeed'
    }
) (CashBalancesList);
