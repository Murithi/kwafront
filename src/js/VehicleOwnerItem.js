import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Table, Button, Label, Icon } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import VehicleOwnerFeedQuery from './queries/fetchVehicleOwners';

class VehicleOwnerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div />;
  }
  _deleteVehicleOwner = async id => {
    await this.props.deleteVehicleOwner({
      variables: { id },
      refetchQueries: [{ query: VehicleOwnerFeedQuery }]
    });

    this.props.history.push('/vehicleowner/list');
  };
}

const DELETEVEHICLEOWNERMUTATION = gql`
  mutation deleteVehicleOwner($id: ID!) {
    removeVehicleOwner(id: $id) {
      id
    }
  }
`;

export default graphql(DELETEVEHICLEOWNERMUTATION, { name: 'deleteVehicleOwner' })(VehicleOwnerItem);
