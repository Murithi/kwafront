import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import { Message, Dropdown, Icon, Table, Button, Grid, Divider, Segment, Header } from 'semantic-ui-react';
import getMaterialRequisition from './queries/fetchMaterialsRequestById';
import getApprovedRequisitions from './queries/fetchApprovedMaterialRequisitions'
import getAccountFeed from './queries/fetchCashBalFeed'
import getProjectFeed from './queries/fetchProjectList'
import getUserDetails from './queries/getUserDetails';

const loadingMessage = (<Message icon info>
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
      <Message.Header>No Request with that ID Found</Message.Header>
    </Message.Content>
  </Message>
);

const timeoutMessage = (
  <Message icon negative>
    <Icon name="wait" />
    <Message.Content>
      <Message.Header>Error Processing Request</Message.Header>
      Is the backend server running?
    </Message.Content>
  </Message>
);
var accountOptions = [];
var projectOptions = [];
class MaterialRequisitionsIssueCash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading :false,
         }
    }
    handleApprovalDateChange = date=>{
        this.setState({approvalDate:date});
    }
    setAccountValue = (e, data)=>{
        accountOptions.forEach(element=>{
    
            if(element.value === data.value){
                console.log(data.value)
                let result = this.props.accountFeed.accountFeed.find(obj=>{
                  return obj.name===data.value
                })    
               
                this.setState({ accountchargedId:result.id  })
                this.setState({ cashbalId:result.balance.id  })
                this.setState({ balbefore:result.balance.balance  })
                this.setState({ accountName:result.name  });
            }
        })
    }
    setProjectValue=(e, data)=>{
       
        data.options.map(element=>{
           
            if(element.value==data.value){
               
                this.setState({ projectId:element.id  }) 
            }
        })     
        let project = this.props.projectFeed.projectFeed.find(obj=>{
            return obj.name===data.value
            })

    }
    render() { 
        
            const { loading } = this.state;
            
            if (this.props.materialRequest.loading) {
                return <div>{loadingMessage}</div>            
            }
            if (this.props.materialRequest.loading) {
                return <div>{timeoutMessage}</div>
            }
            const { initiatedMaterialRequisition } = this.props.materialRequest
            if (initiatedMaterialRequisition.length === 0) {
                return <div>{emptyMessage}</div>
             }
             if (this.props.accountFeed.loading === false) {
                if (this.props.accountFeed.accountFeed !== undefined || this.props.accountFeed.accountFeed.length !== 0) {
                    let tempOp = [...(new Set(this.props.accountFeed.accountFeed))];
                    accountOptions=[]
                    tempOp.map(element => {
                     return   accountOptions.push({ id: element.id, text: element.name, value: element.name });
                    });
                }            
            }
            if (this.props.projectFeed.projectFeed !== undefined || this.props.projectFeed.projectFeed.length !== 0) {
            
                let temporary=[...(new Set(this.props.projectFeed.projectFeed))];
                
                projectOptions=[]
                temporary.map(element => {
                 return   projectOptions.push({ id: element.id, text: element.projectName, value: element.projectName });
                });
            }
        return (
                             <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Material Request Details
                    </Header>
                    <Segment.Group horizontal loading={loading}>
                        <Segment>
                        <Divider />
                            <Table basic='very' celled >
                                <Table.Body>
                                <Table.Row>
                                        <Table.Cell><b>Project</b></Table.Cell>
                                        <Table.Cell>
                                            <Dropdown
                                            value={this.state.projectName}
                                            placeholder='Select Project'
                                            fluid selection
                                            options={projectOptions}
                                            onChange={this.setProjectValue.bind(this)}
                                            />
                                        </Table.Cell>
                                   </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><b>Material Requested:</b> </Table.Cell>
                                        <Table.Cell>
                                        {initiatedMaterialRequisition.materialType.materialName}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><b>Requested By::</b> </Table.Cell>
                                        <Table.Cell>
                                        {initiatedMaterialRequisition.requestedBy.personnelDetails.firstName} {initiatedMaterialRequisition.requestedBy.personnelDetails.lastName}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>                                   
                                   <Table.Cell><b>Account Issuing From</b></Table.Cell>
                                   <Table.Cell>
                                       <Dropdown
                                       value={this.state.accountName}
                                       placeholder='Select Account'
                                       fluid selection
                                       options={accountOptions}
                                       onChange={this.setAccountValue.bind(this)}
                                       />
                                    </Table.Cell>
                                   </Table.Row>
                                   <Table.Row>
                                        <Table.Cell><b>Approximate Cost</b> </Table.Cell>
                                        <Table.Cell>
                                        {initiatedMaterialRequisition.approxCost}
                                        </Table.Cell>
                                    </Table.Row>
                                   <Table.Row>
                                        <Table.Cell><b>Quantity Requested:</b> </Table.Cell>
                                        <Table.Cell>
                                        {initiatedMaterialRequisition.quantity}
                                        </Table.Cell>
                                    </Table.Row>
                                   <Table.Row>
                                        <Table.Cell><b>Date Requested:</b> </Table.Cell>
                                        <Table.Cell>
                                        {moment(initiatedMaterialRequisition.requestDate).format('MMM Do YYYY')}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <b>Issued On:</b>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <DatePicker selected={this.state.approvalDate} onChange={this.handleApprovalDateChange} />
                                        </Table.Cell>    
                                    </Table.Row>
                                </Table.Body>
                            </Table>                   
                        
                            <Divider /> 
                            <Button
                                onClick={()=>this._issueCash()}
                                fluid positive>Issue Cash</Button>
                        </Segment>
                       
                    </Segment.Group>
                    <Divider /> 
            </Grid.Column>
            </Grid>
             )
          
    }

    _issueCash = async () => { 
        let dateIssued=null
        const { initiatedMaterialRequisition } = this.props.materialRequest
        const id = this.props.match.params.id 
        
        let paymentType='MATERIALREQUESTS'
        const {accountchargedId, cashbalId, 
            balbefore, projectId}=this.state
        const amountIssued = initiatedMaterialRequisition.approxCost
        if (!this.state.approvalDate){
             dateIssued = moment().format();
          }else{
             dateIssued= this.state.approvalDate
        }
        await this.props.issuePayment({
            variables: { requestId:id, amountIssued, dateIssued , accountchargedId, cashbalId, 
                balbefore, projectId, paymentType },
            refetchQueries: [
                {query: getApprovedRequisitions},
                {query: getUserDetails}
            ]
        })
        this.props.history.push('/materialrequisitions/approved')
        
        
    }
    
}

const ADDMATERIALPAYMENTSMUTATION = gql`
mutation issuePayment(
  $accountchargedId:ID! $cashbalId:ID! $balbefore:Int! 
         $otherDetails:String  $paymentType:String! $projectId:ID!
         $amountIssued:Int! $dateIssued:String! $requestId:ID! 
 ){
    addPaymentIssue(
      accountchargedId:$accountchargedId,
        cashbalId:$cashbalId,    
        balbefore:$balbefore,
        otherDetails:$otherDetails,
        paymentType:$paymentType,
        projectId:$projectId,
      requestId:$requestId,
       dateIssued: $dateIssued,
        amountIssued:$amountIssued)
   
  }`
 
export default compose(
    graphql(getMaterialRequisition,
        {
            name: 'materialRequest',
            options: props => ({
                variables: {
                    id: props.match.params.id,
                }
            })
        }),
    graphql(ADDMATERIALPAYMENTSMUTATION,
        {
            name: 'issuePayment'
        }),
        graphql(getAccountFeed, {
            name:'accountFeed'
        }),
        graphql(getProjectFeed, {
            name:'projectFeed'
        })
)(MaterialRequisitionsIssueCash);