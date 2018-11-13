import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import PersonnelByRoleFeedQuery from './queries/fetchPersonnelByRole';
import _ from 'lodash';
import { Query } from 'react-apollo'

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
        <Message.Header>No Personnel with that ID Found</Message.Header>
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
  
class PersonnelByRolesListing extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let id = this.props.match.params.id;
        console.log(this.props)
    
        return ( 
         <Query query={PersonnelByRoleFeedQuery} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) return <div>{loadingMessage}</div>;
                if (error) return <div>{timeoutMessage}</div>;
                if (_.isEmpty(data)) return <div>{emptyMessage}</div>;
                    console.log(data.personnelRole.personnels);
                    
                return(
                    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                     <Grid.Column style={{ maxWidth: 900 }}>
                  <Header as="h3" color="green" textAlign="center">
                    {data.personnelRole.roleName}
                            </Header>
                            <Table celled selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>National ID No.</Table.HeaderCell>
                                    <Table.HeaderCell>First Name</Table.HeaderCell>
                                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                                    <Table.HeaderCell>Phone Number </Table.HeaderCell>
                                    <Table.HeaderCell> Assigned Project </Table.HeaderCell>
                                    
                                </Table.Row>
                            </Table.Header>
                                <Table.Body>
                                    {data.personnelRole.personnels.map(person => (
                                       
                                        <Table.Row>
                                            <Table.Cell>
                                            <Link to={`/personnel/${person.id}`}>{person.idNumber}</Link>
                                            </Table.Cell>
                                            <Table.Cell>{person.firstName}</Table.Cell>
                                            <Table.Cell>{person.lastName}</Table.Cell> 
                                            <Table.Cell>{person.phoneNumber}</Table.Cell> 
                                            <Table.Cell>
                                                {( person.assignedToProject )
                                                    ? <Icon name="checkmark green"/>
                                                    : <Icon name="remove green"/>
                                                }
                                            </Table.Cell>
                                        </Table.Row>
                                     ))}
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                    <Table.HeaderCell colSpan="6">
                                        <Link to={'/personnel/new'}>
                                        <Icon name="add circle green right" size="huge" />
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
                        </Grid.Column>
                  </Grid>      
                );
            }}    
            </Query> 
          
         )
    }
}
 
export  default PersonnelByRolesListing;