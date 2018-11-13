import React, { Component } from 'react';
class ProjectAssignmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Grid>
            <Grid.Column style={{ maxWidth: 900 }}>
          <Header as="h4" color="green" textAlign="center">
            Personnel Details
          </Header> 
          </Grid.Column>
          </Grid>      
         )
    }
}
 
export default ProjectAssignmentPage;