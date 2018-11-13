import React, { Component, Fragment } from 'react';
import { Form, Table, Segment, Tab, Grid, Header, Message, Icon, List, Menu, Divider} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from 'react-datepicker'
import { graphql } from 'react-apollo';
import VehicleDetailQuery from './queries/fetchVehicleDetails';

// ` const panes = [
//   { menuItem: 'Fuel Requests', render: () => <VehicleFuelRequisitions id={this.props.match.params.id} startDate={ moment(this.state.startDate).format('MMM DD YYYY')} endDate={moment(this.state.endDate).format('MMM DD YYYY')}/>},
//   { menuItem: 'Repairs Requests', render: () => <VehicleRepairsRequisitions id={this.props.match.params.id} startDate={ moment(this.state.startDate).format('MMM DD YYYY')} endDate={moment(this.state.endDate).format('MMM DD YYYY')}/>},
//   { menuItem: 'Service Requests', render: () =>  <VehicleServiceRequisitions id={this.props.match.params.id} startDate={ moment(this.state.startDate).format('MMM DD YYYY')} endDate={moment(this.state.endDate).format('MMM DD YYYY')}/>},
//   { menuItem: 'Inspection Requests', render: () => <VehicleInspectionRequisitoins id={this.props.match.params.id} startDate={ moment(this.state.startDate).format('MMM DD YYYY')} endDate={moment(this.state.endDate).format('MMM DD YYYY')}/>},
// ]
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
      <Message.Header>No Vehicle Owners with that ID Found</Message.Header>
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

class VehicleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
}
handleDateFromChange = date=>{
  this.setState({startDate:date});
  
}

