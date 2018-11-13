import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash'
import moment from 'moment';
import { withApollo } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import { Header, Form, Table, Dropdown, Checkbox, Radio, Grid, Message, Icon, Menu, Input,  Divider, Image, Segment } from 'semantic-ui-react';

import Personnel_Feed_Query from './queries/fetchSearchPersonnel';
import ProjectFeedQuery from './queries/fetchProjectList';
var options = [];

class SearchPersonnelAssign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            personnel: [],
            projectSections: [],
            projectId:''
        }
    }

    handleChange = (e, data) => {

        let objData = this.state.projectSections;

        for (let i = 0; i < objData.length; i++) { 
            if (objData[i].id === data.id) { 
                objData[i].status = !data.cheched;
                break;
            }
        }
        
        this.setState({ projectSections: objData });
       
        
    }

    setValue = (e, data) => {
        this.setState({ value: data });
        const choice = options.find(project => project.value === data.value);
        
        const obtainedData = this.props.projectFeed.projectFeed;
        
        var chosen;
        obtainedData.map(item => {
            if (item.id === choice.id) { 
                chosen = item;
                
            }
        });
        this.state.projectSections = [];
        chosen.sections.map(section => {
            let stateSections = this.state.projectSections;
            stateSections.push({id: section.id,  sectionName: section.sectionName, status: null });
            this.setState({ projectSections: stateSections });
        });
       
       
      };
    render() { 
        const { errors, loading } = this.state;
        if (this.props.projectFeed.loading === false) {
            var tempOps = this.props.projectFeed.projectFeed;
            tempOps.map(element => {
                options.push({ id: element.id, text: element.projectName, value: element.projectName });
            });
          }
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
            <div>
           <b> Search Employee by National ID Number</b>
            <Divider/>        
        <Form onSubmit={()=>this._executeSearch()}>
            <Form.Group unstackable widths={2}>
                <Form.Input 
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...'                    
                    onChange={e => { this.setState({ filter: e.target.value }); }}
                />                   
                <Form.Button positive secondary big right >Submit</Form.Button>
            </Form.Group>
                </Form> 
        <Divider/>        
        {
            (this.state.personnel.length !== 0)
                ? <React.Fragment>
                        

                <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                  <Header as="h4" color="green" textAlign="center">
                  {this.state.personnel.firstName}'s Details
                  </Header> 
                  <Segment.Group horizontal>
                    <Segment>
                      <React.Fragment>
                      <Image src={this.state.personnel.photoUrl} size="medium" centered /> 
                                            </React.Fragment>
                        <Divider/>                    
                        <React.Fragment>
                        <b>First Name:</b> {this.state.personnel.firstName}
                        </React.Fragment>
                        <Divider />   
                        <React.Fragment>
                        <b>Last Name:</b> {this.state.personnel.lastName}
                        </React.Fragment>
                        <Divider /> 
                        
                        
                        {this.state.personnel.assignedToProject
                            ?
                            <React.Fragment>                        
                           
                                     <Checkbox label='Assigned Project' defaultChecked />            
                                                   
                            </React.Fragment>                
                                                    
                            :
                                            
                            <React.Fragment>
                                <React.Fragment> <b>Assigned Project: </b><Checkbox /></React.Fragment>
                                <Divider/>

                                                    
                                <React.Fragment><b>Project: </b>
                                <Dropdown
                                value={this.state.projectId}
                                search
                                selection
                                options={options}
                                onChange={this.setValue.bind(this)}
                                />
                                </React.Fragment>  
                                <Divider />
                                <Header as="h5"> Assign Sections</Header> 
                                <Divider/>
                                {
                                    (this.state.projectSections )
                                        ? this.state.projectSections.map(section => (
                                         
                                         
                                            <Checkbox
                                             id={section.id}                        
                                            label={section.sectionName}
                                            onChange={this.handleChange}                        
                                        />                    
                                        ))
                                        :  <React.Fragment/>  
                                }                    
                            </React.Fragment>
        
                                                    
                        }
                      
                      <Divider />                    
                    </Segment>
                    </Segment.Group>                  
                  </Grid.Column>              
                </Grid>  
                </React.Fragment>          
                : <React.Fragment>Nothing Found</React.Fragment>
        } 
        </div>
            
        )
    }
    _executeSearch = async () => { 
        const { filter } = this.state
        const result = await this.props.client.query({
          query: Personnel_Feed_Query,
          variables: { filter },
        })
       
        const personnel = result.data.personnelFeed[0];
        this.setState({ personnel: personnel });
        if (personnel.assignedToProject === true) { 
            personnel.projectAssignedTo.sections.map(section => {
                let a = this.state.projectSections;
                a.push(`{${section.sectionName}: false}`);
                this.setState({ projectSections: a });
            });
        }
    }
}
 
export default
    graphql(ProjectFeedQuery, { name: 'projectFeed' })
        (withApollo(SearchPersonnelAssign));