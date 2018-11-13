import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'; 
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Role_Feed_Query from './queries/fetchRoles';

class PersonnelRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    console.log(this.props.roleFeed.personnelRoleFeed)
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
          <Message.Header>No Roles Found</Message.Header>
          <p>Add some new roles to get started.</p>
          <Link to={'/personnel/roles/new'} className="ui button primary">
            Add New Role{' '}
          </Link>
        </Message.Content>
      </Message>
    );
      
    const timeoutMessage = (
      <Message icon negative>
        <Icon name="wait" />
        <Message.Content>
          <Message.Header>{this.props.roleFeed.error}</Message.Header>
          Is the backend server running?
              </Message.Content>
      </Message>
    );
    if (this.props.roleFeed && this.props.roleFeed.loading) {
      return <div>{loadingMessage}</div>;
    }
      
    if (this.props.roleFeed && this.props.roleFeed.error) {
      return <div>{timeoutMessage}</div>;
    }
      
    if (this.props.roleFeed.personnelRoleFeed.length === 0) {
      return <div>{emptyMessage}</div>;
    }
    return (
      <div>
        <Header as="h4" color="green" textAlign="center">
          Personnel List
        </Header>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Role Name</Table.HeaderCell>
              <Table.HeaderCell>Minimum Salary</Table.HeaderCell>
              <Table.HeaderCell>Maximum Salary</Table.HeaderCell>
              <Table.HeaderCell> Edit</Table.HeaderCell>
              <Table.HeaderCell> Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.roleFeed.personnelRoleFeed.map(role => (
              <Table.Row>
                <Table.Cell>
                <Link to={`/personnel/roles/${role.id}`}> {role.roleName} </Link>
                  </Table.Cell>
                <Table.Cell>{role.minimumSalary}</Table.Cell>
                <Table.Cell>{role.maximumSalary}</Table.Cell>
                <Table.Cell>
                  <Link to={`/personnel/roles/edit/${role.id}`}>
                    <Icon name="edit circle green " />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Icon onClick={() => this._deleteRole(role.id)} name="delete circle red" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Link to={'/personnel/roles/new'}>
                  <Icon name="add circle green right" size="huge" />
                </Link>

                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  
  }
  _deleteRole = async id => {
    await this.props.deleteRole({
      variables: { id }
    });
    this.props.roleFeed.refetch();
    this.props.history.push('/personnel/roles/list');
  }
}
const DELETEROLEMUTATION = gql`
  mutation deleteRole($id:ID!){
    removeRole(id: $id){
      id
    }
  }
`;

export default graphql(Role_Feed_Query, {name:'roleFeed'})(PersonnelRoles);