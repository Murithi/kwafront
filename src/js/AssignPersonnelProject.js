import React, { Component, Fragment } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo'
import { Grid, Header, Form, Segment, Image,  Divider, Message, Dropdown } from 'semantic-ui-react';

import SearchPersonnelRegistration from './SearchPersonnelRegistration';
import getPersonnel from './graphqlCache/getPersonnel'
import InlineError from './messages/InlineError'
import Personnel_Feed_Query from './queries/fetchPersonnel';
import ProjectFeedQuery from './queries/fetchProjectList';


var projectOptions = [];
class AssignPersonnelProject extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: '',
            projectName: '',
            id:'',
            projectAssignedId: '',            
            projectValue: '',
            sections: {},
            errors: {},
            loading:false
         }
    }
    setProjectValue = (e, data) => {
        
        projectOptions.forEach(element => {
            if (element.value === data.value) { 
                this.setState({ projectName: data.value });
                this.setState({ projectAssignedId: element.id });
                return;
            }            
        });

    };
  

    validate = () => { 
        const errors = {};
        
        if (!this.state.projectAssignedId) errors.projectAssignedId = "Can't be blank";
        
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._assignEmployeeProject();
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
        console.log(searchedPersonnelDetails);

        if (this.props.projectFeed.loading === false) {
            if (this.props.projectFeed.projectFeed !== undefined || this.props.projectFeed.projectFeed.length !== 0) {
                let tempOp = this.props.projectFeed.projectFeed
                projectOptions = [];
                tempOp.map(element => {
                    return   projectOptions.push({ id: element.id, text: element.projectName, value: element.projectName });
                   });
            }
        }
        return (
            <Fragment>
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header as="h4" color="green" textAlign="center">
            Personnel Details
          </Header> 
                <SearchPersonnelRegistration />   
                
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
                                    <Segment>
                                    <Form.Field error={!!errors.projectAssignedId}>
                                    <Dropdown
                                value={this.state.projectName}
                                search
                                selection
                                options={projectOptions}
                                onChange={this.setProjectValue.bind(this)}
                                />
                                {errors.projectAssignedId && <InlineError text={errors.projectAssignedId} />}
                            
                                        </Form.Field></Segment>
                                    <Form.Button fluid positive>Submit</Form.Button>
                                    </Form>
                            </Segment>
                            </Segment.Group>
            </Grid.Column>
            </Grid>
        </Fragment>
          )
    }
    _assignEmployeeProject = async () => {
        const { personnelID } = this.props.searchedPersonnelDetails;
        const { projectAssignedId } = this.state;
        
        await this.props.assignProject({
            variables: { id:personnelID, projectId: projectAssignedId },
            refetchQueries: [{query: Personnel_Feed_Query}]
        })
        this.props.history.push('/personnel/list')
    }
}
const ASSIGNPERSONNELPROJECT = gql`
mutation assignEmployeeProject(
      $id:ID!,
    $projectId:ID!
){
  assignToProject(
    id:$id
    projectId:$projectId
    
  )
}
`;

export default compose(
    graphql(getPersonnel, {
        props: ({ data: { loading, error, searchedPersonnelDetails } }) => {
       
            if(loading) { return { loading } }        
            
          
            if(error) { return { error } }
        
              
            return { searchedPersonnelDetails };
            
        }
    }),
    graphql(ASSIGNPERSONNELPROJECT, { name: 'assignProject' }),
    graphql(ProjectFeedQuery, {name:'projectFeed'})
) (AssignPersonnelProject);

