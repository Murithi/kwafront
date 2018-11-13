import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Message, Icon, List, Menu, Image, Divider, Button } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import SectionDetailQuery from './queries/fetchSectionDetails';

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
        <Message.Header>No Project with that ID Found</Message.Header>
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
class SectionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let id = this.props.match.params.id;
        return (
        <Query query={SectionDetailQuery} variables={{ id }}>
        {({ loading, error, data: { project } }) => {
          if (loading) return <div>{loadingMessage}</div>;
          if (error) return <div>{timeoutMessage}</div>;
          if (_.isEmpty(project)) return <div>{emptyMessage}</div>;
            return (
                <div>
                    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                        <Grid.Column style={{ maxWidth: 900 }}>
                            <Header as="h4" color="green" textAlign="center">
                                Section Details
            </Header>
                        </Grid.Column>
                    </Grid>
                </div>
            );       
                }}
      </Query> 
          )
    }
}
 
export default SectionDetails;