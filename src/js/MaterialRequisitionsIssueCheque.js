import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import { Message, Icon, Button, Grid, Table, Form,  Divider, Segment, Header } from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import getMaterialRequisition from './queries/fetchMaterialsRequestById';
import getApprovedRequisitions from './queries/fetchApprovedMaterialRequisitions'


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

class MaterialRequisitionsIssueCheque extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            loading: false,
        }
    }
    validate =()=>{
    const errors = {};
    if (!this.state.amountPaid) errors.amountPaid = "Can't be blank";
    if (!this.state.invoiceNumber) errors.invoiceNumber = "Can't be blank";
    if (!this.state.discountRecieved) errors.discountRecieved = "Can't be blank"; 
              
    if (Object.keys(errors).length === 0) {
        this.setState({ loading: true });
        this._issueCheque();
      }
  
      return errors;
    }
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
      };
    render() {
        const { errors, loading } = this.state
        if (this.props.materialRequest.loading) {
            return <div>{loadingMessage}</div>            
        }
        if (this.props.materialRequest.loading) {
            return <div>{timeoutMessage}</div>
        }
        const { getMaterialRequisition } = this.props.materialRequest
        if (getMaterialRequisition.length === 0) {
            return <div>{emptyMessage}</div>
        }
        console.log(getMaterialRequisition)
        return (
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Issue Cheque Payment
                    </Header>
                    <Segment.Group horizontal>
                            
                        <Segment>
                            <Divider />
                            <Table basic='very' celled >
                                            <Table.Body>
                                            <Table.Row>
                                            <Table.Cell><b>Requested By</b></Table.Cell>
                                            <Table.Cell>{getMaterialRequisition.requestedBy.personnelDetails.firstName} &nbsp; {getMaterialRequisition.requestedBy.personnelDetails.lastName}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                        <Table.Cell><b> Price </b></Table.Cell>
                                        <Table.Cell>{currencyFormatter.format(getMaterialRequisition.approxCost, { code: 'KES' }    )}</Table.Cell>
                                                </Table.Row> 
                                                <Table.Row>
                                        <Table.Cell><b>Vehicle Serviced </b></Table.Cell>
                                        <Table.Cell>{getMaterialRequisition.materialType.materialName}</Table.Cell>
                                        </Table.Row>
                                                <Table.Row>
                                        <Table.Cell><b>Details </b></Table.Cell>
                                        <Table.Cell>{getMaterialRequisition.otherDetails}</Table.Cell>
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
                                            <Form.Field error={!!errors.amountPaid}>
                                            <label>Amount Paid</label>
                                            <input
                                                    
                                            type='number'        
                                            value={this.state.amountPaid}
                                            onChange={e => this.setState({ amountPaid: e.target.value })}
                                                /> 
                                                {errors.amountPaid && <InlineError text={errors.amountPaid} />}
                                            </Form.Field>
                                            <Form.Field error={!!errors.invoiceNumber}>
                                            <label>Invoice No. </label>
                                            <input
                                                    
                                                   
                                            value={this.state.invoiceNumber}
                                            onChange={e => this.setState({ invoiceNumber: e.target.value })}
                                                /> 
                                                {errors.invoiceNumber && <InlineError text={errors.invoiceNumber} />}
                                            </Form.Field>
                                            <Form.Field error={!!errors.discountRecieved}>
                                            <label>Discount Recieved</label>
                                            <input
                                                    
                                            type='number'        
                                            value={this.state.discountRecieved}
                                            onChange={e => this.setState({ discountRecieved: e.target.value })}
                                                /> 
                                                {errors.discountRecieved && <InlineError text={errors.discountRecieved} />}
                                </Form.Field>
                                <Form.Field error={!!errors.otherDetails}>
                            <label>Comments</label>
                            <Form.TextArea
                            autoHeight
                            rows={4}
                            value={this.state.otherDetails}
                                            
                            onChange={e => this.setState({ otherDetails: e.target.value })}
                            />
                            {errors.otherDetails && <InlineError text={errors.otherDetails} />}
                           
                            </Form.Field>
                                            <Form.Button fluid positive>Submit</Form.Button>
              </Form>                              
                        </Segment>
                        </Segment.Group> 
                </Grid.Column>
                
            </Grid>
            
        )
    
    
    }
    _issueCheque = async () => {
        const { amountPaid, invoiceNumber, otherDetails, discountRecieved } = this.state
        const materialPaymentsId = this.props.match.params.id
        const datePaid = moment().format()
        await this.props.issueCheque({
            variables: {
                amountPaid,
                invoiceNumber,
                otherDetails,
                discountRecieved,
                datePaid,
                materialPaymentsId
            },

            refetchQueries:[{query: getApprovedRequisitions}]
        })
        this.props.history.push('/materialrequisitions/issuedCheque');
    }
}
const ADDMATERIALCHECKMUTATION = gql`
mutation addChequePaymentDetails(
  $amountPaid:Int!
  $invoiceNumber:String!
  $discountRecieved:Int!
  $datePaid: DateTime!
  $otherDetails:String
  $materialPaymentsId: ID!){
  addChequePaymentDetails(
    amountPaid:$amountPaid
    invoiceNumber:$invoiceNumber,
    discountRecieved:$discountRecieved,
    datePaid:$datePaid,
    otherDetails:$otherDetails,
    materialPaymentsId:$materialPaymentsId
  ){
    id
  }
}` 
export default compose(
    graphql(getMaterialRequisition,
        {
            name: 'materialRequest',
            options: props => ({
                variables: {
                    id: props.match.params.id,
                }
            })
        }),
    graphql(ADDMATERIALCHECKMUTATION,
        {
            name: 'issueCheque'
        }),
    
     ) (MaterialRequisitionsIssueCheque);