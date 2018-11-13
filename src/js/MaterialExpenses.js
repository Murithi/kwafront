import React, { Component, Fragment } from 'react';
import {Grid, Divider,Segment, Header  } from 'semantic-ui-react'
import currencyFormatter from 'currency-formatter'
import { graphql, compose} from 'react-apollo';
import ReactChartkick, { LineChart, PieChart, ColumnChart, BarChart } from 'react-chartkick'
import Chart from 'chart.js'
import getMaterialTotals from './queries/fetchMaterialExpenses'

class MaterialExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        var materialdata={}

        if (this.props.totalsFeed.MATERIALTOTALS !== undefined){
            this.props.totalsFeed.MATERIALTOTALS.map(request=>{
                let {month, amount}=request     
                materialdata[`"${month}"`]=`${amount}`               
            })
            console.log(this.props.totalsFeed)
       }
        return ( 
            <Segment>
            <Grid columns={2} relaxed >
                <Grid.Column>        
                    <b>TOTAL MATERIAL REQUESTS</b> 
                    <Divider/>       


               
                </Grid.Column>
               
                <Grid.Column>
                    <b>{currencyFormatter.format(this.props.totalsFeed.MATERIALREQUESTS, { code: 'KES' })}</b>
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
                            <LineChart data={materialdata} legend={true} width="800px" height="500px" colors={["#008080", "#008080"]} xtitle="Time" ytitle="Amount in KES"/>
                        </div>
                        <div className="ui segment">
                        <Header as='h4' dividing color="green" textAlign="center">
                            Materials Requests 
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
 
export default graphql(getMaterialTotals, {
    name:'totalsFeed', 
    options: props => ({
        variables: {
            startDate: props.startDate,
            endDate: props.endDate            
        }
    })
})(MaterialExpenses);