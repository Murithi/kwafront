import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Header, Form, Table, Dropdown, Checkbox, Radio, Grid, Message, Icon, Menu, Input,  Divider, Image, Segment } from 'semantic-ui-react';
import searchedPersonnelDetails from './graphqlCache/getPersonnel';
import InlineError from './messages/InlineError';
import SearchPersonnelRegistration from './SearchPersonnelRegistration';
import getPersonnel from './graphqlCache/getPersonnel';
import GET_USERS from './queries/fetchUsers';
const GET_PERSONNEL = gql`
  query PersonnelFeed {
    personnelFeed {
      id
      firstName
      lastName
      idNumber
    }
  }
`;

const ADD_USERS = gql`
mutation addUser($email:String! $name:String!,
    $authorized:Boolean!, 
    $role:String!,
    $personnelId:String!){
  addUser(
    email:$email,
    name:$name,
    authorized:$authorized, 
    role:$role,
    personnelId:$personnelId
  ){
    id
    email
  }
}
`;

var options = [
  { text: "Admin", value: 'ADMIN' },
  { text: "SuperUser", value: 'SUPERUSER' },
  { text: "Director", value: 'DIRECTOR' },
  { text: "Accountant", value: 'ACCOUNTANT' },
  { text: "User", value: 'USER' }
  
];
class RegisterUsers extends Component { 
  state = {
    username: '',
    email: '',
    errors: {},
    loading:false
  }
  setValue = (e, data) => {
        
        
    this.setState({ role: data.value });
  };
  validate = () => { 
    const errors={}
    if (!this.state.userName) errors.userName = "Can't be blank";
    if (!this.state.email) errors.email = "Can't be blank";
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
    
    this._createUser();
  }
  return errors;
  }
  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
  };

  render() { 
    const { errors, loading } = this.state;
        const { searchedPersonnelDetails } = this.props;
       
      return (
        <React.Fragment>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header as="h4" color="green" textAlign="center">
            User Details
          </Header> 
          <SearchPersonnelRegistration/>      
            </Grid.Column>
        </Grid>  
          <React.Fragment>
                    

            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 900 }}>
              <Header as="h4" color="green" textAlign="center">
             User Details
              </Header> 
              <Segment.Group horizontal>
                <Segment>
                  <React.Fragment>
                  <Image src={searchedPersonnelDetails.photoUrl} size="medium" centered /> 
                                        </React.Fragment>
                    <Divider/>                    
                    <React.Fragment>
                    <b>First Name:</b> {searchedPersonnelDetails.firstName}
                    </React.Fragment>
                    <Divider />   
                    <React.Fragment>
                    <b>Last Name:</b> {searchedPersonnelDetails.lastName}
                    </React.Fragment>
                    <Divider /> 
                    
                    
                    {(searchedPersonnelDetails.assignedAccount)
                        ?
                        <React.Fragment>                        
                       
                                 <Checkbox label='Assigned Account' defaultChecked />            
                                               
                        </React.Fragment>                
                                                
                        :
                                        
                        <React.Fragment>
                            <React.Fragment> <b>Assigned Account: </b><Checkbox /></React.Fragment>
                            <Divider/>
                                             
                        </React.Fragment>
    
                                                
                    }
                  
                    <Divider />   
                     
                </Segment>
                </Segment.Group>                  
               
            <Form size="large" onSubmit={this.onSubmit} loading={loading}>
              {errors.global && (
                <Message negative>
                  <Message.Header> Something went wrong </Message.Header>
                  <p>{errors.global}</p>
                </Message>
              )} 
              <Segment stacked>
              <Form.Field error={!!errors.firstName}>
                <label>User Name</label>
                <input
                  placeholder="user name"
                  value={this.state.userName}
                  onChange={e => this.setState({ userName: e.target.value })}
                />
                {errors.email && <InlineError text={errors.email} />}
                          </Form.Field>
                          <Form.Field error={!!errors.firstName}>
                <label>Email</label>
                <input
                  placeholder="user name"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                {errors.email && <InlineError text={errors.email} />}
                </Form.Field>   
                <Form.Field error={!!errors.role}>
                  <label>role</label>
                  <Dropdown
                    value={this.state.role}
                    search
                    selection
                    options={options}
                    onChange={this.setValue.bind(this)}
                  />
                  {errors.role && <InlineError text={errors.role} />}
              </Form.Field> 
              <Form.Button>Submit</Form.Button>  
              </Segment>
                </Form>
                </Grid.Column>              
            </Grid>  
            </React.Fragment>          
            
            
          </React.Fragment>
          )
  }
  
  _createUser = async () => { 
    const { email, userName, role, } = this.state;
    let name = userName;
    let personnelId = this.props.searchedPersonnelDetails.personnelID
    console.log(personnelId)
    let authorized = true

    await this.props.addUser({
      variables:{
        email, name, role, authorized, personnelId
      },
      refetchQueries: [{ query: GET_USERS }]
    })
    this.props.history.push('/users/list')
  }
};

export default compose(
  graphql(getPersonnel, {
    props: ({ data: { loading, error, searchedPersonnelDetails } }) => {
        console.log(searchedPersonnelDetails);
        if(loading) { return { loading } }        
        
      
        if(error) { return { error } }
    
          
        return { searchedPersonnelDetails };
        
    }
}),
  graphql(ADD_USERS, {name:'addUser'})
)(RegisterUsers)