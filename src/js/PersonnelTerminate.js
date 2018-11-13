import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Message, Icon, List, Menu, Image, Divider, Button } from 'semantic-ui-react';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import InlineError from './messages/InlineError';
import moment from 'moment';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import PersonnelDetailQuery from './queries/fetchPersonnelDetails';
import Personnel_Feed_Query from './queries/fetchSearchPersonnel';


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

class PersonnelTerminate extends Component {
  constructor(props) {
    super(props);
      this.state = {
          reasonsForTermination: '',
          dateOfTermination:'',
          errors: {}, 
          loading:false
        
    };
  }
  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
    };  
    validate = () => {
        const errors = {}
      if (!this.state.reasonsForTermination) errors.reasonsForTermination = "Can't be blank";
      if (!this.state.dateOfTermination) errors.dateOfTermination = "Can't be blank";

      if (Object.keys(errors).length === 0) {
          this.setState({ loading: true });
        
        this._terminatePersonnel();
      }
      return errors;
    
    }  
  render() {
    let id = this.props.match.params.id;
    const { errors, loading } = this.state;
      return (
        
      <Query query={PersonnelDetailQuery} variables={{ id }}>
        {({ loading, error, data: { personnel } }) => {
          if (loading) return <div>{loadingMessage}</div>;
          if (error) return <div>{timeoutMessage}</div>;
          if (_.isEmpty(personnel)) return <div>{emptyMessage}</div>;
         
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
                        <Divider />            
                      <p>
                        <b>First Name:</b> {personnel.firstName}
                      </p>
                      <Divider />
                      <p>
                        <b>Gender:</b> {personnel.gender ? ' Male' : ' Female'}
                      </p>
                      <Divider />
                      
                      <p>
                        <b>Designation:</b> {personnel.designation}
                      </p>
                      <Divider />                      
                      <p>
                        <b>Date of Employment:</b> {moment(personnel.dateOfEmployment).format('MMM Do YYYY')}
                      </p>
                      <Divider />                     
                </Segment>
                       
                          </Segment.Group>
                          <Divider />
                          <Form size="large" onSubmit={this.onSubmit} loading={loading}>
            {errors.global && (
              <Message negative>
                <Message.Header> Something went wrong </Message.Header>
                <p>{errors.global}</p>
              </Message>
            )}
                      <Segment stacked>
                <Form.Field error={!!errors.dateOfTermination}>                
                    <label>Date of Termination </label>{' '}
                    <DatePicker selected={this.state.dateOfTermination} onChange={this.handleTerminationChange} />
                </Form.Field>
                                  
              <Form.Field error={!!errors.reasonsForTermination}>
                <label>First Name</label>
                <input
                 
                  value={this.state.reasonsForTermination}
                  onChange={e => this.setState({ reasonsForTermination: e.target.value })}
                />
                {errors.reasonsForTermination && <InlineError text={errors.reasonsForTermination} />}
            </Form.Field>
                  
              <Form.Button>Submit</Form.Button>          
                          
                          
            </Segment>
          </Form>      
                </Grid.Column>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
  
  _terminatePersonnel = async () => { 
    const { dateOfTermination, reasonsForTermination} = this.state


    await this.props.createPersonnel({
        variables: { dateOfTermination, reasonsForTermination },
        refetchQueries: [{ query: Personnel_Feed_Query }]
    })
    this.props.history.push(`/personnel/termination/list`);
}  
}

export default PersonnelTerminate;
