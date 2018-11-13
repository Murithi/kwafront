import React, { Component } from 'react';
import _ from 'lodash'
import moment from 'moment';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Form, Table, Dropdown, Checkbox, Radio, Grid, Message, Icon, Menu, Input, Divider, Image, Segment } from 'semantic-ui-react';

class SearchRequisition extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
                <Message.Header>Record Found</Message.Header>
               
              </Message.Content>
            </Message>
          );
      
          const timeoutMessage = (
            <Message icon negative>
              <Icon name="wait" />
              <Message.Content>
                <Message.Header>Timeout</Message.Header>
                Is the backend server running?
              </Message.Content>
            </Message>
          );
        return ( 
            <React.Fragment>
                <b>Search Requisition by </b>
                </React.Fragment>
         )
    }
}
 
export default SearchRequisition;