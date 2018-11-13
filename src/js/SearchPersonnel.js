import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash'
import moment from 'moment';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Form, Table, Grid, Message, Icon, Menu, Input,  Divider, Image, Segment } from 'semantic-ui-react';

import Personnel_Feed_Query from './queries/fetchSearchPersonnel';

class SearchPersonnel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            personnel:[]
        }
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
                <Message.Header>No Terminations Found</Message.Header>
                <p>Add some new terminations to get started.</p>
                <Link to={'/personnel/termination/new'} className="ui button primary">
                  Add New Termination{' '}
                </Link>
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
            <div>
           <b> Search Employee by National ID Number</b>
            <Divider/>        
        <Form onSubmit={()=>this._executeSearch()}>
            <Form.Group unstackable widths={2}>
                <Form.Input 
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...'                    
                    onChange={e => { this.setState({ filter: e.target.value }); }}
                />                   
                <Form.Button positive secondary big right >Submit</Form.Button>
            </Form.Group>
                </Form> 
        <Divider/>        
        {
            (this.state.personnel.length !== 0)
                ? <div>
                        <Table celled selectable >
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>National ID No.</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Designation </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            
                            <Table.Row>
                                <Table.Cell>
                                <Link to={`/personnel/${this.state.personnel.id}`}>{this.state.personnel.idNumber}</Link>
                                </Table.Cell>
                                <Table.Cell>{this.state.personnel.firstName}</Table.Cell>
                                <Table.Cell>{this.state.personnel.lastName}</Table.Cell>
                                <Table.Cell>{this.state.personnel.designation.roleName}</Table.Cell>
                                
                            </Table.Row>
                            
                                        </Table.Body> 
                        </Table>              
                    </div>
                : <div>Nothing Found</div>
        } 
        </div>
            
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
        this.setState({ personnel: personnel });
    }
}
 
export default withApollo(SearchPersonnel);