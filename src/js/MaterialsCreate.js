import React, { Component } from 'react';
import { compose, graphql } from "react-apollo";
import gql from 'graphql-tag';
import { Form, Segment, Grid, Header, TextArea, Message, Dropdown, Divider, Image } from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import Material_Feed_Query from './queries/fetchMaterials';

class MaterialsCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            materialName:'',
            materialDescription:'',
            units:'',
            costPerUnit:'',
            standardUnit: '',
            errors: {},
            loading:false
         }
    }

    validate = () => { 
        const errors = {};
        
        if (!this.state.materialName) errors.materialName = "Can't be blank";
        if (!this.state.materialDescription) errors.materialDescription = "Can't be blank";
        if (!this.state.units) errors.units = "Can't be blank";
        if (!this.state.costPerUnit) errors.costPerUnit = "Can't be blank";
        if (!this.state.standardUnit) errors.standardUnit = "Can't be blank";
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._createMaterialsRequisition();
        }    
        return errors;
        }
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    };
    render() { 
        const { errors, loading } = this.state;
        return (  
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="green" textAlign="center">
                Create materials item
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
                        <Form.Field error={!!errors.materialName}>
                        <label>Materials Name</label>
                        <input                        
                        value={this.state.materialName}
                            onChange={e=>this.setState({ materialName: e.target.value })}
                        />
                        {errors.materialName && <InlineError text={errors.materialName} />}
                            </Form.Field> 
                            <Form.Field error={!!errors.materialDescription}>
                        <label>Materials Description</label>
                        <input                        
                        value={this.state.materialDescription}
                            onChange={e=>this.setState({ materialDescription: e.target.value })}
                        />
                        {errors.materialDescription && <InlineError text={errors.materialDescription} />}
                            </Form.Field> 
                            <Form.Field error={!!errors.standardUnit}>
                        <label>Standard Unit</label>
                        <input                        
                        value={this.state.standardUnit}
                            onChange={e=>this.setState({ standardUnit: e.target.value })}
                        />
                        {errors.standardUnit && <InlineError text={errors.standardUnit} />}
                            </Form.Field> 
                            <Form.Field error={!!errors.units}>
                        <label>Units</label>
                        <input                        
                                    value={this.state.units}
                        type='number'            
                            onChange={e=>this.setState({ units: e.target.value })}
                        />
                        {errors.units && <InlineError text={errors.units} />}
                            </Form.Field> 
                        
                            <Form.Field error={!!errors.costPerUnit}>
                        <label>Cost Per Unit</label>
                        <input                        
                                    value={this.state.costPerUnit}
                        type='number'            
                            onChange={e=>this.setState({ costPerUnit: e.target.value })}
                        />
                        {errors.costPerUnit && <InlineError text={errors.costPerUnit} />}
                            </Form.Field>    

                        <Form.Button fluid positive>Submit</Form.Button>                
                        </Segment> 
                        </Form> 
            </Grid.Column>
            </Grid>
        )
    }
    _createMaterialsRequisition = async () => {
        const {
            materialName,
            materialDescription,
            units,
            costPerUnit,
            standardUnit
        } = this.state;

        await this.props.createMaterials({
            variables: {
                materialName,
                materialDescription,
                units,
                costPerUnit,
                standardUnit
            },
            refetchQueries:[{query:Material_Feed_Query}]
            
        });
        this.props.history.push('/materials/list');
    }
}

const CREATEMATERIALSMUTATION = gql`
mutation createMaterials(
  $materialName: String!
    $materialDescription: String
    $units: Int
    $costPerUnit: Int
    $standardUnit: String
  
){
 addMaterials(
  materialName:$materialName,
  materialDescription:$materialDescription,
  costPerUnit:$costPerUnit,
  units:$units,
  standardUnit: $standardUnit
  
)
}`;
 
export default graphql(CREATEMATERIALSMUTATION, {name:'createMaterials'})(MaterialsCreate);