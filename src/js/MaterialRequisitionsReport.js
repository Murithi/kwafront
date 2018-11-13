import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'
import {Message, Button, Form, Table, Icon, Grid, Segment, Divider, Header} from 'semantic-ui-react'
import moment from 'moment';
import InlineError from './messages/InlineError';
import getUserDetails from './queries/getUserDetails';
import getPaymentDetails from './queries/fetchMaterialsPaymentDetails';
import getApprovedRequisitions from './queries/fetchMaterialRequisitionsIssuedCash'
var paymentIssue_id
const loadingMessage = (<Message icon info>
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
      <Message.Header>No Request with that ID Found</Message.Header>
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
class MaterialRequisitionsReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: {},
        }
    }
    validate = () => { 
        const errors = {};
    if (!this.state.amountCharged) errors.amountCharged = "Can't be blank";
    if (!this.state.recieptNumber) errors.recieptNumber = "Can't be blank";
    if (!this.state.amountReturned) errors.amountReturned = "Can't be blank";   
    if (Object.keys(errors).length === 0) {
        this.setState({ loading: true });
        this._addPaymentDetails();
      }
  
      return errors;
    }
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
      };
    render() {
        const {  loading, errors } = this.state;
        if (this.props.paymentDetails.loading) {
            return <div>{loadingMessage}</div>            
        }
        if (this.props.paymentDetails.loading) {
            return <div>{timeoutMessage}</div>
        }
        const { issuedMaterialRequisition } = this.props.paymentDetails
        if (issuedMaterialRequisition.length === null) {
            return <div>{emptyMessage}</div>
         }else{
            paymentIssue_id = issuedMaterialRequisition.cashPaymentsDetails.id
           }
        return (
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Report Cash Usage
                    </Header>
                    <Segment.Group horizontal>
                            
                        <Segment>
                        <Divider />
                                <Table basic='very' celled >
                                            <Table.Body>
                                            <Table.Row>
                                            <Table.Cell><b>Requested By</b></Table.Cell>
                                            <Table.Cell>{issuedMaterialRequisition.requestedBy.personnelDetails.firstName} &nbsp; {issuedMaterialRequisition.requestedBy.personnelDetails.lastName}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                        <Table.Cell><b>Amount Issued </b></Table.Cell>
                                        <Table.Cell>KES {issuedMaterialRequisition.cashPaymentsDetails.amountIssued}</Table.Cell>
                                                </Table.Row> 
                                                <Table.Row>
                                        <Table.Cell><b>Vehicle Serviced </b></Table.Cell>
                                        <Table.Cell>{issuedMaterialRequisition.materialType.materialName}</Table.Cell>
                                        </Table.Row>
                                                <Table.Row>
                                        <Table.Cell><b>Details </b></Table.Cell>
                                        <Table.Cell>{issuedMaterialRequisition.otherDetails}</Table.Cell>
                                        </Table.Row>        
                                            </Table.Body>
                                        </Table>   
                                        <Divider /> 
                                        <Form size="large" onSubmit={this.onSubmit} loading={loading}>
                                        {errors.global && (
                                            <Message negative>
                                            <Message.Header> Something went wrong </Message.Header>
                                            <p>{errors.global}</p>
                                            </Message>
                                            )}
                                            <Form.Field error={!!errors.amountCharged}>
                                            <label>Amount Charged</label>
                                            <input
                                                    
                                            type='number'        
                                            value={this.state.amountCharged}
                                            onChange={e => this.setState({ amountCharged: e.target.value })}
                                                /> 
                                                {errors.amountCharged && <InlineError text={errors.amountCharged} />}
                                            </Form.Field>
                                            <Form.Field error={!!errors.recieptNumber}>
                                            <label>Reciept/Invoice No. </label>
                                            <input
                                                    
                                                   
                                            value={this.state.recieptNumber}
                                            onChange={e => this.setState({ recieptNumber: e.target.value })}
                                                /> 
                                                {errors.recieptNumber && <InlineError text={errors.recieptNumber} />}
                                            </Form.Field>
                                            <Form.Field error={!!errors.amountReturned}>
                                            <label>Amount Returned</label>
                                            <input
                                                    
                                            type='number'        
                                            value={this.state.amountReturned}
                                            onChange={e => this.setState({ amountReturned: e.target.value })}
                                                /> 
                                                {errors.amountReturned && <InlineError text={errors.amountReturned} />}
                                            </Form.Field>
                                            <Form.Button fluid positive>Submit</Form.Button>
              </Form>                              
                        </Segment>
                        </Segment.Group>            
                    </Grid.Column>
                    </Grid>        
         )
    }

    _addPaymentDetails = async () => {
        const {
            amountCharged,
            recieptNumber,
            amountReturned
        } = this.state;
        let requestId= this.props.match.params.id
        const dateReported = moment().format();
        await this.props.addPaymentDetails({
            variables: {
                paymentIssue_id,
                amountCharged,
                recieptNumber,
                amountReturned,
                dateReported,
                requestId
            },
            refetchQueries: [{ query: getApprovedRequisitions }]
        });
        this.props.history.push('/materialrequisitions/issued');
    }
}

const ADDPAYMENTDETAILSMUTATION = gql`
mutation addPaymentDetails(
    $paymentIssue_id:ID!, $amountCharged:Int!,
    $recieptNumber:String!, $amountReturned:Int!, 
    $requestId:ID! $dateReported:String!
    ){
        reportPayment(
      paymentIssue_id:$paymentIssue_id, amountCharged:$amountCharged,
      recieptNumber:$recieptNumber, amountReturned:$amountReturned,
      dateReported:$dateReported, requestId:$requestId
      )
}`

export default compose(
    graphql(getPaymentDetails,
        {
            name: 'paymentDetails',
            options: props => ({
                variables: {
                    id: props.match.params.id,
                    
                }
            })
        }),
    graphql(ADDPAYMENTDETAILSMUTATION,
        {
            name: 'addPaymentDetails'
        }),
    graphql(getUserDetails, {name:'userDetails'}),
) (MaterialRequisitionsReport);