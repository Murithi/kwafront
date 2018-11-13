import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { Link, Route } from 'react-router-dom';
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import Personnel_Feed_Query from './queries/fetchPersonnel';

class PersonnelList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
          <Message.Header>No Personnel Found</Message.Header>
          <p>Add some new Personnel to get started.</p>
          <Link to={'/personnel/new'} className="ui button primary">
            Add New Personnel{' '}
          </Link>
        </Message.Content>
      </Message>
    );

    const timeoutMessage = (
      <Message icon negative>
        <Icon name="wait" />
        <Message.Content>
          <Message.Header>{this.props.personnelFeed.errorl}</Message.Header>
          Is the backend server running?
        </Message.Content>
      </Message>
    );
    if (this.props.personnelFeed && this.props.personnelFeed.loading) {
      return <div>{loadingMessage}</div>;
    }

    if (this.props.personnelFeed && this.props.personnelFeed.error) {
      return <div>{timeoutMessage}</div>;
    }

    if (this.props.personnelFeed.personnelFeed.length === 0) {
      return <div>{emptyMessage}</div>;
    }

    return (
      <React.Fragment>
        <Header as="h4" color="green" textAlign="center">
          Personnel List
        </Header>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>National ID No.</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Designation </Table.HeaderCell>
              <Table.HeaderCell>Project </Table.HeaderCell>
              <Table.HeaderCell> Edit</Table.HeaderCell>
              <Table.HeaderCell> Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.personnelFeed.personnelFeed.map(person => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/personnel/${person.id}`}>{person.idNumber}</Link>
                </Table.Cell>
                <Table.Cell>{person.firstName}</Table.Cell>
                <Table.Cell>{person.lastName}</Table.Cell>
                <Table.Cell>{person.designation.roleName}</Table.Cell>
                <Table.Cell>{(person.projectAssignedTo) ? person.projectAssignedTo.projectName : person.projectAssignedTo }</Table.Cell>
                <Table.Cell>
                  <Link to={`/personnel/edit/${person.id}`}>
                    <Icon name="edit circle green " />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Icon onClick={() => this._deletePersonnel(person.id)} name="delete circle red" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                {/* <Link to={'/personnel/new'}>
                  <Icon name="add circle green right" size="huge" />
                </Link> */}

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
      </React.Fragment>
    );
  }

  _deletePersonnel = async id => {
    await this.props.deletePersonnel({
      variables: { id }
    });
    this.props.personnelFeed.refetch();
    this.props.history.push('/personnel/list');
  };
}

const DELETEPERSONNELMUTATTION = gql`
  mutation deletePersonnel($id: ID!) {
    removePersonnel(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(Personnel_Feed_Query, { name: 'personnelFeed' }),
  graphql(DELETEPERSONNELMUTATTION, { name: 'deletePersonnel' })
)(PersonnelList);