handleDateToChange = date=>{
  this.setState({endDate:date});
  this.getDataAfresh(date)
}
getDataAfresh = (date)=>{
  console.log('refetching ...')
  const startDate=moment(this.state.startDate).format('MMM Do YYYY')
  const endDate = moment(date).format('MMM Do YYYY')
  this.props.vehicleDetail.refetch({
    variables: {
      id: this.props.match.params.id,
      startDate:startDate,
      endDate:endDate
    }
  }
  )
}
render(){
 
  if (this.props.vehicleDetail.loading) {
    return <div>{loadingMessage}</div>            
  }
  if (this.props.vehicleDetail.loading) {
      return <div>{timeoutMessage}</div>
  }
  const { getVehicle } = this.props.vehicleDetail

  if (_.isEmpty(getVehicle)){
      return <div>{emptyMessage}</div>
  }
  console.log(getVehicle)
  const panes = [
    { menuItem: 'Fuel Requests', render: () => {

    return (
      <Tab.Pane attached={false}>
        <Header as="h4" color="green" textAlign="center">
                      Fuel Requisitions
                  </Header>
                
                    <Table celled selectable>
                      <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Amount Charged</Table.HeaderCell>
                        <Table.HeaderCell>Other Details</Table.HeaderCell>
                        <Table.HeaderCell> Requested By</Table.HeaderCell>
                        <Table.HeaderCell>Approved By</Table.HeaderCell>
                        <Table.HeaderCell>Request Date </Table.HeaderCell>
                        <Table.HeaderCell> Approval Date</Table.HeaderCell>
                        <Table.HeaderCell> Date Issued</Table.HeaderCell>                        
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                      getVehicle.fuelrequests.map(request => {  
                        if (request.paymentsDetails !== null ) {                     
                              return ( 
                                <Table.Row>
                                  <Table.Cell>{request.paymentsDetails.amountCharged}</Table.Cell>
                                  <Table.Cell>{request.otherDetails}</Table.Cell>
                                  <Table.Cell>{request.requestedBy.personnelDetails.firstName} {request.requestedBy.personnelDetails.lastName}</Table.Cell>
                                  <Table.Cell>{request.requestApprovedBy.personnelDetails.firstName} {request.requestApprovedBy.personnelDetails.lastName}</Table.Cell>
                                  <Table.Cell>{moment(request.requestDate).format('MMM DD YYYY')}</Table.Cell>
                                  <Table.Cell>{moment(request.approvalDate).format('MMM DD YYYY')}</Table.Cell>
                                  <Table.Cell>{moment(request.paymentsDetails.dateIssued).format('MMM DD YYYY')}</Table.Cell>
                                </Table.Row>
                              )
                        }
               
                      })
                    }
                      
                    </Table.Body>
                    </Table>
                 </Tab.Pane>
          )
   
     }  
     },
    { menuItem: 'Repairs Requests', render: () => {
    return (
        <Tab.Pane attached={false}>
          <Header as="h4" color="green" textAlign="center">
                        Repairs Requisitions
                    </Header>
                  
                      <Table celled selectable>
                        <Table.Header>
                          <Table.Row>
                          <Table.HeaderCell>Amount Charged</Table.HeaderCell>
                          <Table.HeaderCell>Other Details</Table.HeaderCell>
                          <Table.HeaderCell> Requested By</Table.HeaderCell>
                          <Table.HeaderCell>Approved By</Table.HeaderCell>
                          <Table.HeaderCell>Request Date </Table.HeaderCell>
                          <Table.HeaderCell> Approval Date</Table.HeaderCell>
                          <Table.HeaderCell> Date Issued</Table.HeaderCell>                        
                          </Table.Row>
                      </Table.Header>
                      <Table.Body>
                      {
                        getVehicle.repairs.map(request => {  
                          if (request.paymentsDetails !== null ) {                     
                                return ( 
                                  <Table.Row>
                                    <Table.Cell>{request.paymentsDetails.amountCharged}</Table.Cell>
                                    <Table.Cell>{request.otherDetails}</Table.Cell>
                                    <Table.Cell>{request.requestedBy.personnelDetails.firstName} {request.requestedBy.personnelDetails.lastName}</Table.Cell>
                                    <Table.Cell>{request.requestApprovedBy.personnelDetails.firstName} {request.requestApprovedBy.personnelDetails.lastName}</Table.Cell>
                                    <Table.Cell>{moment(request.requestDate).format('MMM DD YYYY')}</Table.Cell>
                                    <Table.Cell>{moment(request.approvalDate).format('MMM DD YYYY')}</Table.Cell>
                                    <Table.Cell>{moment(request.paymentsDetails.dateIssued).format('MMM DD YYYY')}</Table.Cell>
                                  </Table.Row>
                                )
                          }
                 
                        })
                      }
                        
                      </Table.Body>
                      </Table>
                   </Tab.Pane>
            )
    } 
  },
    { menuItem: 'Service Requests', render: () => {
      return (
          <Tab.Pane attached={false}>
            <Header as="h4" color="green" textAlign="center">
                          Service Requisitions
                      </Header>
                    
                        <Table celled selectable>
                          <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>Amount Charged</Table.HeaderCell>
                            <Table.HeaderCell>Other Details</Table.HeaderCell>
                            <Table.HeaderCell> Requested By</Table.HeaderCell>
                            <Table.HeaderCell>Approved By</Table.HeaderCell>
                            <Table.HeaderCell>Request Date </Table.HeaderCell>
                            <Table.HeaderCell> Approval Date</Table.HeaderCell>
                            <Table.HeaderCell> Date Issued</Table.HeaderCell>                        
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {
                          getVehicle.service.map(request => {  
                            if (request.paymentsDetails !== null ) {                     
                                  return ( 
                                    <Table.Row>
                                      <Table.Cell>{request.paymentsDetails.amountCharged}</Table.Cell>
                                      <Table.Cell>{request.otherDetails}</Table.Cell>
                                      <Table.Cell>{request.requestedBy.personnelDetails.firstName} {request.requestedBy.personnelDetails.lastName}</Table.Cell>
                                      <Table.Cell>{request.requestApprovedBy.personnelDetails.firstName} {request.requestApprovedBy.personnelDetails.lastName}</Table.Cell>
                                      <Table.Cell>{moment(request.requestDate).format('MMM DD YYYY')}</Table.Cell>
                                      <Table.Cell>{moment(request.approvalDate).format('MMM DD YYYY')}</Table.Cell>
                                      <Table.Cell>{moment(request.paymentsDetails.dateIssued).format('MMM DD YYYY')}</Table.Cell>
                                    </Table.Row>
                                  )
                            }
                   
                          })
                        }
                          
                        </Table.Body>
                        </Table>
                     </Tab.Pane>
              )
      } },
    { menuItem: 'Inspection Requests', render: () =>{
      return (
          <Tab.Pane attached={false}>
            <Header as="h4" color="green" textAlign="center">
                          Inspection Requisitions
                      </Header>
                    
                        <Table celled selectable>
                          <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>Amount Charged</Table.HeaderCell>
                            <Table.HeaderCell>Other Details</Table.HeaderCell>
                            <Table.HeaderCell> Requested By</Table.HeaderCell>
                            <Table.HeaderCell>Approved By</Table.HeaderCell>
                            <Table.HeaderCell>Request Date </Table.HeaderCell>
                            <Table.HeaderCell> Approval Date</Table.HeaderCell>
                            <Table.HeaderCell> Date Issued</Table.HeaderCell>                        
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {
                          getVehicle.inspection.map(request => {  
                            if (request.paymentsDetails !== null ) {                     
                                  return ( 
                                    <Table.Row>
                                      <Table.Cell>{request.paymentsDetails.amountCharged}</Table.Cell>
                                      <Table.Cell>{request.otherDetails}</Table.Cell>
                                      <Table.Cell>{request.requestedBy.personnelDetails.firstName} {request.requestedBy.personnelDetails.lastName}</Table.Cell>
                                      <Table.Cell>{request.requestApprovedBy.personnelDetails.firstName} {request.requestApprovedBy.personnelDetails.lastName}</Table.Cell>
                                      <Table.Cell>{moment(request.requestDate).format('MMM DD YYYY')}</Table.Cell>
                                      <Table.Cell>{moment(request.approvalDate).format('MMM DD YYYY')}</Table.Cell>
                                      <Table.Cell>{moment(request.paymentsDetails.dateIssued).format('MMM DD YYYY')}</Table.Cell>
                                    </Table.Row>
                                  )
                            }
                   
                          })
                        }
                          
                        </Table.Body>
                        </Table>
                     </Tab.Pane>
              )
      }  },
  ]
 
        return (
   
    <Fragment>         
      <Header as="h3" color="green" textAlign="center">
        Vehicle Details
      </Header>
      <Divider color="olive"/>
      <Grid columns={2} relaxed>
      <Grid.Column>              
        <b>REGISTRATION NO</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getVehicle.registrationNumber}
        <Divider/>       
        <b>LOG BOOK No. </b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;{getVehicle.logBookNumber}
        <Divider/> 
        <b>VEHICLE MODEL</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getVehicle.model}
        <Divider/>       
        <b>FUEL TYPE</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getVehicle.fuelType}
        <Divider/> 
       </Grid.Column>
      
       <Grid.Column>
       <b>MANUFACTURE DATE</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(getVehicle.manufactureDate).format('MMM Do YYYY')}
        <Divider/>       
        <b>INSURANCE RENEWAL DATE </b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(getVehicle.manufactureDate).format('MMM Do YYYY')}
        <Divider/> 
        <b>INSURANCE VALUATION</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getVehicle.insuranceValuation}
        <Divider/>       
        <b>VEHICLE OWNER</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getVehicle.owner.name}
        <Divider/> 
                
        </Grid.Column>

      </Grid>
      <hr color="olive"/>
          <Form>
          <Segment.Group horizontal>
            <Segment></Segment>
            
            <Segment>
            <Form.Field >
            
                 <DatePicker selected={this.state.startDate} onChange={this.handleDateFromChange} />
                 <label>Date From:  </label>{' '}
            </Form.Field>
            </Segment>
            <Segment>
            <Form.Field >
            
                  <DatePicker selected={this.state.endDate} onChange={this.handleDateToChange} />
                  <label>Date To:  </label>{' '}
            </Form.Field>
            </Segment>
            </Segment.Group>
            </Form>
          
            <hr color="pink"/> 
            <Tab menu={{ pointing: true }} panes={panes} />
    </Fragment>
        );
        }
};

export default graphql(VehicleDetailQuery,
  {
    name:'vehicleDetail',
    options: props=>({
      variables:{
        id:props.match.params.id,
        startDate:moment().subtract(6, 'months').format('MMM DD YYYY'),
        endDate:moment().format('MMM DD YYYY')
      }
    })
  }

)  (VehicleDetails);
