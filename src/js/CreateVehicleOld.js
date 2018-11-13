import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Dropdown } from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import { Form, Segment, Grid, Header, Message } from 'semantic-ui-react';
const options = [
  { id: 'cjf7ceyetbv7509252nkkoa6r', text: 'Kewa East Africa', value: 'Kewa East Africa' },
  { id: 'cjf80daoysywq0925tsclayt1', text: 'County Engineering', value: 'County Engineering' }
];
class CreateVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationNumber: '',
      logBookNumber: '',
      model: '',
      fuelType: '',
      insuredValue: '',
      insuranceRenewalDate: moment(),
      manufactureDate: moment(),
      errors: {},
      loading: false
    };
  }

  handleChange = date => {
    this.setState({ manufactureDate: date });
  };

  handleInsuranceChange = date => {
    this.setState({ insuranceRenewalDate: date });
  };

  setValue = (e, data) => {
    this.setState({ value: data });
  };

  validate = () => {
    const errors = {};
    if (!this.state.registrationNumber) errors.registrationNumber = "Can't be blank";
    if (!this.state.logBookNumber) errors.logBookNumber = "Can't be blank";
    if (!this.state.model) errors.model = "Can't be blank";
    if (!this.state.fuelType) errors.fuelType = "Can't be blank";
    if (!this.state.insuredValue) errors.insuredValue = "Can't be blank";
    if (!this.state.insuranceRenewalDate) errors.insuranceRenewalDate = "Can't be blank";
    if (!this.state.manufactureDate) errors.manufactureDate = "Can't be blank";
    if (!this.state.value) errors.ownerId = 'Cant be blank';

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this._createVehicle();
    }

    return errors;
  };

  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
  };
  render() {
    const { errors, loading } = this.state;
    return (
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h4" color="green" textAlign="center">
            Create Vehicle
          </Header>
          <Form size="large" onSubmit={this.onSubmit} loading={loading}>
            {errors.global && (
              <Message negative>
                <Message.Header> Something went wrong </Message.Header>
                <p>{errors.global}</p>
              </Message>
            )}
            <Segment stacked>
              <Form.Field error={!!errors.registrationNumber}>
                <label>Registration Number</label>
                <input
                  placeholder="KCA 971H"
                  value={this.state.registrationNumber}
                  onChange={e => this.setState({ registrationNumber: e.target.value })}
                />
                {errors.registrationNumber && <InlineError text={errors.registrationNumber} />}
              </Form.Field>

              <Form.Field error={!!errors.logBookNumber}>
                <label>Log Book Number</label>
                <input
                  placeholder="LKHOIN0987687"
                  value={this.state.logBookNumber}
                  onChange={e => this.setState({ logBookNumber: e.target.value })}
                />
                {errors.logBookNumber && <InlineError text={errors.logBookNumber} />}
              </Form.Field>
              <Form.Field error={!!errors.model}>
                <label>Model</label>
                <input
                  placeholder="Toyota Prado V8"
                  value={this.state.model}
                  onChange={e => this.setState({ model: e.target.value })}
                />
                {errors.model && <InlineError text={errors.model} />}
              </Form.Field>
              <Form.Field error={!!errors.fuelType}>
                <label>Type of Fuel</label>
                <input
                  placeholder="Diesel"
                  value={this.state.fuelType}
                  onChange={e => this.setState({ fuelType: e.target.value })}
                />
                {errors.fuelType && <InlineError text={errors.fuelType} />}
              </Form.Field>
              <Form.Field error={!!errors.insuredValue}>
                <label>Last Insurance Valuation(KES)</label>
                <input
                  placeholder="1000000"
                  value={this.state.insuredValue}
                  onChange={e => this.setState({ insuredValue: e.target.value })}
                />
                {errors.insuredValue && <InlineError text={errors.insuredValue} />}
              </Form.Field>
              <Form.Field error={!!errors.insuranceRenewalDate}>
                <label>Insurance Renewal Date</label>{' '}
                <DatePicker selected={this.state.insuranceRenewalDate} onChange={this.handleInsuranceChange} />
              </Form.Field>
              <Form.Field error={!!errors.manufactureDate}>
                <label>Manufacture Date</label>
                <DatePicker selected={this.state.manufactureDate} onChange={this.handleChange} />
                {errors.manufactureDate && <InlineError text={errors.manufactureDate} />}
              </Form.Field>
              <Form.Field error={!!errors.ownerId}>
                <label>Vehicle Owner</label>
                <Dropdown
                  value={this.state.ownerId}
                  search
                  selection
                  options={options}
                  onChange={this.setValue.bind(this)}
                />
                {errors.ownerId && <InlineError text={errors.ownerId} />}
              </Form.Field>

              <Form.Button>Submit</Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
  _createVehicle = async () => {
    const {
      registrationNumber,
      logBookNumber,
      model,
      fuelType,
      insuredValue,
      insuranceRenewalDate,
      manufactureDate,
      value
    } = this.state;
    const result = options.find(owner => owner.value === value.value);
    const ownerId = result.id;
    let insuranceValuation = parseInt(insuredValue);
    await this.props.createVehicle({
      variables: {
        registrationNumber,
        logBookNumber,
        model,
        fuelType,
        insuranceValuation,
        insuranceRenewalDate,
        manufactureDate,
        ownerId
      }
    });
    this.props.history.push(`/vehicle/list`);
  };
}

const CREATEVEHICLEMUTATION = gql`
  mutation createVehicle(
    $registrationNumber: String!
    $logBookNumber: String!
    $model: String!
    $fuelType: String!
    $insuranceValuation: Int
    $insuranceRenewalDate: DateTime
    $manufactureDate: DateTime
    $ownerId: String!
  ) {
    addVehicle(
      registrationNumber: $registrationNumber
      logBookNumber: $logBookNumber
      model: $model
      fuelType: $fuelType
      insuranceValuation: $insuranceValuation
      insuranceRenewalDate: $insuranceRenewalDate
      manufactureDate: $manufactureDate
      ownerId: $ownerId
    ) {
      id
      registrationNumber
      logBookNumber
      model
      fuelType
      insuranceValuation
      insuranceRenewalDate
      manufactureDate
    }
  }
`;
export default graphql(CREATEVEHICLEMUTATION, { name: 'createVehicle' })(withRouter(CreateVehicle));
