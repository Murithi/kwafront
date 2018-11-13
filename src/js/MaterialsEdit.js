import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Link, Route } from 'react-router-dom';
import { Divider, Form, Header, Segment, Button, Message, Icon, Grid } from 'semantic-ui-react';
import { Query } from 'react-apollo';

import InlineError from './messages/InlineError'
import MaterialFeedQuery from './queries/fetchMaterialCosting';
import Material_Feed_Query from './queries/fetchMaterials';


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
        <Message.Header>No Materials with that ID Found</Message.Header>
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

class MaterialsEdit extends Component {
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
            this._changeMaterialsRequisition();
        }    
        return errors;
        }
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    };
    render() {
        let id = this.props.match.params.id;
        const { errors, loading } = this.state;
        return ( 
             <Query query={MaterialFeedQuery} variables={{ id }}>
            {({ loading, error, data }) => {
          if (loading) return <div>{loadingMessage}</div>;
          if (error) return <div>{timeoutMessage}</div>;
          if (_.isEmpty(data)) return <div>{emptyMessage}</div>;
                    
            return (
                <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="green" textAlign="center">
                Edit Materials Item
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
                                    placeholder={data.materialsCosting.materialName}                 
                        value={this.state.materialName}
                            onChange={e=>this.setState({ materialName: e.target.value })}
                        />
                        {errors.materialName && <InlineError text={errors.materialName} />}
                            </Form.Field> 
                            <Form.Field error={!!errors.materialDescription}>
                        <label>Materials Description</label>
                                    <input     
                        placeholder={data.materialsCosting.materialDescription}                
                        value={this.state.materialDescription}
                            onChange={e=>this.setState({ materialDescription: e.target.value })}
                        />
                        {errors.materialDescription && <InlineError text={errors.materialDescription} />}
                            </Form.Field> 
                            <Form.Field error={!!errors.standardUnit}>
                        <label>Standard Unit</label>
                                    <input    
                                    placeholder={data.materialsCosting.standardUnit}                 
                        value={this.state.standardUnit}
                            onChange={e=>this.setState({ standardUnit: e.target.value })}
                        />
                        {errors.standardUnit && <InlineError text={errors.standardUnit} />}
                            </Form.Field> 
                            <Form.Field error={!!errors.units}>
                        <label>Units</label>
                                    <input     
                                    placeholder={data.materialsCosting.units}                 
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
                                        placeholder={data.materialsCosting.costPerUnit}     
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
                }}
                    
            </Query>
         )
    }

    _changeMaterialsRequisition = async () => {
        const {
            
            materialName,
            materialDescription,
            units,
            costPerUnit,
            standardUnit
        } = this.state;
        const id = this.props.match.params.id;
        await this.props.changeMaterials({
            variables: {
                id,
                materialName,
                materialDescription,
                units,
                costPerUnit,
                standardUnit
            },
            refetchQueries: [{ query: Material_Feed_Query }]
        });
        this.props.history.push('/materials/list');
    }
}

const CHANGEMATERIALSMUTATION = gql`
mutation changeMaterials(
    $id:ID!,
  $materialName: String!,
  $materialDescription: String!
  $units: Int!,
  $costPerUnit: Int!,
  $standardUnit: String!,
){
  editMaterials(
    id:$id
  materialName: $materialName,
  materialDescription: $materialDescription,
  units:$units,
  costPerUnit:$costPerUnit,
  standardUnit:$standardUnit
  )
}`;

 
export default graphql(CHANGEMATERIALSMUTATION, { name: 'changeMaterials' }) (MaterialsEdit);