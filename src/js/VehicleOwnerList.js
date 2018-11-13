import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Label, Header, Menu, Table, Grid, Message } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import VehicleOwnerFeedQuery from './queries/fetchVehicleOwners';
import VehicleOwnerItem from './VehicleOwnerItem';

class VehicleOwnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
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
          <Message.Header>No Vehicle Owners Found</Message.Header>
          <p>Add some new Vehicle Owners to get started.</p>
          <Link to={'/vehicleowner/new'} className="ui button primary">
            Add New Vehicle Owners
          </Link>
        </Message.Content>
      </Message>
    );

    const timeoutMessage = (
      <Message icon negative>
        <Icon name="wait" />
        <Message.Content>
          <Message.Header>{this.props.VehicleOwnerFeed.error}</Message.Header>
          Is the backend server running?
        </Message.Content>
      </Message>
    );
    if (this.props.VehicleOwnerFeed && this.props.VehicleOwnerFeed.loading) {
      return <div>{loadingMessage}</div>;
    }

    if (this.props.VehicleOwnerFeed && this.props.VehicleOwnerFeed.error) {
      return <div>{timeoutMessage}</div>;
    }
    if (this.props.VehicleOwnerFeed.vehicleOwnerFeed.length === 0) {
      return <div>{emptyMessage}</div>;
    }
    return (
      <div>
          <Header as="h4" color="green" textAlign="center">
                Vehicle Owners
            </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
              <Table.HeaderCell>Company Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Company Email</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.VehicleOwnerFeed.vehicleOwnerFeed.map(VehicleOwner => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/vehicleowner/${VehicleOwner.id}`}>{VehicleOwner.name}</Link>
                </Table.Cell>
                <Table.Cell>{VehicleOwner.phone}</Table.Cell>
                <Table.Cell>{VehicleOwner.email}</Table.Cell>
                <Table.Cell>
                  <Link to={`/vehicleowner/edit/${VehicleOwner.id}`}>
                    <Icon name="edit circle green " />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Icon onClick={() => this._deleteVehicleOwner(VehicleOwner.id)} name="delete circle red" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Link to={'/vehicleowner/new'}>
                  <Icon name="add circle green" size="huge" />
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

  _deleteVehicleOwner = async id => {
    await this.props.deleteVehicleOwner({
      variables: { id }
      //   refetchQueries:[{query:VehicleOwnerFeedQuery}]
    });
    this.props.VehicleOwnerFeed.refetch();
    this.props.history.push('/vehicleowner/list');
  };
}

const DELETEVEHICLEOWNERMUTATION = gql`
  mutation deleteVehicleOwner($id: ID!) {
    deleteVehicleOwner(id: $id)
  }
`;
export default compose(
  graphql(VehicleOwnerFeedQuery, { name: 'VehicleOwnerFeed' }),
  graphql(DELETEVEHICLEOWNERMUTATION, { name: 'deleteVehicleOwner' })
)(VehicleOwnerList);
