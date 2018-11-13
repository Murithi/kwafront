import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router';
import { Button, Form, Grid, Input, Header, Label, Image, Message, Segment } from 'semantic-ui-react';
import { AUTH_TOKEN } from '../constants'
import InlineError from './messages/InlineError';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            idNumber:'',
            password: '',
            confirmPassword: '',
            username:'',
            errors: {},
            loading: false

         }
    }

    validate = () => { 
        const errors = {};
        if (!this.state.email) errors.email = "Can't be blank";
        if (!this.state.name) errors.username = "Can't be blank";
        if (!this.state.password) errors.password = "Can't be blank";
        if (!this.state.idNumber) errors.idNumber = "Can't be blank";
        if (!this.state.confirmPassword) errors.email = "Can't be blank";
        if (this.state.confirmPassword !== this.state.password) errors.password = "Password confirmation must match"
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._signUp();
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
            <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid textAlign="center" style={{ height: '100%' }}
                    verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 600 }}>
              <Header as="h2" color="green" textAlign="center">
              <Image src="/src/logo.png" />
                      Sign Up
          </Header>
          <Form size="large" onSubmit={this.onSubmit} loading={loading}>
            {errors.global && (
              <Message negative>
                <Message.Header> Something went wrong </Message.Header>
                <p>{errors.global}</p>
              </Message>
            )}
            <Segment stacked>
                                <Form.Field error={!!errors.email}>   
                    <Label>Email</Label>                
                <Input
                fluid
                icon="mail"
                placeholder="email"
                iconPosition="left"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                                    />
                                    {errors.name && <InlineError text={errors.name} />}                    
                                </Form.Field>  
                                <Form.Field error={!!errors.idNumber}>  
                                <Label>Id Number</Label>                  
                <Input
                fluid
                icon="user"
                placeholder=""
                iconPosition="left"
                value={this.state.idNumber}
                onChange={e => this.setState({ idNumber: e.target.value })}
                />
            </Form.Field>  
                                    
                
                                <Form.Field error={!!errors.username}>    
                    <Label>UserName:</Label>                
                    <Input
                    fluid
                    icon="user"
                    placeholder="user"
                    iconPosition="left"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    />
                </Form.Field>  
                                <Form.Field error={!!errors.password}>  
                                <Label>Password</Label>                  
                <Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Choose a safe password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                                    />     
                                </Form.Field> 
                                <Form.Field error={!!errors.confirmPassword}>  
                                <Label green>Confirm password</Label>  
                <Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={e => this.setState({ confirmPassword: e.target.value })}
                                    />
                </Form.Field>                    
                <Form.Button fluid positive>Submit</Form.Button>                   
                        </Segment>  
                        </Form>    
              </Grid.Column>
                </Grid> 
          </div>          
         )
    }
    _signUp = async () => { 
        const { name, email, password, idNumber } = this.state
        const result = await this.props.signupMutation({
            variables: {
              name,
              email,
                password,
              idNumber,
            },
          })
          const { token } = result.data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)
    }
    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
      }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, 
  $password: String!, 
  $name: String!
  $idNumber:String!) {
    signup(email: $email,
     password: $password, 
     name: $name,
     idNumber:$idNumber
     )
      {
          
      token
    }
  }
`
 
export default graphql(SIGNUP_MUTATION, { name: 'signupMutation' })(withRouter(Signup));
