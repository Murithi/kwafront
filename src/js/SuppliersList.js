import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { Link, Route } from 'react-router-dom';
import { Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';

import getSuppliers from './queries/fetchSuppliers';
class SuppliersList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log(this.props.SuppliersFeed.suppliersFeed);
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
                <Message.Header>No Requisitions Found</Message.Header>
                <p>Make a new requisitoin to get started.</p>
                <Link to={'/suppliers/new'} className="ui button primary">
                  Add New Requisition{' '}
                </Link>
              </Message.Content>
            </Message>
          );
      
          const timeoutMessage = (
            <Message icon negative>
              <Icon name="wait" />
              <Message.Content>
                <Message.Header>{this.props.SuppliersFeed.errorl}</Message.Header>
                Is the backend server running?
              </Message.Content>
            </Message>
          );
          if (this.props.SuppliersFeed && this.props.SuppliersFeed.loading) {
            return <div>{loadingMessage}</div>;
          }
      
          if (this.props.SuppliersFeed && this.props.SuppliersFeed.error) {
            return <div>{timeoutMessage}</div>;
          }
      
          if (this.props.SuppliersFeed.suppliersFeed === undefined ||this.props.SuppliersFeed.suppliersFeed=== 0) {
            return <div>{emptyMessage}</div>;
          }
        return (
            <Table celled selectable>
            <Table.Header>
              <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Contacts</Table.HeaderCell>         
                        <Table.HeaderCell>Material</Table.HeaderCell>
                        <Table.HeaderCell>Standard Cost</Table.HeaderCell>        
                        <Table.HeaderCell> Negotiated Rate </Table.HeaderCell>
                        <Table.HeaderCell> Other Details </Table.HeaderCell>
                        <Table.HeaderCell> Edit </Table.HeaderCell>
              </Table.Row>
                  </Table.Header>
                <Table.Body> 
                    {this.props.SuppliersFeed.suppliersFeed.map(request => (
                        <Table.Row>
                        <Table.Cell>{request.supplierName}</Table.Cell>
                            <Table.Cell>{request.supplierPhone}</Table.Cell>
                            <Table.Cell>{request.material.materialName}</Table.Cell>
                            <Table.Cell>{request.material.costPerUnit}</Table.Cell>
                            <Table.Cell>{request.negotiatedRate}</Table.Cell>
                            <Table.Cell>{request.otherDetails}</Table.Cell>
                            <Table.Cell>
                            <Link to={`/suppliers/edit/${request.id}`}>
                                <Icon name="edit circle green " />
                            </Link>
                            </Table.Cell>
                        </Table.Row>    
                    ))}     
                </Table.Body>
                <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Link to={'/suppliers/new'}>
                  <Icon name="add circle green right" size="huge" />
                </Link>

                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
              </Table>
                      )
  }
}
 
export default graphql(getSuppliers, {name:'SuppliersFeed'})(SuppliersList);