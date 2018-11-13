import React, { Component } from 'react';
import DatePicker from 'react-datepicker'; 
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import InlineError from './messages/InlineError';
import { Form, Segment, Grid, Header, Message, Dropdown, Divider } from 'semantic-ui-react';
import DRIVERSFEEDQUERY from './queries/fetchDrivers';

var personnelOptions = [];
var vehicleOptions = [];
class DriversAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            personnelvalue: '',
            licenseExpiry: '',
            licenseNumber: '',
            personnelId:'',
            errors: {},
            loading:false
         }
    }
    handleExpiryChange = date => {
        this.setState({ licenseExpiry: date });
    };
    setLicenseValue = (e, data) => {
        
        this.setState({ licenseNumber: data.value });
    };
    setValue = (e, data) => {  
        console.log(data);
        console.log(personnelOptions);
        personnelOptions.forEach(element => {
            if (element.value === data.value) { 
                console.log(element.id);
                this.setState({ personnelvalue: element.value });
                this.setState({ personnelId: element.id });                
            }            
        });        
     
    };



    
    validate = () => { 
        const errors = {};
        if (!this.state.personnelvalue) errors.personnelvalue = "Can't be blank";
        if (!this.state.licenseNumber) errors.licenseNumber = "Can't be blank";
        if (!this.state.licenseExpiry) errors.licenseExpiry = "Can't be blank";
     
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._createDriver();
        }
        return errors;
    }
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    };
    render() {
        
        const { errors, loading } = this.state;
        
        if (this.props.personnelFeed.loading === false) { 
          
            if (this.props.personnelFeed.personnelRoleFeedByDesignation[0].personnels !== undefined || this.props.personnelFeed.personnelRoleFeedByDesignation[0].personnels !== null) {
                let tempOps = this.props.personnelFeed.personnelRoleFeedByDesignation[0].personnels;
                personnelOptions = [];
                tempOps.map(element => {
                return  personnelOptions.push({ id: element.id, text: element.firstName + " " + element.lastName, value: element.firstName + " " + element.lastName });
                });
            }
            
        }
        if(this.props.vehicleFeed.loading === false) { 
            let tempOp = this.props.vehicleFeed.vehicleDisplayFeed;
            vehicleOptions = [];
            tempOp.map(element => {
              return  vehicleOptions.push({ id: element.id, text: element.registrationNumber, value: element.registrationNumber });
            });
        }

        return (
                        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 600 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Create Driver
          </Header>
          <Divider/>
            <Form size="large" onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (
                    <Message negative>
                        <Message.Header> Something went wrong </Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                )}
                <Segment stacked>
                    <Form.Field error={!!errors.personnelvalue}>
                        <label>Driver's Name</label>
                        <Dropdown
                        value={this.state.personnelvalue}
                        search
                        selection
                        options={personnelOptions}
                        onChange={this.setValue.bind(this)}
                        />
                        {errors.personnelvalue && <InlineError text={errors.personnelvalue} />}
                    </Form.Field> 
                    <Divider/>  
                    <Form.Field>    
                        <label>License Expiry Date </label>{' '}
                        <DatePicker selected={this.state.licenseExpiry} onChange={this.handleExpiryChange} />
                    </Form.Field>
                    <Divider /> 
                    <Form.Field error={!!errors.licenseNumber}>
                        <label>License Number</label>
                        <input
                            placeholder="LKOIN2443"
                            value={this.state.licenseNumber}
                            onChange={e => this.setState({ licenseNumber: e.target.value })}
                                        />
                            </Form.Field>  
                            <Form.Button fluid positive> Submit </Form.Button>                    
                </Segment>        
            </Form>
          </Grid.Column>
            </Grid>
        )
    }
    _createDriver = async () => { 
        const { personnelId, licenseExpiry, licenseNumber } = this.state;
        await this.props.createDriver({
            variables: { personnelId, licenseExpiry, licenseNumber },
            refetchQueries: [{query: DRIVERSFEEDQUERY}]
        });
    
        this.props.history.push('/drivers/list')
    }

   
}

const PERSONNELFEEDQUERY = gql`
query personnelTitleFeed{
  personnelRoleFeedByDesignation(filter:"DRIVER"){
    roleName
    personnels{
        id
      firstName
      lastName
    }
  }
}

`;

const VEHICLEFEEDQUERY = gql`
query getVehicles{
  vehicleDisplayFeed{
    id
    registrationNumber
    
  }
}
`;

const CREATEDRIVERMUTATION = gql`
mutation createDriver(
    $personnelId: ID!,
    $licenseExpiry: DateTime!,
    $licenseNumber:String!
){
  addDriver(
    personnelId: $personnelId,
    licenseExpiry: $licenseExpiry,
    licenseNumber: $licenseNumber
  ){
    id
    licenseExpiry
  }
}
`;
export default compose(
    
    graphql(PERSONNELFEEDQUERY, { name: 'personnelFeed' }),
    graphql(VEHICLEFEEDQUERY, { name: 'vehicleFeed' }),
    graphql(CREATEDRIVERMUTATION, { name: 'createDriver' }),
)(DriversAdd);

