import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash'
import moment from 'moment';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Form, Table, Dropdown, Checkbox, Radio, Grid, Message, Icon, Menu, Input,  Divider, Image, Segment } from 'semantic-ui-react';
import updatePersonnel from './graphqlCache/updatePersonnel';
import Personnel_Feed_Query from './queries/fetchSearchPersonnel';

class SearchPersonnelAssign extends Component {
    constructor(props) {
        super(props);

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
           <b> Search Employee by National ID Number</b>
            <Divider/>        
        <Form onSubmit={()=>this._executeSearch()}>
            <Form.Group unstackable widths={2}>
                <Form.Input 
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...'                    
                    onChange={e => { this.setState({ filter: e.target.value }); }}
                />                   
                <Form.Button positive secondary big  >Submit</Form.Button>
            </Form.Group>
                </Form> 
        <Divider/>        
        
                    
        </React.Fragment>
            
        )
    }
    _executeSearch = async () => { 
        const { filter } = this.state
        const result = await this.props.client.query({
          query: Personnel_Feed_Query,
          variables: { filter },
        })
        console.log(result.data.personnelFeed[0]);
        const personnel = result.data.personnelFeed[0];
        const { updatePersonnel } = this.props;
        const firstName = personnel.firstName;
        const lastName = personnel.lastName;
        const personnelID = personnel.id;
        const photoUrl = personnel.photoUrl;
        let assignedAccount = false;
         if (personnel.assignedAccount) {
            assignedAccount= true;
        }
           
        this._updatePersonnel('firstName', firstName);
        this._updatePersonnel('lastName', lastName);
        this._updatePersonnel('personnelID', personnelID);
        this._updatePersonnel('photoUrl', photoUrl);
        this._updatePersonnel('assignedAccount', assignedAccount);
            
      
    }

    _updatePersonnel = async (index, value) => { 

        const result = await this.props.updatePersonnel({
            variables: {
                index: index,
                value: value
            }
        }
        );
    }
}
 
export default compose(
    graphql(updatePersonnel, {name:"updatePersonnel"})
)(withApollo(SearchPersonnelAssign));