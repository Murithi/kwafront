import React, { Component } from 'react';
import getUser from './queries/fetchUserDetails';
import { graphql, compose } from 'react-apollo';
import { Message, Icon, Header, Grid, Divider, Segment, Checkbox, Dropdown, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import GET_USERS from './queries/fetchUsers';
const options = [
  { key: 'Admin', text: 'ADMIN', value: 'Admin' },
  { key: 'Superuser', text: 'SUPERUSER', value: 'Superuser' },
  { key: 'User', text: 'USER', value: 'User' },
  { key: 'Accountant', text: 'ACCOUNTANT', value: 'Accountant' },
  { key: 'Director', text: 'DIRECTOR', value: 'Director' }
];
class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'USER',
      locked: null,
      authorized: null
    };
  }
  _updateUserRole = async () => {
    let { role, authorized, locked } = this.state;
    const id = this.props.match.params.id;

    if (authorized === null) return (authorized = this.props.userdetails.user.authorized);
    if (locked === null) return (locked = this.props.userdetails.user.locked);
    console.log(role);
    await this.props.updateUser({
      variables: { id, role, authorized, locked },
      refetchQueries: [{ query: GET_USERS }]
    });

    this.props.history.push('/users/list');
  };
  render() {
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
          <Message.Header>No User Found</Message.Header>
          <p>Add some new users to get started.</p>
        </Message.Content>
      </Message>
    );

    const timeoutMessage = (
      <Message icon negative>
        <Icon name="wait" />
        <Message.Content>
          <Message.Header>{this.props.userdetails.errorl}</Message.Header>
          Is the backend server running?
        </Message.Content>
      </Message>
    );
    if (this.props.userdetails && this.props.userdetails.loading) {
      return <div>{loadingMessage}</div>;
    }

    if (this.props.userdetails && this.props.userdetails.error) {
      return <div>{timeoutMessage}</div>;
    }

    if (this.props.userdetails.user === undefined || this.props.userdetails.user === 0) {
      return <div>{emptyMessage}</div>;
    }
    return (
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header as="h4" color="green" textAlign="center">
            Manage User
          </Header>
          <Segment.Group horizontal>
            <Segment>
              <p>
                <b>Employee:</b> &nbsp;&nbsp;&nbsp; {this.props.userdetails.user.personnelDetails.firstName} &nbsp;{' '}
                {this.props.userdetails.user.personnelDetails.lastName}
              </p>
              <Divider />
              <p>
                <b>Username:</b> &nbsp;&nbsp;&nbsp; {this.props.userdetails.user.name}
              </p>
              <Divider />
              <p>
                <b>User Email:</b> &nbsp;&nbsp;&nbsp; {this.props.userdetails.user.email}
              </p>
              <Divider />
              <p>
                <b>Locked:</b> &nbsp;&nbsp;&nbsp;{' '}
                {this.props.userdetails.user.locked ? (
                  <Checkbox onChange={() => this.setState({ locked: !this.state.locked })} defaultChecked />
                ) : (
                  <Checkbox onChange={() => this.setState({ locked: !this.state.locked })} />
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b>Authorized:</b> &nbsp;&nbsp;&nbsp;{' '}
                {this.props.userdetails.user.authorized ? (
                  <Checkbox defaultChecked onChange={() => this.setState({ authorized: !this.state.authorized })} />
                ) : (
                  <Checkbox onChange={() => this.setState({ authorized: !this.state.authorized })} />
                )}
              </p>
              <Divider />
              <p>
                <b>User Email:</b> &nbsp;&nbsp;&nbsp; {this.props.userdetails.user.email}
              </p>
              <Divider />
              <p>
                <Dropdown fluid selection options={options} defaultValue={options[2].value} />
              </p>
              <Divider />
              <p>
                <Button fluid positive onClick={this._updateUserRole()}>
                  Submit
                </Button>
              </p>
              <Divider />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}
const UPDATEUSERROLEMUTATION = gql`
  mutation updateUserRole($id: ID!, $role: String!, $authorized: Boolean, $locked: Boolean) {
    updateUserRole(id: $id, role: $role, authorized: $authorized, locked: $locked)
  }
`;
export default compose(
  graphql(getUser, {
    name: 'userdetails',
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  }),
  graphql(UPDATEUSERROLEMUTATION, { name: 'updateUser' })
)(UserDetails);
