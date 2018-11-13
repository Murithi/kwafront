import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';
import { AUTH_TOKEN } from '../constants';
import upateUserDetails from './graphqlCache/updateUserDetails';

class LoginForm extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: ''
  };

  render() {
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
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
            <Icon name="home" color="green" circular /> Log-in to your account
            </Header>
            {/* <Header as="h2" icon textAlign="center">
              <Icon name="home" color="green" circular />

              <Header.Content>Karakana Project Management System</Header.Content>
            </Header> */}
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  placeholder="email"
                  iconPosition="left"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Choose a safe password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />

                <Button color="green" fluid size="large" onClick={() => this._confirm()}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us?
              
              <Link to={`/signup`}>
              Sign Up
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  _confirm = async () => {
    const { name, email, password } = this.state;
   
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      });
   
      const { token } = result.data.login;
      const { name, role } = result.data.login.user;
      console.log('userRole', role);
      this._updateUserDetails('userName', name);
      this._updateUserDetails('userRole', role);
      this._updateUserDetails('loggedIn', true);
      // this._createUserDetails(name, role, true)
      
      this._saveUserData(token);
      this.props.history.push(`/`);
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password
        }
      });
      const { ok } = result.data.signup;
      if (ok) this.history.push('/login')
    }
    
  };

  _updateUserDetails = async (index, value) => {
  
    const result = await this.props.updateUserDetails({
      variables: {
        index: index,
        value: value
      }
    })
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      ok
    errors{
      path
      message
    }

    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    user{
      name
      role      
    }
    token
    }
  }
`;
export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
  graphql(upateUserDetails, {name: 'updateUserDetails'}),

)(withRouter(LoginForm));
