import React, { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Table, Grid, Message, Icon, Menu, Button, Segment, SegmentGroup } from 'semantic-ui-react';
import moment from 'moment';
import gql from 'graphql-tag';
import InitiatedRequisitionsQuery from './queries/fetchOverTimeRequests'
import getUserDetails from './queries/getUserDetails';

class OverTimeInitiated extends Component {
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
                <Message.Header>No Requisitions Found</Message.Header>
                <p>Add some new Requisitions to get started.</p>
                <Link to={'/advancerequests/new'} className="ui button primary">
                  Add New Requisition{' '}
                </Link>
              </Message.Content>
            </Message>
          );

          const timeoutMessage = (
            <Message icon negative>
                <Icon name="wait" />
                <Message.Content>
                    <Message.Header>{this.props.requisitionFeed.errorl}</Message.Header>
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
      
          if (this.props.requisitionFeed.initiatedOverTimeRequestFeed === undefined ||this.props.requisitionFeed.initiatedOverTimeRequestFeed === 0) {
            return <div>{emptyMessage}</div>;
          }
        


        return (
            <Fragment>
            <Header as="h4" color="green" textAlign="center">
                Initiated Overtime Requests List
            </Header>
            { (() => {
                  if (this.props.userDetails.me.role === 'DIRECTOR') {
                    return (<SegmentGroup horizontal>
                    <Segment>
                    </Segment>
                    <Segment>
                      <Button 
                      onClick={()=>this._approvall()}
                      fluid positive> Approve All </Button>
                    </Segment>
                  </SegmentGroup>)
              
              }}
              )()
              }
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Person Requesting</Table.HeaderCell>
                    <Table.HeaderCell>Amount Requested</Table.HeaderCell>
                    <Table.HeaderCell>Requested By</Table.HeaderCell>
                    <Table.HeaderCell>Request Date</Table.HeaderCell>
                    <Table.HeaderCell>Other Details </Table.HeaderCell>
                    <Table.HeaderCell> Approval Status</Table.HeaderCell>    
                    
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                
                {
                    this.props.requisitionFeed.initiatedOverTimeRequestFeed.map(request => (
                        <Table.Row>
                        <Table.Cell>{request.payee.firstName} {request.payee.lastName}</Table.Cell>
                        <Table.Cell>{request.amountRequested}</Table.Cell>
                        <Table.Cell>{request.requestedBy.personnelDetails.firstName} {request.requestedBy.personnelDetails.lastName}</Table.Cell>
                        <Table.Cell>{moment(request.requestDate).format('MMM Do YYYY')}</Table.Cell>
                        <Table.Cell>{request.otherDetails}</Table.Cell>                         
                       
                        <Table.Cell>
                  {(() => {
                    if (request.approvalStatus) {
                      return <Icon name='checkmark ' color='green'/>
                      
                    } else {
                      if (this.props.userDetails.me.role === 'DIRECTOR') {
                        return (
                          <Link to={`/overtimerequests/approve/${request.id}`}>
                            Approve
                          <Icon name="angle double right" color='green'/>
                          </Link>
                        )
                      } else {
                        return <Icon name='remove ' color='green' />
                      }
                    }
                  }
                  )()
                  }
                   
                            </Table.Cell>
                            </Table.Row>
                    ))
                }
                </Table.Body>
                <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="6">
            <Link to={'/overtimerequests/new'}>
              <Icon name="add circle green " size="huge" />
            </Link>

            <Menu floated="right" pagination>
              <Menu.Item as="a" icon>
                <Icon name="chevron left" color='green' />
              </Menu.Item>
              <Menu.Item as="a">1</Menu.Item>
              <Menu.Item as="a">2</Menu.Item>
              <Menu.Item as="a">3</Menu.Item>
              <Menu.Item as="a">4</Menu.Item>
              <Menu.Item as="a" icon>
                <Icon name="chevron right"  color='green'/>
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
            </Table>
            </Fragment>
          );
    }

    _approvall = async()=>{
        const approvalDate=moment().format()
        this.props.approveAll({
          variables:{approvalDate},
          refetchQueries:[
            { query: InitiatedRequisitionsQuery }
          ]
            
          
        })
        this.props.history.push('/overtimerequests/initiated')
      }
}

const APPROVEALL = gql`
mutation approveAll($approvalDate:String!){
    approveAllOverTimeRequest(approvalDate: $approvalDate)
}
`

export default compose(
    graphql(APPROVEALL, {name: 'approveAll'}),
    graphql(InitiatedRequisitionsQuery, 
        { 
            name: 'requisitionFeed' 
        }
    ),
    graphql(getUserDetails, 
        {
            name:'userDetails'
        }
    ),
) (OverTimeInitiated);