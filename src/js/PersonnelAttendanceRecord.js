import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import DatePicker from 'react-datepicker';
import gql from 'graphql-tag'
import moment from 'moment';
import { Header, Form, Checkbox,  Grid, Message,  Divider, Image, Segment } from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import SearchPersonnelRegistration from './SearchPersonnelRegistration';
import getPersonnel from './graphqlCache/getPersonnel';
class PersonnelAttendanceRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:Date.now(),
            inAttendance:'',
            dateOfAttendance: moment(),
            reportingTime: moment(),
            exitTime:moment(),
            errors: {},
            loading: false
        }
    }
    handleDateOfAttendanceChange = date => {
        this.setState({ dateOfAttendance: date });
    };
    handleReportingTimeChange = date => {
        this.setState({ reportingTime: date });
    };
    handleExitTimeChange = date => {
        this.setState({ exitTime: date });
    };
    handleInAttendance = (e, data) => { 
        
        this.setState({ inAttendance: data.checked });
    }
    validate = () => {
        const errors = {}
        console.log(errors);
        if (!this.state.inAttendance) errors.inAttendance = "Can't be blank";
        if (!this.state.dateOfAttendance) errors.dateOfAttendance = "Can't be blank";
        if (!this.state.reportingTime) errors.reportingTime = "Can't be blank";
        if (!this.state.exitTime) errors.exitTime = "Can't be blank";
        
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._addAttendance();
        }
        return errors;
    }

    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    }
    render() { 
        const { errors, loading } = this.state;
        const { searchedPersonnelDetails } = this.props;
        
     
        return (<React.Fragment>
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h4" color="green" textAlign="center">
            Personnel Details
          </Header> 
          <SearchPersonnelRegistration/>      
            </Grid.Column>
        </Grid>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: '100%' }}>
              <Header as="h4" color="green" textAlign="center">
             Personnel Details
              </Header> 
                    <Segment.Group horizontal loading={loading}>
                        <Segment>
                        <React.Fragment>
                        <Image src={searchedPersonnelDetails.photoUrl} size="medium" centered /> 
                                        </React.Fragment>
                        <Divider/>                    
                        <React.Fragment>
                        <b>First Name:</b> {searchedPersonnelDetails.firstName}
                        </React.Fragment>
                        <Divider />   
                        <React.Fragment>
                        <b>Last Name:</b> {searchedPersonnelDetails.lastName}
                        </React.Fragment>
                        <Divider />     
                    </Segment>
                        <Segment>
                            <Form size="mini" onSubmit={this.onSubmit} >
                            {errors.global && (
                                <Message negative>
                                <Message.Header> Something went wrong </Message.Header>
                                <p>{errors.global}</p>
                                </Message>
                                )} 
                                <Segment >
                                <Divider/>
                                    <Form.Field error={!!errors.inAttendance}>
                                        <label></label>
                                        <Checkbox label='Present' onChange={this.handleInAttendance} />            
                                        {errors.inAttendance && <InlineError text={errors.inAttendance} />}
                                    </Form.Field>
                                    <Divider/>
                                <Form.Field error={!!errors.dateOfAttendance}>
                                    <label> Date</label>{' '}
                                        <DatePicker
                                            isClearable={true}    
                                            selected={this.state.dateOfAttendance}
                                            onChange={this.handleDateOfAttendanceChange}
                                            todayButton={"Today"}
                                        />

                                        {errors.dateOfAttendance && <InlineError text={errors.dateOfAttendance} />}
                                    </Form.Field>
                                    <Divider/>
                                    <Form.Field error={!!errors.reportingTime}>
                                    <label> Reporting Time</label>{' '}
                                        <DatePicker
                                            
                                            selected={this.state.reportingTime}
                                            onChange={this.handleReportingTimeChange}
                                            isClearable={true}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            dateFormat="LT"
                                            timeCaption="Time"
                                        />
                                        {errors.reportingTime && <InlineError text={errors.reportingTime} />}
                                    </Form.Field>
                                    <Divider/>
                                    <Form.Field error={!!errors.exitTime}>
                                    <label> Exit Time </label>{' '}
                                        <DatePicker
                                            
                                            selected={this.state.exitTime}
                                            onChange={this.handleExitTimeChange}
                                            isClearable={true}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            dateFormat="LT"
                                            timeCaption="Time"
                                        />
                                        {errors.exitTime && <InlineError text={errors.exitTime} />}
                                    </Form.Field>
                                    
                                </Segment>   
                                <Form.Button fluid positive>Submit</Form.Button> 
                            </Form>    
                    </Segment>
                    </Segment.Group>
                </Grid.Column>
                </Grid>
        </React.Fragment>
        
        )
    }
    _addAttendance = async () => { 
        const {
            
            inAttendance,
            dateOfAttendance,
            reportingTime,
            exitTime
        } = this.state;
        let personnelId=this.props.searchedPersonnelDetails.personnelID 
        await this.props.updatePersonnelAttendance({
            variables: {
                personnelId,
                inAttendance,
                dateOfAttendance,
                reportingTime,
                exitTime
            }
        });

        this.props.history.push('/personnel/attendance');
    }
}

const UPDATEPERSONNELATTENDANCE = gql`
    mutation addPersonnelAttendance(
        $personnelId:ID!,
        $inAttendance:Boolean!,
        $dateOfAttendance:String!,
        $reportingTime:String!,
        $exitTime:String!
    ){  addPersonnelAttendance(
        personnelId:$personnelId,
        inAttendance:$inAttendance,
        dateOfAttendance:$dateOfAttendance,
        reportingTime:$reportingTime,
        exitTime:$exitTime)
   
    }
`;
export default compose(graphql(getPersonnel, {
    props: ({ data: { loading, error, searchedPersonnelDetails } }) => {
       
        if(loading) { return { loading } }        
        
      
        if(error) { return { error } }
    
          
        return { searchedPersonnelDetails };
        
    }
}),
graphql(UPDATEPERSONNELATTENDANCE, {name:'updatePersonnelAttendance'})    
)(PersonnelAttendanceRecord);