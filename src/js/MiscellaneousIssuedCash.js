import React, { Component } from 'react';
import { Header, Table, Message, Icon, Menu } from 'semantic-ui-react';
import moment from 'moment';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import getUserDetails from './queries/getUserDetails';
import getIssuedRequisitions from './queries/fetchMiscellaneousRequestsIssued';

class MiscellaneousIssuedCash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
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
          <Message.Header>No Requisitions Found</Message.Header>
          <p>Add some new requisitions to get started.</p>
        </Message.Content>
      </Message>
    );

    const timeoutMessage = (
      <Message icon negative>
        <Icon name="wait" />
        <Message.Content>
          <Message.Header>{this.props.requisitionFeed.errorl}</Message.Header>
          Is the backend server running?
        </Message.Content>
      </Message>
    );
    if (this.props.requisitionFeed && this.props.requisitionFeed.loading) {
      return <div>{loadingMessage}</div>;
    }

    if (this.props.requisitionFeed && this.props.requisitionFeed.error) {
      return <div>{timeoutMessage}</div>;
    }

    if (
      this.props.requisitionFeed.issuedMiscellaneousRequisitionsFeed === undefined ||
      this.props.requisitionFeed.issuedMiscellaneousRequisitionsFeed === 0
    ) {
      return <div>{emptyMessage}</div>;
    }
    return (
      <React.Fragment>
        <Header as="h4" color="green" textAlign="center">
          Issued Miscellaneous List
        </Header>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Requested Amount </Table.HeaderCell>
              <Table.HeaderCell> Request Date</Table.HeaderCell>
              <Table.HeaderCell>Requested By</Table.HeaderCell>
              <Table.HeaderCell>Other Details </Table.HeaderCell>

              <Table.HeaderCell> Date Approved</Table.HeaderCell>
              <Table.HeaderCell> Approval Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body />
          {this.props.requisitionFeed.issuedMiscellaneousRequisitionsFeed.map(request => {
            console.log(request.cashPaymentsDetails.amountCharged);
            if (request.issuedCash === true && request.cashPaymentsDetails.amountCharged === null) {
              return (
                <Table.Row>
                  <Table.Cell>{request.amountRequested}</Table.Cell>
                  <Table.Cell>{moment(request.requestDate).format('MMM Do YYYY')}</Table.Cell>

                  <Table.Cell>
                    {request.requestedBy.personnelDetails.firstName} {request.requestedBy.personnelDetails.lastName}
                  </Table.Cell>
                  <Table.Cell>{request.otherDetails}</Table.Cell>
                  <Table.Cell>{moment(request.approvalDate).format('MMM Do YYYY')}</Table.Cell>
                  <Table.Cell>
                    {(() => {
                      if (this.props.userDetails.me.role === 'ACCOUNTANT') {
                        return (
                          <Link to={`/miscellaneous/report/${request.id}`}>
                            Report Cash Usage
                            <Icon name="angle double right" color="green" />
                          </Link>
                        );
                      } else {
                        return <Icon name="checkmark " color="green" />;
                      }
                    })()}
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Link to={'/inspectionrequisitions/new'}>
                  <Icon name="add circle green " size="huge" />
                </Link>

                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" color="green" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" color="green" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(getIssuedRequisitions, { name: 'requisitionFeed' }),
  graphql(getUserDetails, { name: 'userDetails' })
)(MiscellaneousIssuedCash);
