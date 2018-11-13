import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import InlineError from './messages/InlineError';
import  {   Divider, Form, Segment, Grid, Header, Message } from 'semantic-ui-react';
import { gql } from 'graphql-tag';
import DatePicker from 'react-datepicker';
import ProjectFeedQuery from './queries/fetchProjectList';

import CREATEPROJECTMUTATION from './mutations/createProject';
class ProjectCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            projectName:'',
            projectDescription:'',
            projectValuation:'',
            projectStartDate:'',
            projectCompletionDate: '',
            projectLocation: '',
            errors: {},
            loading:false
         }
    }
    handleStartDateChange = date => {
        this.setState({ projectStartDate: date });
      };
    handleCompletionDateChange = date => {
        this.setState({ projectCompletionDate: date });
      };
    validate = () => { 
        const errors = {};
        if (!this.state.projectName) errors.projectName = "Can't be blank";
        if (!this.state.projectDescription) errors.projectDescription = "Can't be blank";
        if (!this.state.projectValuation) errors.projectValuation = "Can't be blank";
        if (!this.state.projectStartDate) errors.projectStartDate = "Can't be blank";
        if (!this.state.projectCompletionDate) errors.projectCompletionDate = "Can't be blank";
        if (!this.state.projectLocation) errors.projectLocation = "Can't be blank";
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._createProject();
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
            <Grid textAlign="center" style={{ height: '100%' }}
                verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 600 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Create Project
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
                            <Form.Field error={!!errors.projectName}>
                                <label>Project Name</label>
                                <input
                                    placeholder="Lare Road"
                                    value={this.state.projectName}
                                    onChange={e => this.setState({ projectName: e.target.value })}
                                                />
                            </Form.Field>
                            <Divider/>
                            <Form.Field error={!!errors.projectDescription}>
                                <label>Project Description</label>
                                <input
                                    placeholder="Lare Road"
                                    value={this.state.projectDescription}
                                    onChange={e => this.setState({ projectDescription: e.target.value })}
                                                />
                            </Form.Field>
                            <Divider/>
                            <Form.Field error={!!errors.projectValuation}>
                                <label>Project Valuation</label>
                                <input
                                    placeholder="10000"
                                    type='number'                  
                                    value={this.state.projectValuation}
                                    onChange={e => this.setState({ projectValuation: e.target.value })}
                                                />
                            </Form.Field>
                            <Divider/>
                            <Form.Field error={!!errors.projectStartDate}>
                  
                            <label>Project Commencement Date </label>{' '}
                            <DatePicker selected={this.state.projectStartDate} onChange={this.handleStartDateChange} />
                            </Form.Field>
                            <Divider />
                            <Form.Field error={!!errors.projectCompletionDate}>
                  
                            <label>Project Completion Date </label>{' '}
                            <DatePicker selected={this.state.projectCompletionDate} onChange={this.handleCompletionDateChange} />
                            </Form.Field>
                            <Divider/>
                            <Form.Field error={!!errors.projectLocation}>
                                <label>Project Location</label>
                                <input
                                    placeholder="Lare "
                                    value={this.state.projectLocation}
                                    onChange={e => this.setState({ projectLocation: e.target.value })}
                                                />
                            </Form.Field>
                
                
                <Form.Button fluid positive> Submit </Form.Button>            
                </Segment>                
                    </Form>
                </Grid.Column>
            </Grid>          
         )
    }
    _createProject = async () => { 
        const {
            projectName,
            projectDescription,
            projectValuation,
            projectStartDate,
            projectCompletionDate,
            projectLocation
        } = this.state;
        
        await this.props.createProject({
            variables: {
                projectName,
                projectDescription,
                projectValuation,
                projectStartDate,
                projectCompletionDate,
                projectLocation
            },
            refetchQueries: [{query: ProjectFeedQuery}]
           
        });
        this.props.history.push('/projects/list');
    }
}
 
export default graphql(CREATEPROJECTMUTATION, {name:'createProject'}) (ProjectCreate);