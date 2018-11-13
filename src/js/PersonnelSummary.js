import React, { Component, Fragment } from 'react';
import { Header, Divider, Grid, Segment, Dropdown, Form, Message, Icon} from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { Link, Route } from 'react-router-dom'
import PersonnelExpenses from './PersonnelExpenses'

class PersonnelSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleDateFromChange = date=>{
        this.setState({startDate:date});
    }

    handleDateToChange = date=>{
        this.setState({endDate:date});
    }
    render() { 
        return ( 
        <Fragment>
            <Header as='h2' dividing color="green" textAlign="center">
            Personnel Expenses Report Summary
          </Header>
          <Divider color="olive"/>
          <Form>
          <Segment.Group horizontal>
            <Segment></Segment>
            
            <Segment>
            <Form.Field >
            
                 <DatePicker selected={this.state.startDate} onChange={this.handleDateFromChange} />
                 <label>Date From:  </label>{' '}
            </Form.Field>
            </Segment>
            <Segment>
            <Form.Field >
            
                  <DatePicker selected={this.state.endDate} onChange={this.handleDateToChange} />
                  <label>Date To:  </label>{' '}
            </Form.Field>
            </Segment>
            </Segment.Group>
            </Form>
          
            <hr color="pink"/> 
           <PersonnelExpenses startDate={moment(this.state.startDate).format('MMM DD YYYY')} endDate={moment(this.state.endDate).format('MMM DD YYYY')}/>
        </Fragment> 
         );
    }
}

 
export default PersonnelSummary;