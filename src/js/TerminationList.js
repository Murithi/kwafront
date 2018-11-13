import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';

import Termination_Feed_Query from './queries/fetchTermination';

class TerminationList extends Component {
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
                <Message.Header>{this.props.terminationFeed.errorl}</Message.Header>
                Is the backend server running?
              </Message.Content>
            </Message>
          );
          if (this.props.terminationFeed && this.props.terminationFeed.loading) {
            return <div>{loadingMessage}</div>;
          }
      
          if (this.props.terminationFeed && this.props.terminationFeed.error) {
            return <div>{timeoutMessage}</div>;
          }
      
          if (this.props.terminationFeed.terminationFeed.length === 0) {
            return <div>{emptyMessage}</div>;
          }
      return (
        <div>
          <Header as="h4" color="green" textAlign="center">
            Personnel List
          </Header>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>National ID No.</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Designation </Table.HeaderCell>
                
                
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {this.props.terminationFeed.terminationFeed.map(person => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/personnel/termination/${person.id}`}>{person.idNumber}</Link>
                </Table.Cell>
                <Table.Cell>{person.firstName}</Table.Cell>
                <Table.Cell>{person.lastName}</Table.Cell>
                <Table.Cell>{person.designation}</Table.Cell>
                <Table.Cell>
                  <Link to={`/personnel/termination/edit/${person.id}`}>
                    <Icon name="edit circle green " />
                  </Link>
                </Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Link to={'/personnel/termination/new'}>
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
            </div> 
            )
}
}
 
export default graphql(Termination_Feed_Query, { name: 'terminationFeed' })(TerminationList);