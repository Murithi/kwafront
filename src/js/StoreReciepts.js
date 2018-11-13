import React, { Component } from 'react';
import { compose, graphql } from "react-apollo";
import gql from 'graphql-tag'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import { Form, Segment, Grid, Header, TextArea, Message, Dropdown, Divider, Image } from 'semantic-ui-react';
import InlineError from './messages/InlineError';


import getMaterialCosting from './queries/fetchMaterials'

var materialOptions = [];
var supplierOptions = [];
class StoreReciepts extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            itemId:'',
            unitsRecieved:'',
            dateOfTran: moment(),
            materialsRecievedFrom:'',
            deliveryNote: '',
            errors: {},
            loading:false
         }
    }
    handleDateOfTranChange = date => { 
        this.setState({ dateOfTran: date });
    }

    setSupplierValue = (e, data) => {
        supplierOptions.forEach(element => {
            if (element.value === data.value) {
                this.setState({ materialsRecievedFrom: element.id });
                this.setState({ supplier: element.value });
                
            }
        })
    }
    setMaterialValue = (e, data) => {
        materialOptions.forEach(element => {
            if (element.value === data.value) {
                this.setState({ itemId: element.id });
                this.setState({ material:element.value  });
            }
         })
       
    }
    validate = () => {
        const errors = {}
        if (!this.state.itemId) errors.itemId = "Can't be blank"
        if (!this.state.materialsRecievedFrom) errors.materialsRecievedFrom = "Can't be blank"
        if (!this.state.unitsRecieved) errors.unitsRecieved = "Can't be blank";
        if (!this.state.deliveryNote) errors.deliveryNote = "Can't be blank";
             

        if (Object.keys(errors).length === 0) {
            this._addReceipt();
        }
        return errors
    }
    
    onSubmit = () => {
        const errors = this.validate();
       
        this.setState({ errors })
    }
    render() { 
        const{loading, errors}=this.state
        console.log(this.props)
        if (this.props.materialsCostFeed.loading === false) {
            console.log(this.props.materialsCostFeed.materialsCostingFeed[0].id)

        }
        if (this.props.supplierFeed.loading === false) {
            if (this.props.supplierFeed.suppliersFeed !== undefined || this.props.supplierFeed.suppliersFeed.length !== 0) {
                let tempOp = [...(new Set(this.props.supplierFeed.suppliersFeed))];
                supplierOptions=[]
                tempOp.map(element => {
                 return   supplierOptions.push({ id: element.id, text: element.supplierName, value: element.supplierName });
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
                Add Reciept Details 
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
                            <Form.Field error={!!errors.itemId}>
                            <label> Goods Recieved </label>{' '}
                            <Dropdown
                            value={this.state.material}
                            search
                            selection
                            options={materialOptions}
                            onChange={this.setMaterialValue.bind(this)}
                            />
                            {errors.itemId && <InlineError text={errors.itemId} />}
                           
                            </Form.Field>
                            <Form.Field error={!!errors.materialsRecievedFrom}>
                            <label> Goods Recieved From </label>{' '}
                            <Dropdown
                            value={this.state.supplier}
                            search
                            selection
                            options={supplierOptions}
                            onChange={this.setSupplierValue.bind(this)}
                            />
                            {errors.materialsRecievedFrom && <InlineError text={errors.materialsRecievedFrom} />}
                            </Form.Field>
                            <Form.Field error={!!errors.unitsRecieved}>
                            <label> Units Recieved</label>{' '}
                            <input
                            placeholder="0000"
                            value={this.state.unitsRecieved}
                            type='number'                
                            onChange={e => this.setState({ unitsRecieved: e.target.value })}
                            />
                            {errors.unitsRecieved && <InlineError text={errors.unitsRecieved} />}
                            </Form.Field>
                            <Form.Field error={!!errors.deliveryNote}>
                            <label> Delivery Note</label>{' '}
                            <input
                            placeholder="0000OIYHN87"
                            value={this.state.deliveryNote}
                                       
                            onChange={e => this.setState({ deliveryNote: e.target.value })}
                            />
                            {errors.deliveryNote && <InlineError text={errors.deliveryNote} />}
                            </Form.Field>
                            <Form.Field error={!!errors.dateOfTran}>
                                    <label> Date</label>{' '}
                                        <DatePicker
                                            isClearable={true}    
                                            selected={this.state.dateOfTran}
                                            onChange={this.handleDateOfTranChange}
                                            todayButton={"Today"}
                                        />
                                        {errors.dateOfTran && <InlineError text={errors.dateOfTran} />}
                            </Form.Field>
                            <Form.Button
                                fluid
                                positive                             
                             >Submit</Form.Button>
                           
                        </Segment>
                    </Form>
                </Grid.Column>                
                </Grid>
         )
    }

    _addReceipt = async () => {
        const { itemId,  unitsRecieved,
            dateOfTran, materialsRecievedFrom,
            deliveryNote } = this.state
        
        
        const StoreBalId = this.props.materialsCostFeed.materialsCostingFeed[0].balance.id
        const balanceBefore = this.props.materialsCostFeed.materialsCostingFeed[0].balance.balance
        
        await this.props.addReceipt({
            variables: {
                materialsCostingId:itemId,
                balanceBefore, 
                unitsTransacted: parseInt(unitsRecieved),
                transactionDate: dateOfTran, 
                supplierId: materialsRecievedFrom,
                StoreBalId, 
                deliveryNote
            }
        })
        this.props.history.push('/')
    }
}

const ADDRECEIPT = gql`
mutation addMaterialsRecieved(
  $materialsCostingId:ID!, $balanceBefore:Int!, $unitsTransacted:Int!, 
  $StoreBalId:ID!, $deliveryNote:String!, 
  $transactionDate:String!, $supplierId:ID!


){
    addReciepts(
    materialsCostingId:$materialsCostingId
    balanceBefore:$balanceBefore
    unitsTransacted:$unitsTransacted
    transactionDate:$transactionDate
    supplierId:$supplierId
    StoreBalId:$StoreBalId
    deliveryNote:$deliveryNote
  )
}
`

const SUPPLIERFEEDQUERY = gql`
query getSuppliers{
  suppliersFeed{
    id
    supplierName
    negotiatedRate
  }
}
`
 
export default compose(
    graphql(getMaterialCosting, {
        name: 'materialsCostFeed'
    }),
    graphql(SUPPLIERFEEDQUERY, {
        name: 'supplierFeed'
    }),
    graphql(ADDRECEIPT, {
        name: 'addReceipt'
    }),
) (StoreReciepts);