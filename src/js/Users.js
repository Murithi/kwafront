import React, {Component} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { Link, Route } from 'react-router-dom';
import { Header, Table, Dropdown, Grid, Message, Segment, Icon, Menu, GridColumn, Checkbox } from 'semantic-ui-react';
import GET_USERS from './queries/fetchUsers';


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
        <Message.Header>No Users Found</Message.Header>
        <p>Add some new users to get started.</p>
        <Link to={'/users/register'} className="ui button primary">
          Add New User{' '}
        </Link>
      </Message.Content>
    </Message>
  );

const timeoutMessage = (
    <Message icon negative>
        <Icon name="wait" />
        <Message.Content>
            <Message.Header>Error Occured</Message.Header>
            Is the backend server running?
      </Message.Content>
    </Message>
);

var options = [
  { text: "Admin", value: 'ADMIN' },
  { text: "SuperUser", value: 'SUPERUSER' },
  { text: "Director", value: 'DIRECTOR' },
  { text: "Accountant", value: 'ACCOUNTANT' },
  { text: "User", value: 'USER' }
  
];
class Users extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      role:''
    };
  }

  _handleChange = (userId, data, e) => {
    let role = e.value;
   
   
    this._updateUserRole(userId, role);
    
  }
  render() {
  console.log(this.props.userFeed)
  if (this.props.userFeed.loading) return <React.Fragment>{loadingMessage} </React.Fragment>;
  if (this.props.userFeed.error) return <React.Fragment>{timeoutMessage} </React.Fragment>;
       
  if (_.isEmpty(this.props.userFeed.userFeed)) return <React.Fragment>{emptyMessage} </React.Fragment>;
  return (
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 900 }}>
        <Header as="h4" color="green" textAlign="center">
          System User Details
            </Header>
        <Segment>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell>First Name</Table.HeaderCell>
          <Table.HeaderCell>Last Name</Table.HeaderCell> */}
                <Table.HeaderCell>User Name </Table.HeaderCell>
                <Table.HeaderCell> Role</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell> Enabled</Table.HeaderCell>
                <Table.HeaderCell> Delete User</Table.HeaderCell>
                <Table.HeaderCell> Change User</Table.HeaderCell>                     
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.userFeed.userFeed.map(user => (
                <Table.Row>
                  {/* <Table.Cell>{user.firstName}</Table.Cell>   
                            <Table.Cell>{user.personnelDetails.lastName}</Table.Cell>   */}
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                  {user.role}
                    
                  </Table.Cell>
                  
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{(user.locked) ? <Icon name='checkmark ' color='green'/> : <Icon name="delete circle red" />}</Table.Cell>
                  <Table.Cell><Icon onClick={() => this._deleteUser(user.id)} name="delete circle red" /></Table.Cell>
                  <Table.Cell>
                    <Link to={`/users/${user.id}`} className="ui ">
                    <Icon name="angle double right" color='green'  />
                  </Link>
        </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="7">
           
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
                        
        </Segment>
      </Grid.Column>
    </Grid>
  )
 
}
  _deleteUser = async (id) => {
    await this.props.deleteUser({
      variables: { id }
    
    })
    this.props.userFeed.refetch();  
    this.props.history.push('/users/list');
  }

  _changeUser = async (id) => { 
    await this.props.changeUser({
      variables:{id}
    })
    this.props.userFeed.refetch();  
    this.props.history.push('/users/list');
  }

  _updateUserRole = async (id, role) => { 
    await this.props.updateUserRole({
      variables: {id, role}
    })
    this.props.userFeed.refetch();
    this.props.history.push('/users/list');
  }
  
}

const DELETEUSERMUTATION = gql`
  mutation deleteUser($id:ID){
    deleteUser(id:$id){
      id
      
    }
  }
`

const CHANGEUSERMUTATION = gql`
  mutation changeUser($id:ID){
    changeUser(id:$id){
      id
      authorized
      locked
    }
  }
`

const UPDATEUSERROLEMUTATION = gql`
  mutation updateUserRole($id:ID!, $role:String!){
    updateUserRole(id:$id, role:$role){
      id
      role
      authorized
      locked
    }
  }
`;
export default compose(
  graphql(GET_USERS, { name: 'userFeed' }),
  graphql(DELETEUSERMUTATION, { name: 'deleteUser' }),
  graphql(CHANGEUSERMUTATION, { name: 'changeUser' }),
  graphql(UPDATEUSERROLEMUTATION, {name:'updateUserRole'})
) (Users);