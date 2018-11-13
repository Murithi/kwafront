import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import { Query } from 'react-apollo';
import { Header, Form, Table, Grid, Message, Icon, Menu, Input,  Divider, Image, Segment } from 'semantic-ui-react';
import TerminationSearchResult from './TerminationSearchResult';
import Personnel_Feed_Query from './queries/fetchSearchPersonnel';

class CreateTermination extends Component {
    constructor(props) {
        super(props);
        this.state = { idNumber:'', personnel:'' }
    }
    render() { 
        

 
        return (

        <ApolloConsumer>
        {client => (
          <div>
                        <Form onSubmit={async () => {
                            console.log('submitted');
                            let idNumber = this.state.idNumber;            
                            const { data } = await client.query({
                            query: Personnel_Feed_Query,
                            variables: { idNumber }
                            });
                            this.setState({ personnel:data.personnel  });
                                    }}
                        >
            <Form.Group unstackable widths={2}>
                <Form.Input
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...'
                    
                    onChange={e => { this.setState({ idNumber: e.target.value }); }} />
                    
                <Form.Button positive secondary big right >Submit</Form.Button>
            </Form.Group>
            </Form>
           
          </div>
        )
        }
        </ApolloConsumer>
            
        )
    }
}
 
export default CreateTermination;