// import React, { Component } from 'react';
// import { gql } from 'graphql-tag';
// import { Redirect } from 'react-router-dom'
// import { withRouter } from "react-router-dom";
// import { graphql, compose } from 'react-apollo';

// class VehicleOwnerItemEdit extends Component {
//     constructor(props) {
//         super(props);
//       this.state = {
//           id: this.props.id,
//             name: this.props.name,
//             phone: this.props.phone,
//             email: this.props.email,

//             errors: {},
//             loading: false
//           };
//     }
//     onSubmit = () => {
//         const errors = this.validate();
//         this.setState({ errors });
//       };

//       validate = () => {
//         const errors = {};
//         if (!this.state.name) errors.name = "Can't be blank";
//         if (!this.state.phone) errors.phone = "Can't be blank";
//         if (!this.state.email) errors.email = "Can't be blank";

//         if (Object.keys(errors).length === 0) {
//           this.setState({ loading: true });
//           this._createVehicleOwner();
//         }
//         return errors;
//       };
//     render() {
//         return (
//             const { errors, loading } = this.state;
//             return (
//               <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
//                 <Grid.Column style={{ maxWidth: 600 }}>
//                   <Header as="h4" color="green" textAlign="center">
//                     Create Vehicle
//                   </Header>
//                   <Form size="large" onSubmit={this.onSubmit} loading={loading}>
//                     {errors.global && (
//                       <Message negative>
//                         <Message.Header> Something went wrong </Message.Header>
//                         <p>{errors.global}</p>
//                       </Message>
//                     )}
//                     <Segment stacked>
//                       <Form.Field error={!!errors.name}>
//                         <label>Company Name</label>
//                         <input
//                           placeholder=this.props.name
//                           value={this.state.name}
//                           onChange={e => this.setState({ name: e.target.value })}
//                         />
//                         {errors.name && <InlineError text={errors.name} />}
//                       </Form.Field>

//                       <Form.Field error={!!errors.phone}>
//                         <label>Phone Number</label>
//                         <Phone
//                           placeholder=this.props.phone
//                           value={this.state.phone}
//                           onChange={phone => this.setState({ phone })}
//                         />
//                         {errors.phone && <InlineError text={errors.phone} />}
//                       </Form.Field>
//                       <Form.Field error={!!errors.email}>
//                         <label>email</label>
//                         <input
//                           placeholder=this.props.email
//                           value={this.state.email}
//                           onChange={e => this.setState({ email: e.target.value })}
//                         />
//                         {errors.email && <InlineError text={errors.email} />}
//                       </Form.Field>

//                       <Form.Button>Submit</Form.Button>
//                     </Segment>
//                   </Form>
//                 </Grid.Column>
//               </Grid>
//           )
//     }
//   _updateVehicleOwner = async () => {
//     const {
//       id,
//       name,
//       phone,
//       email
//     } = this.state

//     await this.props.updateVehicleOwner({
//       variables: {
//         id,
//         name,
//         phone,
//         email
//       }
//     });

//     this.props.history.push('/vehicleowner/list')
//   };

// const UPDATEVEHICLEOWNERMUTATION = gql`
//   mutation updateVehicleOwner(
//     $id:ID!
//     $name:String!
//     $phone:String!
//     $email:String!
//   ){
//     editVehicleOwner(
//       id:$id
//       name:$name
//       phone:$phone
//       email:$email
//     ){
//       id
//       name
//       phone
//       email
//     }
//   }
// `
// export default
//   graphql(UPDATEVEHICLEOWNERMUTATION,
//     { name: 'updateVehicleOwner' })
// (withRouter(VehicleOwnerItemEdit));
