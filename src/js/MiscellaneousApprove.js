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
import gql from "graphql-tag";
import DatePicker from "react-datepicker";
import _ from "lodash";

import InitiatedRequisitionsQuery from "./queries/fetchMiscellaneousRequestsInitiated";
import getMiscellaneousRequisition from "./queries/fetchMiscellaneousRequestById";
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

class MiscellaneousApprove extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleApprovalDateChange = date => {
    this.setState({ approvalDate: date });
  };
  render() {
    if (this.props.miscellaneousRequest.loading) {
      return <div>{loadingMessage}</div>;
    }
    if (this.props.miscellaneousRequest.loading) {
      return <div>{timeoutMessage}</div>;
    }
    const {
      initiatedMiscellaneousRequisition
    } = this.props.miscellaneousRequest;
    if (initiatedMiscellaneousRequisition.length === 0) {
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
            Inspection Request Details
          </Header>
          <Segment.Group horizontal>
            <Segment>
              <p>
                <b>Requested On:</b>{" "}
                {moment(initiatedMiscellaneousRequisition.requestDate).format(
                  "MMM Do YYYY"
                )}
              </p>
              <Divider />
              <p>
                <b>Other Details:</b>{" "}
                {initiatedMiscellaneousRequisition.otherDetails}
              </p>
              <Divider />
              <p>
                <b>Requested By:</b>{" "}
                {
                  initiatedMiscellaneousRequisition.requestedBy.personnelDetails
                    .firstName
                }{" "}
                &nbsp;{" "}
                {
                  initiatedMiscellaneousRequisition.requestedBy.personnelDetails
                    .lastName
                }
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
  }
  _approveRequest = async approvalStatus => {
    const miscellaneousrequisitionId = this.props.match.params.id;
    if (!this.state.approvalDate) {
      var approvalDate = moment().format();
    } else {
      var approvalDate = this.state.approvalDate;
    }

    await this.props.approveRequest({
      variables: { miscellaneousrequisitionId, approvalDate, approvalStatus },
      refetchQueries: [
        { query: getUserDetails },
        { query: InitiatedRequisitionsQuery }
      ]
    });
    this.props.history.push("/miscellaneous/initiated");
  };
}
const APPROVEMUTATION = gql`
  mutation approveMiscellaneous(
    $approvalStatus: Boolean
    $miscellaneousrequisitionId: ID
    $approvalDate: String
  ) {
    approveMiscellaneousRequest(
      miscellaneousrequisitionId: $miscellaneousrequisitionId
      approvalDate: $approvalDate
      approvalStatus: $approvalStatus
    )
  }
`;
export default compose(
  graphql(getMiscellaneousRequisition, {
    name: "miscellaneousRequest",
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  }),
  graphql(APPROVEMUTATION, {
    name: "approveRequest"
  })
)(MiscellaneousApprove);
