import React, { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import {Icon, Message, Form, Divider, Menu, Header, Segment, Dropdown, Table, Tab } from 'semantic-ui-react'

import ProjectFeedQuery from './queries/fetchProjectList';
import StoreIssuesDisplay from './StoreIssuesDisplay'
var options = [];
var tranTypeOptions =[
    { key: 'Issues', text: 'ISSUES', value: 'ISSUES' },
    { key: 'Reciepts', text: 'RECEIPTS', value: 'RECEIPTS' },
]
class StoreIssuesList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            projectId: ''
        }
    }
    onTransactionFetched = Transaction => this.setState(() => ({ Transaction }));
    setValue = (e, data) => {
        
        options.forEach(element => {
            if (element.value === data.value) { 
                this.setState({ projectName: data.value });
                this.setState({ projectId: element.id });
                return;
            }            
        });

    }
    setTranTypeValue = (e, data)=>{
        this.state.transactionType=data.value
    }
    handleDateFromChange = date=>{
        this.setState({startDate:date});
    }

    handleDateToChange = date=>{
        this.setState({endDate:date});
    }
    render() { 
        if (this.props.projectFeed.loading === false) {
            var tempOps = this.props.projectFeed.projectFeed;
            options=[]
            tempOps.map(element => {
                options.push({ id: element.id, text: element.projectName, value: element.projectName });
            });
          }
        
       // this.setState({ transactionList:storageFeed  });
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
                <Message.Header>No Terminations Found</Message.Header>
                <p>Add some new terminations to get started.</p>
                <Link to={'/personnel/termination/new'} className="ui button primary">
                  Add New Termination{' '}
                </Link>
              </Message.Content>
            </Message>
          );
      
          const timeoutMessage = (
            <Message icon negative>
              <Icon name="wait" />
              <Message.Content>
                <Message.Header>Timeout</Message.Header>
                Is the backend server running?
              </Message.Content>
            </Message>
          );

        return ( 
        <Fragment>
          
             <Divider/>        
         <Form >
             <Form unstackable widths={2}>
             <Segment.Group horizontal>
             <Segment>
            <Form.Field >
            <label>DATE FROM:  </label>{' '}
                 <DatePicker selected={this.state.startDate} onChange={this.handleDateFromChange} />
                 
            </Form.Field>
            </Segment>
            <Segment>
            <Form.Field >
            
            <label>DATE TO:  </label>{' '}
             <DatePicker selected={this.state.endDate} onChange={this.handleDateToChange} />
                  
            </Form.Field>
            
            </Segment> 
            <Segment>
            <Form.Field>
            <label>PROJECT:  </label>{' '}
            <Dropdown
                value={this.state.projectName}
                search
                selection
                options={options}
                onChange={this.setValue.bind(this)}
                />
            </Form.Field>    
            </Segment> 
            <Segment>
            <Form.Field>
            <label>TYPE:  </label>{' '}
            <Dropdown
                value={this.state.transactionType}
                search
                selection
                options={tranTypeOptions}
                onChange={this.setTranTypeValue.bind(this)}
                />
            </Form.Field>    
            </Segment> 
        
            </Segment.Group>
             </Form>
                 </Form> 
         <Divider/> 
        <StoreIssuesDisplay 
            startDate={this.state.startDate} 
            endDate={this.state.endDate} 
            projectId={this.state.projectId} 
            transactionType={this.state.transactionType}
            />
        
         
        
         </Fragment> 
        );
    }
}
 
export default 
graphql(ProjectFeedQuery,
    {
        name: 'projectFeed' 
    }
)
(withApollo(StoreIssuesList));