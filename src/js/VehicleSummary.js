import React, { Component, Fragment } from 'react';
import { Header, Divider, Grid, Segment, Dropdown, Form, Message, Icon} from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { Link, Route } from 'react-router-dom'
import { graphql, compose} from 'react-apollo';
import currencyFormatter from 'currency-formatter'
import VehicleExpenses from './VehicleExpenses'


class VehicleSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
     }
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
            Vehicle Expenses Report Summary
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
           <VehicleExpenses startDate={this.state.startDate} endDate={this.state.endDate}/>
        </Fragment> 
          );
    }
}
 
export default VehicleSummary;