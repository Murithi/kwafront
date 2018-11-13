import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import {
  Header,
  Grid,
  Message,
  Button,
  Icon,
  Divider,
  Segment
} from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import gql from "graphql-tag";
import _ from "lodash";

import InitiatedRequisitionsQuery from "./queries/fetchFuelRequestsInitiated";
import getFuelRequisition from "./queries/fetchFuelRequestById";
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

class FuelRequestsApprove extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleApprovalDateChange = date => {
    this.setState({ approvalDate: date });
  };
  render() {
    const { loading } = this.state;

    if (this.props.fuelRequest.loading) {
      return <div>{loadingMessage}</div>;
    } else if (this.props.fuelRequest.error) {
      console.log(this.props.fuelRequest);
      return <div>{timeoutMessage}</div>;
    } else {
      const { initiatedFuelRequisition } = this.props.fuelRequest;
      if (!initiatedFuelRequisition) {
        return <div>{emptyMessage}</div>;
      }
      return (
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 900 }}>
            <Header as="h4" color="green" textAlign="center">
              Fuel Request Details
            </Header>
            <Segment.Group horizontal>
              <Segment>
                <p>
                  <b>Vehicle Registration:</b>{" "}
                  {
                    initiatedFuelRequisition.vehicleToBeFueled
                      .registrationNumber
                  }
                </p>
                <Divider />
                <p>
                  <b>Approx Cost of Service:</b>{" "}
                  {initiatedFuelRequisition.approxCostOfFuel}
                </p>
                <Divider />
                <p>
                  <b>Other Details:</b> {initiatedFuelRequisition.otherDetails}
                </p>
                <Divider />
                <p>
                  <b>Requested By:</b>{" "}
                  {
                    initiatedFuelRequisition.requestedBy.personnelDetails
                      .firstName
                  }{" "}
                  &nbsp;{" "}
                  {
                    initiatedFuelRequisition.requestedBy.personnelDetails
                      .lastName
                  }
                </p>
                <Divider />
                <p>
                  <b>Requested On:</b>{" "}
                  {moment(initiatedFuelRequisition.requestDate).format(
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
                <hr />
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
    }
  }

  _approveRequest = async approvalStatus => {
    const fuelRequisitionId = this.props.match.params.id;
    if (!this.state.approvalDate) {
      var approvalDate = moment().format();
    } else {
      var approvalDate = this.state.approvalDate;
    }

    await this.props.approveFuelRequest({
      variables: { fuelRequisitionId, approvalDate, approvalStatus },
      refetchQueries: [
        { query: getUserDetails },
        { query: InitiatedRequisitionsQuery }
      ]
    });
    this.props.history.push("/fuelrequisitions/initiated");
  };
}

const APPROVEMUTATION = gql`
  mutation approveFuelRequest(
    $approvalStatus: Boolean
    $fuelRequisitionId: ID!
    $approvalDate: String!
  ) {
    approveFuelRequistion(
      fuelRequisitionId: $fuelRequisitionId
      approvalDate: $approvalDate
      approvalStatus: $approvalStatus
    )
  }
`;
export default compose(
  graphql(getFuelRequisition, {
    name: "fuelRequest",
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  }),
  graphql(APPROVEMUTATION, {
    name: "approveFuelRequest"
  }),
  graphql(getUserDetails, {
    name: "userDetails"
  })
)(FuelRequestsApprove);
