import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  Header,
  Table,
  Grid,
  Message,
  Button,
  Icon,
  Menu,
  Divider,
  Form,
  Segment,
  Checkbox
} from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import gql from "graphql-tag";
import _ from "lodash";
import { Link, Route } from "react-router-dom";
import { Query } from "react-apollo";

import getRepairsRequisition from "./queries/fetchRepairsRequisitionByID";
import approveRepairsRequisition from "./mutations/approveRepairsRequisition";
import InitiatedRequisitionsQuery from "./queries/fetchRepairsRequisitionByUser";
import getUserDetails from "./queries/getUserDetails";

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
      <Message.Header>No Request with that ID Found</Message.Header>
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
class RepairsRequisitionsApprove extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleApprovalDateChange = date => {
    this.setState({ approvalDate: date });
  };
  render() {
    let id = this.props.match.params.id;
    return (
      <Query query={getRepairsRequisition} variables={{ id }}>
        {({ loading, error, data: { initiatedRepairsRequisition } }) => {
          if (loading) return <div>{loadingMessage}</div>;
          if (error) return <div>{timeoutMessage}</div>;
          if (_.isEmpty(initiatedRepairsRequisition))
            return <div>{emptyMessage}</div>;

          return (
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 900 }}>
                <Header as="h4" color="green" textAlign="center">
                  Approve Repair Request
                </Header>
                <Segment.Group horizontal>
                  <Segment>
                    <p>
                      <b>Vehicle Registration:</b>{" "}
                      {
                        initiatedRepairsRequisition.vehicleToBeRepaired
                          .registrationNumber
                      }
                    </p>
                    <Divider />
                    <p>
                      <b>Approx Cost of Service:</b>{" "}
                      {initiatedRepairsRequisition.approxCostOfRepair}
                    </p>
                    <Divider />
                    <p>
                      <b>Other Details:</b>{" "}
                      {initiatedRepairsRequisition.otherDetails}
                    </p>
                    <Divider />
                    <p>
                      <b>Requested By:</b>{" "}
                      {
                        initiatedRepairsRequisition.requestedBy.personnelDetails
                          .firstName
                      }{" "}
                      &nbsp;{" "}
                      {
                        initiatedRepairsRequisition.requestedBy.personnelDetails
                          .lastName
                      }
                    </p>
                    <Divider />
                    <p>
                      <b>Requested On:</b>{" "}
                      {moment(initiatedRepairsRequisition.requestDate).format(
                        "MMM Do YYYY"
                      )}
                    </p>
                    <Divider />
                    <p>
                      <b>Approved On:</b>{" "}
                      <DatePicker
                        selected={this.state.approvalDate}
                        onChange={this.handleApprovalDateChange}
                      />
                    </p>
                    <Divider />
                    <Button
                      attached="bottom"
                      positive
                      onClick={() => this._approveRequest(true)}
                    >
                      <Icon name="check" />
                      Approve
                    </Button>
                    <hr />
                    <Button
                      attached="bottom"
                      color="red"
                      onClick={() => this._approveRequest(false)}
                    >
                      <Icon name="remove" />
                      Decline
                    </Button>
                  </Segment>
                </Segment.Group>
                <Divider />
              </Grid.Column>
            </Grid>
          );
        }}
      </Query>
    );
  }

  _approveRequest = async approvalStatus => {
    const repairrequisitionId = this.props.match.params.id;
    if (!this.state.approvalDate) {
      var approvalDate = moment().format();
    } else {
      var approvalDate = this.state.approvalDate;
    }
    await this.props.approveRepairsRequisition({
      variables: { repairrequisitionId, approvalDate, approvalStatus },
      refetchQueries: [
        { query: getUserDetails },
        { query: InitiatedRequisitionsQuery }
      ]
    });
    this.props.history.push("/repairsrequisitions/initiated");
  };
}

export default graphql(approveRepairsRequisition, {
  name: "approveRepairsRequisition"
})(RepairsRequisitionsApprove);
