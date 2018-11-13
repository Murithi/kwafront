import React, { Component } from 'react';
import { compose, graphql } from "react-apollo";
import gql from 'graphql-tag';
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import { Form, Segment, Grid, Header,  Message, Dropdown, Divider } from 'semantic-ui-react';
import InlineError from './messages/InlineError';

import getSuppliers from './queries/fetchSuppliers';
import Material_Feed_Query from './queries/fetchMaterials';

var options = [];
class SuppliersCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materialsId: '',
            materialsName:'',
            negotiatedRate: '',
            otherDetails: '',
            supplierName: '',
            supplierPhone: '',
            errors: {},
            loading: false
        }
    }
    setValue = (e, data) => {
        console.log(data);
        this.setState({
            materialsName: data.value,           
        });
        
      };
    validate = () => { 
        const errors = {};
        
        if (!this.state.materialsName) errors.materialsName = "Can't be blank";
        if (!this.state.negotiatedRate) errors.negotiatedRate = "Can't be blank";
        if (!this.state.supplierName) errors.supplierName = "Can't be blank";
        if (!this.state.supplierPhone) errors.supplierPhone = "Can't be blank";
        if (!this.state.otherDetails) errors.otherDetails = "Can't be blank";
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._createSupplier();
        }    
        return errors;
        }
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    };
    render() { 
        const { errors, loading } = this.state;
        if (this.props.materialsFeed.loading === false) {
            const tempOps = this.props.materialsFeed.materialsCostingFeed;
            options=[]
            tempOps.map(element => {
                options.push({ id: element.id, text: element.materialName, value: element.materialName });
            });
          }
        return ( 
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="green" textAlign="center">
                Create Materials Item
             </Header>
                    <Divider />
                    <Form size="large" onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (
                    <Message negative>
                        <Message.Header> Something went wrong </Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                        )}
                        <Segment stacked>
                        <Form.Field error={!!errors.materialsId}>
                                <label>Material Name</label>
                                <Dropdown
                                value={this.state.materialsName}
                                search
                                selection
                                options={options}
                                onChange={this.setValue.bind(this)}
                                />
                                {errors.materialsId && <InlineError text={errors.materialsId} />}
                            </Form.Field>
                        <Form.Field error={!!errors.supplierName}>
                        <label>Supplier's Name</label>
                        <input                        
                        value={this.state.supplierName}
                            onChange={e=>this.setState({ supplierName: e.target.value })}
                        />
                        {errors.supplierName && <InlineError text={errors.supplierName} />}
                            </Form.Field> 
                            <Form.Field error={!!errors.supplierPhone}>
                            <label>Phone Number</label>
                            <Phone
                            placeholder="Enter phone number"
                            value={this.state.supplierPhone}
                            onChange={supplierPhone => this.setState({ supplierPhone })}
                            />
                            {errors.supplierPhone && <InlineError text={errors.supplierPhone} />}
                        </Form.Field>
                           
                            <Form.Field error={!!errors.negotiatedRate}>
                        <label>Negotiated Rate</label>
                        <input                        
                                    value={this.state.negotiatedRate}
                        type='number'            
                            onChange={e=>this.setState({ negotiatedRate: e.target.value })}
                        />
                        {errors.negotiatedRate && <InlineError text={errors.negotiatedRate} />}
                            </Form.Field> 
                        
                            <Form.Field error={!!errors.otherDetails}>
                        <label>Other Details</label>
                        <input                        
                                    value={this.state.otherDetails}
                                  
                            onChange={e=>this.setState({ otherDetails: e.target.value })}
                        />
                        {errors.otherDetails && <InlineError text={errors.otherDetails} />}
                            </Form.Field>    

                        <Form.Button fluid positive>Submit</Form.Button>                
                        </Segment> 
                        </Form> 
            </Grid.Column>
            </Grid>
         )
    }
    _createSupplier = async () => {
        const {
            materialsName, negotiatedRate, otherDetails, supplierName, supplierPhone
        } = this.state;

        const material = options.find(item => item.value === materialsName);
        const materialsId = material.id;
        await this.props.addSupplier({
            variables: { materialscostingId:materialsId, negotiatedRate, otherDetails, supplierName, supplierPhone },
            refetchQueries: [{query: getSuppliers}]
        });
        this.props.history.push('/suppliers/list');
    }
}


const CREATESUPPLIERMUTATION = gql`

mutation addSupplier(
  $supplierName:String!
  $supplierPhone:String!
  $materialscostingId: ID!
  $negotiatedRate:Int!
  $otherDetails:String!

) {
	createSupplier(
    supplierName: $supplierName,
    supplierPhone:$supplierPhone,    
    materialscostingId:$materialscostingId,
    negotiatedRate:$negotiatedRate,
    otherDetails:$otherDetails
  )
}
`;
 
export default compose(
    graphql(Material_Feed_Query, { name: "materialsFeed" }),
    graphql(CREATESUPPLIERMUTATION, { name: 'addSupplier' }))(SuppliersCreate);