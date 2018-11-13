import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash'
import moment from 'moment';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Form, Table, Grid, Message, Icon, Menu, Input,  Divider, Image, Segment } from 'semantic-ui-react';

import Personnel_Feed_Query from './queries/fetchSearchPersonnel';

class TerminationSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            personnel:[]
        }
    }
    render() { 
        

        return (
        <div>
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
        {
            (this.state.personnel.length > 0)
                ? <div>
                        <Table celled selectable >
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>National ID No.</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Designation </Table.HeaderCell>
                            <Table.HeaderCell>Date of Termination</Table.HeaderCell>
                           
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.personnel.map(person => (
                            <Table.Row>
                                <Table.Cell>
                                <Link to={`/personnel/terminate/${person.id}`}>{person.idNumber}</Link>
                                </Table.Cell>
                                <Table.Cell>{person.firstName}</Table.Cell>
                                <Table.Cell>{person.lastName}</Table.Cell>
                                <Table.Cell>{person.designation}</Table.Cell>
                                <Table.Cell>{person.dateOfTermination}</Table.Cell>                                
                            </Table.Row>
                            ))}
                                        </Table.Body> 
                        </Table>              
                    </div>
                : <div></div>
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
        const personnel = result.data.personnelFeed.personnel
        this.setState({ personnel })
    }
}
 
export default withApollo(TerminationSearch);