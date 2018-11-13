import React,  { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import DatePicker from 'react-datepicker';
import moment from 'moment'
import { Form, Segment, Button, Grid, Header, Message, Dropdown, Divider, Modal } from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import getMaterialCosting from './queries/fetchMaterials';
import InitiatedMaterialRequisitionQuery from './queries/fetchMaterialRequisitionInitiated';

var materialOptions = [];
var supplierOptions = [];
class MaterialRequisitionCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            materialTypeId:'',
            quantity:'',
            supplierId:'',
            otherDetails:'',
            approxCost:'',
            paymentMode: '',
            modalOpen: false ,
            errors: {},
            loading:false
         }
    }

handleRequestDateChange = date=>{
    this.setState({requestDate:date});
}
    setMaterialValue = (e, data) => {
        materialOptions.forEach(element => {
            if (element.value === data.value) {
                this.setState({ materialTypeId: element.id });
                this.setState({ material:element.value  });
            }
         })
       
    }
    handleOpen = () => {
        // t
        let supplier = this.props.supplierFeed.suppliersFeed.find(x => x.id === this.state.supplierId)
        let cost = supplier.negotiatedRate * this.state.quantity
        this.setState({ approxCost: cost });
        this.setState({ modalOpen: true })
    
    }
    handleClose = () => {
        this.setState({ modalOpen: false })             
    }

    onConfirmation = () => {
        this.setState({ modalOpen: false }) 
        this.setState({ loading: true });   
        this._createMaterialRequisition();
    }
    setSupplierValue = (e, data) => {
        console.log(data)
        supplierOptions.forEach(element => {
            
            if (element.id === data.value) {
              console.log(element)
                this.setState({ supplierId: element.id });
                this.setState({ supplier:element.value  });
                
            }
         })
    }

    setPaymentMode = (e, data) => {
        this.setState({ paymentMode:data.value  });
    }
   
    validate = () => { 
        const errors = {};
        
        if (!this.state.materialTypeId) errors.materialTypeId = "Can't be blank";
        if (!this.state.quantity) errors.quantity = "Can't be blank";
        if (!this.state.supplierId) errors.supplierId = "Can't be blank";
        if (!this.state.otherDetails) errors.otherDetails = "Can't be blank";
        if (!this.state.paymentMode) errors.paymentMode = "Can't be blank";
        if (!this.state.requestDate) errors.requestDate = "Can't be blank";
        if (Object.keys(errors).length === 0) {
            this.handleOpen();
        }
        return errors;
        }

    onSubmit = () => {
        const errors = this.validate();
       
        this.setState({ errors })
    }
    render() { 
        
        const { errors, loading } = this.state
        const paymentOptions = [{ id: 1, value: 'CASH', text:'CASH' }, { id: 2, value: 'CHEQUE', text:'CHEQUE' }]
        console.log(this.props.supplierFeed)
       
        if (this.props.supplierFeed.loading === false) {
            if (this.props.supplierFeed.suppliersFeed !== undefined || this.props.supplierFeed.suppliersFeed.length !== 0) {
                let tempOp = [...(new Set(this.props.supplierFeed.suppliersFeed))];
                supplierOptions=[]
                tempOp.map(element => {                 
                 return   supplierOptions.push({ id: element.id, text: element.material.materialName + " " + element.supplierName, value: element.id });
                });
            }            
        }
        if (this.props.materialsCostFeed.loading === false) {
            if (this.props.materialsCostFeed.materialsCostingFeed !== undefined || this.props.materialsCostFeed.materialsCostingFeed.length !== 0) {
                let tempOp = [...(new Set(this.props.materialsCostFeed.materialsCostingFeed))];
                materialOptions=[]
                tempOp.map(element => {
                 return   materialOptions.push({ id: element.id, text: element.materialName, value: element.materialName });
                });
            }            
        }
        
        return ( 
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="green" textAlign="center">
                Create Material Requisition
             </Header>
                    <Divider /> 
                    <Form size="large" onSubmit={this.onSubmit}  loading={loading}>
                {errors.global && (
                    <Message negative>
                        <Message.Header> Something went wrong </Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                        )}
                        <Segment stacked>
                            <Form.Field error={!!errors.materialTypeId}>
                            <Dropdown
                            value={this.state.material}
                            search
                            selection
                            options={materialOptions}
                            onChange={this.setMaterialValue.bind(this)}
                            />
                            {errors.materialTypeId && <InlineError text={errors.materialTypeId} />}
                           
                            </Form.Field>
                            <Form.Field error={!!errors.supplierId}>
                            <Dropdown
                            
                            value={this.state.supplier}
                            search
                            selection
                            options={supplierOptions}
                            onChange={this.setSupplierValue.bind(this)}
                            />
                            {errors.supplierId && <InlineError text={errors.supplierId} />}
                            </Form.Field>
                                <Form.Field error={!!errors.quantity}>
                            <label>Quantity</label>
                            <input
                            placeholder="0000"
                            value={this.state.quantity}
                            type='number'                
                            onChange={e => this.setState({ quantity: e.target.value })}
                            />
                            {errors.quantity && <InlineError text={errors.quantity} />}
                            </Form.Field>
                            <Form.Field error={!!errors.paymentMode}>
                            <Dropdown
                            value={this.state.paymentMode}
                            search
                            selection
                            options={paymentOptions}
                            onChange={this.setPaymentMode.bind(this)}
                            />
                            {errors.paymentMode && <InlineError text={errors.paymentMode} />}
                            </Form.Field>
                            <Form.Field error={!!errors.otherDetails}>
                            <label>Other Details</label>
                            <Form.TextArea
                            autoHeight
                            rows={4}
                            value={this.state.otherDetails}
                                            
                            onChange={e => this.setState({ otherDetails: e.target.value })}
                            />
                            {errors.otherDetails && <InlineError text={errors.otherDetails} />}
                           
                            </Form.Field>
                            <Form.Field error={!!errors.requestDate}>
                                <label>Request Date</label>{' '}
                                <DatePicker selected={this.state.requestDate} onChange={this.handleRequestDateChange} />
                            </Form.Field>
                            <Form.Button
                                fluid
                                positive
                              
                                
                            >Submit</Form.Button>
                            </Segment>
                    </Form> 
                    <Modal size='fullscreen' open={this.state.modalOpen}  onClose={this.handleClose} closeIcon>
                <Modal.Header>Requisition cost</Modal.Header>
                <Modal.Content>
                    <b>Material: {this.state.material}</b><br/>
                    <b>Supplier: {this.state.supplier}</b><br/>
                    <b>Quantity: {this.state.quantity}</b><br/>
                            <b>Amount Charged: {this.state.approxCost}</b><br/>
                    <p>Please confirm the cost & supplier chosen for the transaction</p>
                </Modal.Content>
                <Modal.Actions>
                            <Button negative
                                onClick={e=>this.setState({ modalOpen:false  })}
                            >No</Button>
                            <Button positive icon='checkmark' labelPosition='right'
                                onClick={this.onConfirmation}
                                content='Yes' />
                </Modal.Actions>
            </Modal>
            </Grid.Column>
            </Grid>
         )
    }
    _createMaterialRequisition = async () => {
        if (!this.state.requestDate){
            var requestDate = moment().format();
          }else{
            var requestDate= this.state.requestDate
        }
       
        const {
            materialTypeId,
            quantity,
            supplierId,
            otherDetails,
            approxCost,
            paymentMode
        } = this.state
        await this.props.createMaterialRequest({
            variables: {
                materialTypeId,
                quantity,
                supplierId,
                otherDetails,
                approxCost,
                paymentMode,
                requestDate
            },
            refetchQueries:[
                { query: InitiatedMaterialRequisitionQuery }
              ]
        })
        this.props.history.push('/materialrequisitions/initiated')
    }
}



const SUPPLIERFEEDQUERY = gql`
query getSuppliers{
  suppliersFeed{
    id
    supplierName
    negotiatedRate
    material{
      id
    materialName
    materialDescription
    units
    costPerUnit
    standardUnit
    balance{
      id
      balance
    }
    }
  }
}
`

const CREATEMATERIALREQUISITIONMUTATION = gql`
mutation addMaterialRequisition(
    $materialTypeId: ID!
    $quantity: Int!
    $supplierId:ID!
    $otherDetails:String
    $approxCost:Int!
    $paymentMode:String!
    $requestDate: String  

        
  
){
  addMaterialRequisition(
    materialscostingId:$materialTypeId,
    supplierId:$supplierId,
    quantity:$quantity,
    otherDetails:$otherDetails,
    paymentMode: $paymentMode
    approxCost:$approxCost
    requestDate: $requestDate
  )
}`

export default compose(
    graphql(getMaterialCosting, { name: 'materialsCostFeed' }),
    graphql(SUPPLIERFEEDQUERY, { name: 'supplierFeed' }),
    graphql(CREATEMATERIALREQUISITIONMUTATION, { name: 'createMaterialRequest' })
    
) (MaterialRequisitionCreate)