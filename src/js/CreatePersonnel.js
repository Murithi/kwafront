import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash'
import moment from 'moment';
import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Form, Table, Grid, Message, Icon, Menu, Input,  Divider, Image, Segment } from 'semantic-ui-react';

import Personnel_Feed_Query from './queries/fetchSearchPersonnel';

class PersonnelDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { idNumber:'' }
    }
    render() { 
        let idNumber = this.state.idNumber; 
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
                <Message.Header>No Terminations Found</Message.Header>
                <p>Add some new terminations to get started.</p>
                <Link to={'/personnel/termination/new'} className="ui button primary">
                  Add New Termination{' '}
                </Link>
              </Message.Content>
            </Message>
          );
      
          const timeoutMessage = (
            <Message icon negative>
              <Icon name="wait" />
              <Message.Content>
                <Message.Header>Timeout</Message.Header>
                Is the backend server running?
              </Message.Content>
            </Message>
          );
 
        return (<div>
              
            {this.state.idNumber === ''
                ?
                <Form>
                    <Form.Group unstackable widths={2}>
                <Form.Input 
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...'
                    
                    onChange={e => { this.setState({ idNumber: e.target.value }); }} />
                   
                <Form.Button positive secondary big right >Submit</Form.Button>
                </Form.Group>
          </Form>
                
                
                :
                <div>
                <Form>
                    <Form.Group unstackable widths={2}>
                <Form.Input 
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...'
                    
                    onChange={e => { this.setState({ idNumber: e.target.value }); }} />
                   
                <Form.Button positive secondary big right >Submit</Form.Button>
                </Form.Group>
          </Form>
                    
                    <Query query={Personnel_Feed_Query} variables={{ idNumber:`${this.state.idNumber}` }}>
                            
                        {({ loading, error, data }) => {
                            console.log(data)
                            if (loading) return <div>{loadingMessage}</div>;
                            if (error) return <div>{timeoutMessage}</div>;
                            
                            if (_.isEmpty(data)) return <div>{emptyMessage}</div>;
                            console.log(data);
                            const { personnel   } = data;
                            return (
                                <div>
                                <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                                    <Grid.Column style={{ maxWidth: 900 }}>
                                    <Header as="h4" color="green" textAlign="center">
                                        Personnel Details
                                    </Header>
                                    
                                    
                                    <Segment.Group horizontal>
                                        <Segment>
                                        <p>
                                        <Image src={personnel.photoUrl} size="medium" centered /> 
                                        
                                        
                                        </p>
                                        <p>
                                            <b>First Name:</b> {personnel.firstName}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Gender:</b> {personnel.gender ? ' Male' : ' Female'}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>NSSF ID Number:</b> {personnel.nssfId}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Designation:</b> {personnel.designation}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Address:</b> {personnel.addressNo}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Date of Employment:</b> {moment(personnel.dateOfEmployment).format('MMM Do YYYY')}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Date of Termination:</b>{' '}
                                            {personnel.dateOfTermination
                                            ? moment(personnel.dateOfTermination).format('MMM Do YYYY')
                                            : 'N/A'}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Education Certificates:</b>

                                            <Image src={personnel.certificatesUrl} size="medium" centered />
                                            
                                        </p>
                                        <Divider />
                                        

                                    
                                        <p>
                                            <b>Last Name: </b> {personnel.lastName}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>ID Number:</b> {personnel.idNumber}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>NHIF ID Number:</b> {personnel.nhifId}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Phone Number:</b> {personnel.phoneNumber}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Location:</b> {personnel.location}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Current Salary:</b> {personnel.currentSalary}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Highest level of Education:</b> {personnel.highestEducationLevel}
                                        </p>
                                        <Divider />
                                        <p>
                                            <b>Curriculum Vitae:</b>
                                            
                                            <Image src={personnel.curriculumVitaeUrl} size="medium" centered />
                                            
                                        </p>
                                        <Divider />
                                        </Segment>
                                    </Segment.Group>
                                    </Grid.Column>
                                </Grid>
                                </div>
                            );
                            }}
                </Query></div>}
                
        </div>
            
        )
    }
}
 
export default PersonnelDetails;