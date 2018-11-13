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
import InitiatedRequisitionsQuery from "./queries/fetchFuelRequestsInitiated";

var vehicleOptions = [];

class FuelRequestCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherDetails: "",
      approxCostOfFuel: "",
      vehicleToBeFueled: "",
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
        this.setState({ vehicleToBeFueled: element.id });
        this.setState({ vehicleValue: element.Value });
      }
    });
  };
  validate = () => {
    const errors = {};

    if (!this.state.vehicleToBeFueled)
      errors.vehicleToBeFueled = "Can't be blank";
    if (!this.state.approxCostOfFuel)
      errors.approxCostOfFuel = "Can't be blank";
    if (!this.state.otherDetails) errors.otherDetails = "Can't be blank";
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this._createFuelRequest();
    }
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
            Create Inspection Requisition
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
              <Form.Field error={!!errors.vehicleToBeFueled}>
                <label>Vehicle Registration Number</label>
                <Dropdown
                  value={this.state.vehicleValue}
                  search
                  selection
                  options={vehicleOptions}
                  onChange={this.setVehicleValue.bind(this)}
                />
                {errors.vehicleToBeFueled && (
                  <InlineError text={errors.vehicleToBeFueled} />
                )}
              </Form.Field>
              <Form.Field error={!!errors.approxCostOfFuel}>
                <label>Approximate Cost</label>
                <input
                  placeholder="0000"
                  value={this.state.approxCostOfFuel}
                  type="number"
                  onChange={e =>
                    this.setState({ approxCostOfFuel: e.target.value })
                  }
                />
                {errors.approxCostOfFuel && (
                  <InlineError text={errors.approxCostOfFuel} />
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
  _createFuelRequest = async () => {
    const { otherDetails, approxCostOfFuel, vehicleToBeFueled } = this.state;
    if (!this.state.requestDate) {
      var requestDate = moment().format();
    } else {
      var requestDate = this.state.requestDate;
    }
    await this.props.createFuelRequest({
      variables: {
        otherDetails,
        approxCostOfFuel,
        vehicleToBeFueled,
        requestDate
      },
      refetchQueries: [{ query: InitiatedRequisitionsQuery }]
    });
    this.props.history.push("/fuelrequisitions/initiated");
  };
}

const CREATEFUELMUTATION = gql`
  mutation createFuelRequest(
    $otherDetails: String!
    $vehicleToBeFueled: ID!
    $approxCostOfFuel: Int!
    $requestDate: String!
  ) {
    addFuelRequisition(
      otherDetails: $otherDetails
      approxCostOfFuel: $approxCostOfFuel
      vehicleId: $vehicleToBeFueled
      requestDate: $requestDate
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
  graphql(VEHICLEFEEDQUERY, {
    name: "vehicleFeed"
  }),
  graphql(CREATEFUELMUTATION, {
    name: "createFuelRequest"
  })
)(FuelRequestCreate);
