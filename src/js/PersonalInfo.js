import React, { Component } from 'react';
import { Form, Segment, Tab, Grid, Header, Message, Icon, List, Menu, Image, Divider, Button } from 'semantic-ui-react';
import moment from 'moment';
import { graphql } from 'react-apollo';

import PersonnelDetailQuery from './queries/fetchPersonnelDetails';

const REACT_APP_CLOUD_NAME = 'https://res.cloudinary.com/murithi/image/upload/';
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
      <Message.Header>No Personnel with that ID Found</Message.Header>
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

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        
    let id = this.props.id;

    
    const {errors, loading}=this.state

    if (this.props.personalDetails.loading) {
        return <div>{loadingMessage}</div>            
    }
    if (this.props.personalDetails.loading) {
        return <div>{timeoutMessage}</div>
    }
    const { personnel } = this.props.personalDetails
    
    if (personnel.length === 0) {
        return <div>{emptyMessage}</div>
     }
     console.log(personnel)
        return (
          
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
                      <b>Designation:</b> {personnel.designation.roleName}
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
                      <b>Assigned Project:</b>{' '}
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
          
        );
      
    }
}
 
export default graphql(PersonnelDetailQuery,
    {
        name: 'personalDetails',
        options: props => ({
            variables: {
                id: props.id,                    
            }
        })
    })(PersonalInfo);