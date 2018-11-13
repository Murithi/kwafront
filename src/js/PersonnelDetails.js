import React, { Component } from 'react';
import { Form, Segment, Tab, Grid, Header, Message, Icon, List, Menu, Image, Divider, Button } from 'semantic-ui-react';
import _ from 'lodash';

import moment from 'moment';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import PersonalInfo from './PersonalInfo'
import PersonnelSalariesRecieved from './PersonnelSalariesRecieved'
import PersonnelAdvancesRecieved from './PersonnelAdvancesRecieved'


class PersonnelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    const panes = [
      { menuItem: 'Personal Details', render: () => <Tab.Pane attached={false}> <PersonalInfo id={this.props.match.params.id}/></Tab.Pane>  },
      { menuItem: 'Salary History', render: () => <Tab.Pane attached={false}><PersonnelSalariesRecieved id={this.props.match.params.id}/></Tab.Pane> },
      { menuItem: 'Advances History', render: () => <Tab.Pane attached={false}><PersonnelAdvancesRecieved id={this.props.match.params.id}/></Tab.Pane> },
    ]
    return (
      <Tab menu={{ pointing: true }} panes={panes} />
      );
  }
}

     

export default PersonnelDetails;
