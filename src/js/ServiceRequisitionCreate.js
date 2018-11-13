import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  Form,
  Segment,
  Grid,
  Header,
  TextArea,
  Message,
  Dropdown,
  Divider,
  Image
} from "semantic-ui-react";
import InlineError from "./messages/InlineError";
import InitiatedRequisitionsQuery from "./queries/fetchServiceRequisitionByUser";
import getUserDetails from "./queries/getUserDetails";

var vehicleOptions = [];
class ServiceRequisitionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleToBeServicedId: "",
      approxCostOFService: "",
      otherDetails: "",
      errors: {},
      loading: false
    };
  }
  handleRequestDateChange = date => {
    this.setState({ requestDate: date });
  };
  setVehicleValue = (e, data) => {
    vehicleOptions.forEach(element => {
      if (element.value === data.value) {
        this.setState({ vehicleToBeServicedId: element.id });
        this.setState({ vehicleValue: element.Value });
      }
    });
  };
  validate = () => {
    const errors = {};

    if (!this.state.vehicleToBeServicedId)
      errors.vehicleToBeServicedId = "Can't be blank";
    if (!this.state.approxCostOFService)
      errors.approxCostOFService = "Can't be blank";
    if (!this.state.otherDetails) errors.otherDetails = "Can't be blank";
    if (!this.state.requestDate) errors.requestDate = "Can't be blank";
    this.setState({ loading: true });
    this._createServiceRequisition();
    return errors;
  };
  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
  };

  render() {
    const { errors, loading } = this.state;

    if (this.props.vehicleFeed.loading === false) {
      let tempOp = this.props.vehicleFeed.vehicleFeed;
      vehicleOptions = [];
      tempOp.map(element => {
        vehicleOptions.push({
          id: element.id,
          text: element.registrationNumber,
          value: element.registrationNumber
        });
      });
    }
    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h2" color="green" textAlign="center">
            Create Service Requisition
          </Header>
          <Divider />
          <Form size="large" onSubmit={this.onSubmit} loading={loading}>
            {errors.global && (
              <Message negative>
                <Message.Header> Something went wrong </Message.Header>
                <p>{errors.global}</p>
              </Message>
            )}
            <Segment stacked>
              <Form.Field error={!!errors.vehicleValue}>
                <label>Vehicle Registration Number</label>
                <Dropdown
                  value={this.state.vehicleValue}
                  search
                  selection
                  options={vehicleOptions}
                  onChange={this.setVehicleValue.bind(this)}
                />
                {errors.vehicleValue && (
                  <InlineError text={errors.vehicleValue} />
                )}
              </Form.Field>
              <Form.Field error={!!errors.approxCostOFService}>
                <label>Approximate Cost</label>
                <input
                  placeholder="0000"
                  value={this.state.approxCostOFService}
                  type="number"
                  onChange={e =>
                    this.setState({ approxCostOFService: e.target.value })
                  }
                />
                {errors.approxCostOFService && (
                  <InlineError text={errors.approxCostOFService} />
                )}
              </Form.Field>
              <Form.Field error={!!errors.otherDetails}>
                <label>Other Details</label>
                <TextArea
                  autoHeight
                  value={this.state.otherDetails}
                  rows={2}
                  onChange={e =>
                    this.setState({ otherDetails: e.target.value })
                  }
                />

                {errors.otherDetails && (
                  <InlineError text={errors.otherDetails} />
                )}
              </Form.Field>
              <Form.Field error={!!errors.requestDate}>
                <label>Request Date</label>{" "}
                <DatePicker
                  selected={this.state.requestDate}
                  onChange={this.handleRequestDateChange}
                />
              </Form.Field>
              <Form.Button fluid positive>
                Submit
              </Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
  _createServiceRequisition = async () => {
    const {
      vehicleToBeServicedId,
      approxCostOFService,
      otherDetails
    } = this.state;

    if (!this.state.requestDate) {
      var requestDate = moment().format();
    } else {
      var requestDate = this.state.requestDate;
    }

    await this.props.createServiceRequisition({
      variables: {
        vehicleId: vehicleToBeServicedId,
        approxCostOFService,
        otherDetails,
        requestDate
      },

      refetchQueries: [
        { query: getUserDetails },
        { query: InitiatedRequisitionsQuery }
      ]
    });
    this.props.history.push("/servicerequisitions/initiated");
  };
}

const CREATESERVICEREQUISITIONMUTATION = gql`
  mutation createServiceRequistion(
    $otherDetails: String!
    $vehicleId: ID!
    $approxCostOFService: Int!
    $requestDate: String
  ) {
    addRequestService(
      requestDate: $requestDate
      vehicleId: $vehicleId
      approxCostOFService: $approxCostOFService
      otherDetails: $otherDetails
    )
  }
`;

const VEHICLEFEEDQUERY = gql`
  query getVehicles {
    vehicleFeed {
      id
      registrationNumber
    }
  }
`;
export default compose(
  graphql(VEHICLEFEEDQUERY, { name: "vehicleFeed" }),
  graphql(CREATESERVICEREQUISITIONMUTATION, {
    name: "createServiceRequisition"
  })
)(ServiceRequisitionCreate);
