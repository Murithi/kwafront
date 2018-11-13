import React, { Component } from 'react';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import { graphql } from 'react-apollo';
import moment from 'moment';
import { Form, Segment, Grid, Header, TextArea, Message, Dropdown, Divider, Image } from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import getUserDetails from './queries/getUserDetails';
import InitiatedRequisitionsQuery from './queries/fetchMiscellaneousRequestsInitiated';

class MiscellaneousCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miscelType: '',
      amountRequested: '',
      otherDetails: '',
      errors: {},
      loading: false
    };
  }
  handleRequestDateChange = date => {
    this.setState({ requestDate: date });
  };
  setMiscelType = (e, data) => {
    this.setState({ miscelType: data.value });
  };
  validate = () => {
    const errors = {};

    if (!this.state.miscelType) errors.miscelType = "Can't be blank";
    if (!this.state.amountRequested) errors.amountRequested = "Can't be blank";
    if (!this.state.otherDetails) errors.otherDetails = "Can't be blank";
    if (!this.state.requestDate) errors.requestDate = "Can't be blank";
    this.setState({ loading: true });
    this._createMiscelRequisition();
    return errors;
  };
  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
  };
  render() {
    console.log(this.props);
    const { errors, loading } = this.state;
    const miscelTypes = [
      { id: 1, value: 'EQUIPMENT', text: 'EQUIPMENT' },
      { id: 2, value: 'MAINTENANCE', text: 'MAINTENANCE' },
      { id: 2, value: 'FEES', text: 'FEES' }
    ];
    return (
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h2" color="green" textAlign="center">
            Create Miscellaneous Requisition
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
              <Form.Field error={!!errors.miscelType}>
                <Dropdown
                  value={this.state.miscelType}
                  search
                  selection
                  options={miscelTypes}
                  onChange={this.setMiscelType.bind(this)}
                />
                {errors.miscelType && <InlineError text={errors.miscelType} />}
              </Form.Field>

              <Form.Field error={!!errors.amountRequested}>
                <label>Amount Requested</label>
                <input
                  placeholder="0000"
                  value={this.state.amountRequested}
                  type="number"
                  onChange={e => this.setState({ amountRequested: e.target.value })}
                />
                {errors.amountRequested && <InlineError text={errors.amountRequested} />}
              </Form.Field>
              <Form.Field error={!!errors.otherDetails}>
                <label>Other Details</label>
                <TextArea
                  autoHeight
                  value={this.state.otherDetails}
                  rows={2}
                  onChange={e => this.setState({ otherDetails: e.target.value })}
                />

                {errors.otherDetails && <InlineError text={errors.otherDetails} />}
              </Form.Field>
              <Form.Field error={!!errors.requestDate}>
                <label>Request Date</label>{' '}
                <DatePicker selected={this.state.requestDate} onChange={this.handleRequestDateChange} />
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

  _createMiscelRequisition = async () => {
    let requestDate = null;
    if (!this.state.requestDate) {
      requestDate = moment().format();
    } else {
      requestDate = this.state.requestDate;
    }
    let paymentMode = 'MISCELLANEOUSREQUESTS';
    const { miscelType, amountRequested, otherDetails } = this.state;
    await this.props.addMiscellaneous({
      variables: {
        miscelType,
        amountRequested,
        otherDetails,
        requestDate,
        paymentMode
      },
      refetchQueries: [{ query: getUserDetails }, { query: InitiatedRequisitionsQuery }]
    });
    this.props.history.push('/miscellaneous/initiated');
  };
}

const CREATEMISCELLANEOUSREQUISITIONMUTATION = gql`
  mutation addMiscellaneousRequest(
    $miscelType: String!
    $amountRequested: Int!
    $otherDetails: String
    $paymentMode: String!
    $requestDate: String
  ) {
    addMiscellaneousRequest(
      miscelType: $miscelType
      amountRequested: $amountRequested
      otherDetails: $otherDetails
      paymentMode: $paymentMode
      requestDate: $requestDate
    )
  }
`;
export default graphql(CREATEMISCELLANEOUSREQUISITIONMUTATION, { name: 'addMiscellaneous' })(MiscellaneousCreate);
