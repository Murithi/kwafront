import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Message, Icon, List, Menu } from 'semantic-ui-react';
import _ from 'lodash';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import VehicleOwnerDetailQuery from './queries/fetchVehicleOwner';
import { Link } from 'react-router-dom';

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
      <Message.Header>No Vehicle Owners with that ID Found</Message.Header>
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

class VehicleOwnerDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let id = this.props.match.params.id;
    return (
      <Query query={VehicleOwnerDetailQuery} variables={{ id }}>
        {({ loading, error, data: { vehicleOwner } }) => {
          if (loading) return <div>{loadingMessage}</div>;
          if (error) return <div>{timeoutMessage}</div>;
          if (_.isEmpty(vehicleOwner)) return <div>{emptyMessage}</div>;

          return (
            <div>
              <Link to={'/vehicleowner/list'}>
                {' '}
                <Icon name="reply" /> Back{' '}
              </Link>

              <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 600 }}>
                  <Header as="h4" color="green" textAlign="center">
                    Vehicle Owner Details
                  </Header>

                  <Menu fluid vertical>
                    <Menu.Item name={vehicleOwner.name} />
                    <Menu.Item name={vehicleOwner.phone} />
                    <Menu.Item name={vehicleOwner.email} />
                  </Menu>
                </Grid.Column>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default VehicleOwnerDetails;
