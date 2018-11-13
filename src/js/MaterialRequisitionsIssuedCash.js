import React, { Component, Fragment } from 'react';
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import moment from 'moment';
import {graphql, compose} from 'react-apollo'
import {Link} from 'react-router-dom'
import getApprovedRequisitions from './queries/fetchMaterialRequisitionsIssuedCash'
import getUserDetails from './queries/getUserDetails'

class MaterialRequisitionsIssuedCash extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      console.log(this.props.requisitionFeed)
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
                <p>Add some new requisitions to get started.</p>
               
              </Message.Content>
            </Message>
          );
      
        const timeoutMessage = (
            <Message icon negative>
                <Icon name="wait" />
                <Message.Content>
                    <Message.Header>{this.props.requisitionFeed.error}</Message.Header>
                    Is the backend server running?
              </Message.Content>
            </Message>
        );
        if (this.props.requisitionFeed && this.props.requisitionFeed.loading) {
            return <div>{loadingMessage}</div>;
          }
      
          if (this.props.requisitionFeed && this.props.requisitionFeed.error) {
            return <div>{timeoutMessage}</div>;
          }
      
          if (this.props.requisitionFeed.issuedMaterialRequisitionsFeed === undefined ||this.props.requisitionFeed.issuedMaterialRequisitionsFeed === 0) {
            return <div>{emptyMessage}</div>;
          }
          
        return ( 
            <Fragment>
            <Header as="h4" color="green" textAlign="center">
                    Material Requisitions Issued Cash
                </Header>
                <Table celled selectable>
                    <Table.Header>
                <Table.Row>
                  
                        <Table.HeaderCell>Material Requested</Table.HeaderCell>
                        <Table.HeaderCell>Requested By</Table.HeaderCell>
                        <Table.HeaderCell>Other Details </Table.HeaderCell>
                        <Table.HeaderCell> Amount Issued</Table.HeaderCell>
                        <Table.HeaderCell>Date Issued</Table.HeaderCell>                      
                        <Table.HeaderCell> Process</Table.HeaderCell>    
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.requisitionFeed.issuedMaterialRequisitionsFeed.map(request => {
                  if (request.cashPaymentsDetails !== null) {
                    return (
                            
                      <Table.Row>
                        <Table.Cell>{request.materialType.materialName}</Table.Cell>
                        <Table.Cell>{request.requestedBy.personnelDetails.firstName}  {request.requestedBy.personnelDetails.lastName}</Table.Cell>
                        <Table.Cell>{request.otherDetails}</Table.Cell>
                        <Table.Cell>{request.cashPaymentsDetails.amountIssued}</Table.Cell>
                        <Table.Cell>{moment(request.requestDate).format('MMM Do YYYY')}</Table.Cell>
                                            
                                
                        <Table.Cell>
                          {(() => {
                        
                            if (this.props.userDetails.me.role === 'ACCOUNTANT') {
                              return (
                                <Link to={`/materialrequisitions/report/${request.id}`}>
                                  Report Cash Usage
                              <Icon name="angle double right" />
                                </Link>
                              )
                            } else {
                              return <Icon name='checkmark ' />
                            }
                        
                          }
                          )()
                          }
                       
                        </Table.Cell>
                    
                      </Table.Row>
                    )
                  }
                })
                }
                        
                        </Table.Body>
                    </Table>
                </Fragment>
         )
    }
}
 
export default compose(
    graphql(getApprovedRequisitions, { name: 'requisitionFeed' }),
    graphql(getUserDetails, {name: 'userDetails' }),
  ) (MaterialRequisitionsIssuedCash);