import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Header, Table,  Message, Icon, Menu } from 'semantic-ui-react';
import SectionFeedQuery from './queries/fetchSections';

class SectionsList extends Component {
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
                <Message.Header>No Sections Found</Message.Header>
                <p>Add some new sections to get started.</p>
                <Link to={'/sections/new'} className="ui button primary">
                  Add New Section{' '}
                </Link>
              </Message.Content>
            </Message>
          );
      
        const timeoutMessage = (
            <Message icon negative>
                <Icon name="wait" />
                <Message.Content>
                    <Message.Header>{this.props.sectionFeed.errorl}</Message.Header>
                    Is the backend server running?
              </Message.Content>
            </Message>
        );
        if (this.props.sectionFeed && this.props.sectionFeed.loading) {
            return <div>{loadingMessage}</div>;
          }
      
          if (this.props.sectionFeed && this.props.sectionFeed.error) {
            return <div>{timeoutMessage}</div>;
          }
      
          if (this.props.sectionFeed.sectionFeed.length === 0) {
            return <div>{emptyMessage}</div>;
          }
        return (
            
            <React.Fragment>
                <Header as="h4" color="green" textAlign="center">
                    Section List
                </Header>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Section Name</Table.HeaderCell>
                        <Table.HeaderCell> Project</Table.HeaderCell>
                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                        <Table.HeaderCell>Completion Date </Table.HeaderCell>
                        <Table.HeaderCell> Edit</Table.HeaderCell>    
                        <Table.HeaderCell> Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.props.sectionFeed.sectionFeed.map(section => (
                    <Table.Row>
                        <Table.Cell>                                    
                        <Link to={`/section/${section.id}`}>{section.sectionName}</Link>            
                        </Table.Cell>
                        <Table.Cell>{section.sectionProject.projectName}</Table.Cell>
                                <Table.Cell>
                                    
                                    {moment(section.sectionStartDate).format('MMM Do YYYY')}
                                </Table.Cell>
                                <Table.Cell>
                                    
                                    {moment(section.sectionCompletionDate).format('MMM Do YYYY')}
                                </Table.Cell>
                        <Table.Cell>
                        <Link to={`/section/edit/${section.id}`}>
                            <Icon name="edit circle green " />
                        </Link>
                        </Table.Cell>
                        <Table.Cell>
                        <Icon onClick={() => this._deleteSection(section.id)} name="delete circle red" />
                        </Table.Cell>
                    </Table.Row>
                    ))}
                    </Table.Body>
                    <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Link to={'/section/new'}>
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
            </React.Fragment>
        );
    }

    _deleteSection = async id => { 
        await this.props.deleteSection({
            variable: { id }
        });
        this.props.sectionFeed.refetch();
        this.props.history.push('/sections/list');
    }
}

const DELETESECTIONMUTATION = gql`
    mutation deleteSection($id:ID!){
        removeSection(id:$id){
            id
            }
    }
`;
export default compose(
    graphql(SectionFeedQuery, { name: 'sectionFeed' }),
    graphql(DELETESECTIONMUTATION, {name:'deleteSection'}),
)(SectionsList);