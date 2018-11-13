import React, { Component, Fragment } from 'react';
import {Grid, Divider,Segment, Header  } from 'semantic-ui-react'
import currencyFormatter from 'currency-formatter'
import { graphql, compose} from 'react-apollo';
import ReactChartkick, { LineChart, PieChart, ColumnChart, BarChart } from 'react-chartkick'
import Chart from 'chart.js'

import getMiscellaneousTotals from './queries/fetchMiscellaneousExpenses'

class MiscellaneousExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        var misceldata={}
        if (this.props.totalsFeed.MISCELLANEOUSTOTALS !== undefined){
        this.props.totalsFeed.MISCELLANEOUSTOTALS.map(request=>{
            let {month, amount}=request     
            misceldata[`"${month}"`]=`${amount}`               
        })
    }
   
        return ( 
            <Segment>
            <Grid columns={2} relaxed >
                <Grid.Column>        
                    <b>TOTAL MISCELLANEOUS REQUESTS</b> 
                    <Divider/>       
 

               
                </Grid.Column>
               
                <Grid.Column>
                    <b>{currencyFormatter.format(this.props.totalsFeed.MISCELLANEOUSREQUESTS, { code: 'KES' })}</b>
                    <Divider/>


                </Grid.Column>  
                </Grid>
                {  (this.props.startDate && this.props.endDate) && 
                    <Fragment> 
                    <hr color="pink"/>
                    <div class="ui segments">
                        <div class="ui segment">
                        
                        </div>
                        <div class="ui secondary segment">
                            <LineChart data={misceldata} legend={true} width="800px" height="500px" colors={["#008080", "#008080"]} xtitle="Time" ytitle="Amount in KES"/>
                        </div>
                        <div className="ui segment">
                        <Header as='h4' dividing color="green" textAlign="center">
                            Miscellaneous Requests 
                        </Header>
                        </div>
                    </div>
                    <div class="ui clearing divider " color='pink'></div>
                   
                    </Fragment>
                }  
                </Segment>
         );
    }
}
 
export default graphql(getMiscellaneousTotals, {
    name:'totalsFeed', 
    options: props => ({
        variables: {
            startDate: props.startDate,
            endDate: props.endDate            
        }
    })
})
(MiscellaneousExpenses);