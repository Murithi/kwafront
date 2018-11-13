import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import InlineError from './messages/InlineError';
import  { Dropdown, Divider, Form, Segment, Grid, Header, Message } from 'semantic-ui-react';
import { gql } from 'graphql-tag';
import Role_Feed_Query from './queries/fetchRoles';
import CREATEROLEMUTATION from './mutations/createRole';
var options = [];
class PersonnelRolesCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleName: '',
            minimumSalary: '',
            maximumSalary: '',
            errors: {},
            loading:false
          }
    }

    validate = () => { 
        const errors = {};
        if (!this.state.roleName) errors.roleName = "Can't be blank";
        if (!this.state.minimumSalary) errors.minimumSalary = "Can't be blank";
        if (!this.state.maximumSalary) errors.maximumSalary = "Can't be blank";
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._createRole();
        }
        return errors;
    }

    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    };
    
    setValue = (e, data) => {
        this.setState({ value: data });
    };
    
    render() { 
        const { errors, loading } = this.state;
        return (
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 600 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Create Role
          </Header>
          <Divider/>          
                    <Form size="large" onSubmit={this.onSubmit} loading={loading}>
                        {errors.global && (
                            <Message negative>
                                <Message.Header> Something went wrong </Message.Header>
                                <p>{errors.global}</p>
                            </Message>
                        )}
                        <Segment stacked>
              <Form.Field error={!!errors.roleName}>
                <label>Role Name</label>
                <input
                  placeholder="Surveyor"
                  value={this.state.roleName}
                  onChange={e => this.setState({ roleName: e.target.value })}
                                />
                            </Form.Field>
                <Form.Field error={!!errors.minimumSalary}>
                <label>Minimum Salary</label>
                <input
                  placeholder="10000"
                  type='number'                  
                  value={this.state.minimumSalary}
                  onChange={e => this.setState({ minimumSalary: e.target.value })}
                                />
                            </Form.Field>
                
                <Form.Field error={!!errors.maximumSalary}>
                <label>Maximum Salary</label>
                <input
                  placeholder="10000"
                  type='number'                  
                  value={this.state.maximumSalary}
                  onChange={e => this.setState({ maximumSalary: e.target.value })}
                                />
                            </Form.Field>  
                
                <Form.Button fluid positive> Submit </Form.Button>            
                </Segment>                
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }

    _createRole = async () => {
        const {
            roleName,
            minimumSalary,
            maximumSalary
        } = this.state;

        await this.props.createRole({
            variables: {
                roleName,
                minimumSalary,
                maximumSalary
            },
            refetchQueries: [{query: Role_Feed_Query}]
        });
        this.props.history.push('/personnel/roles/list');
    };
}



export default graphql(CREATEROLEMUTATION, {name:'createRole'})(PersonnelRolesCreate);