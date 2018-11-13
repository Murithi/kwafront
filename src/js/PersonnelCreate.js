import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { graphql, compose} from 'react-apollo';
import axios from 'axios'
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import DatePicker from 'react-datepicker';
import InlineError from './messages/InlineError';
import { Form, Segment, Grid, Header, Message, Dropdown, Divider, Image } from 'semantic-ui-react';
import Personnel_Feed_Query from './queries/fetchPersonnel';
import Role_Feed_Query from './queries/fetchRoles';
import CREATEPERSONNELMUTATION from './mutations/createPersonnel';
var options = [
    { text: "Male", value: true },
    { text: "Female", value: false }
    
];

const CLOUDINARY_UPLOAD_PRESET = 'kewaeastafrica';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/murithi/image/upload';



var educationOptions = [
  { text: "Master's Degree", value: "Master's Degree" },
  { text: "Bachelor's Degree", value: "Bachelor's Degree" },
  { text: "Higher Diploma", value: "Higher Diploma" },
  { text: "Certificate", value: "Certificate" },
  { text: "High School Certificate", value: "High School Certificate" },
  
]

var roleOptions = [];
class PersonnelCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoUrl: null,          
            firstName: '',
            lastName: '',
            gender: true,
            idNumber: '',
            nssfId: '',
            nhifId: '',
            designation: '',
            phoneNumber: '',
            addressNo: '',
            location: '',
            dateOfEmployment: '',
            currentSalary: '',
            dateOfTermination: '',
            highestEducationLevel: '',
            certificatesUrl: null,          
            curriculumVitaeUrl: null,
            
            errors: {},
            loading: false
        };
    }
    handleTerminationChange = date => {
        this.setState({ dateOfTermination: date });
      };
    handleEmploymentChange = date => {
        this.setState({ dateOfEmployment: date });
      };
    setValue = (e, data) => {
        
        
        this.setState({ gender: data.value });
    };
    educationSetValue = (e, data) => {      
      
      this.setState({ highestEducationLevel: data.value });
    };
  
  roleValue = (e, data) => {
    roleOptions.forEach(element => {
      if (element.value === data.value) { 
        this.setState({ roleValue: element.value });
        this.setState({ roleId:element.id  });
      }
    });
    this.setState({ designation:data.value  });
  };
      
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
      };


    handleProfilePhotoUpload= (file)=> {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', file);
      this.setState({ loading:true  });

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
       
        if (response.body.secure_url !== '') {
          console.error(response.body);
          this.setState({
            photoUrl: response.body.secure_url

          });
          this.setState({ loading:false  });
        }
      });
    }
     

  
     handleCertificatesPhotoUpload =  (file)=> {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file);
      this.setState({ loading:true  });
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
  
        if (response.body.secure_url !== '') {
          this.setState({
            certificatesUrl: response.body.secure_url
          });
          this.setState({ loading:false  });
        }
      });
    }
  

    handleCurriculumVitaePhotoUpload =  (file)=> {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file);
      this.setState({ loading:true  });
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
  
        if (response.body.secure_url !== '') {
          this.setState({
            curriculumVitaeUrl: response.body.secure_url
          });
          this.setState({ loading:false  });
        }
      });
    }
  
    validate = () => {
        const errors = {}
      if (!this.state.firstName) errors.firstName = "Can't be blank";
      if (!this.state.lastName) errors.lastName = "Can't be blank";
      if (!this.state.idNumber) errors.idNumber = "Can't be blank";
      if (!this.state.nssfId) errors.nssfId = "Can't be blank";
      if (!this.state.nhifId) errors.nhifId = "Can't be blank";
      if (!this.state.phoneNumber) errors.phoneNumber = "Can't be blank";
      if (!this.state.gender) errors.gender = "Can't be blank";
      if (!this.state.addressNo) errors.address = "Can't be blank";
      if (!this.state.location) errors.location = "Can't be blank";
      if (!this.state.photoUrl) errors.photoUrl = "Can't be blank";
      if (!this.state.highestEducationLevel) errors.highestEducationLevel = "Can't be blank";
      if (!this.state.certificatesUrl) errors.certificatesUrl = "Can't be blank";
      if (!this.state.curriculumVitaeUrl) errors.curriculumVitaeUrl = "Can't be blank";
      if (!this.state.designation) errors.designation = "Can't be blank";
      if (!this.state.dateOfEmployment) errors.dateOfEmployment = "Can't be blank";
      if (!this.state.currentSalary) errors.currentSalary = "Can't be blank";
    
      if (Object.keys(errors).length === 0) {
          this.setState({ loading: true });
        
        this._createPersonnel();
      }
      return errors;
    
    }
   
    
  render() {
    const { errors, loading } = this.state;
    if (this.props.roleFeed.loading === false) { 
      let tempOp = this.props.roleFeed.personnelRoleFeed;
      tempOp.map(element => {
          roleOptions.push({ id: element.id, text: element.roleName, value: element.roleName });
      });
    }
      return (
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 800 }}>
                  <Header as="h4" color="green" textAlign="center">
                      Add Personnel
          </Header>
          <Form size="large" onSubmit={this.onSubmit} loading={loading}>
            {errors.global && (
              <Message negative>
                <Message.Header> Something went wrong </Message.Header>
                <p>{errors.global}</p>
              </Message>
            )}
                      <Segment stacked>
                <Form.Field error={!!errors.photoUrl}>
                  <label>Profile Picture</label> 
                  <Divider/>
                  
                  
                    { (this.state.photoUrl === null)
                      ? 
                      <Dropzone 
                              multiple={false}
                              accept="image/*"
                            onDrop={this.handleProfilePhotoUpload} >
                            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                if (isDragActive) {
                                  return "This file is authorized";
                                }
                                if (isDragReject) {
                                  return "This file is not authorized";
                                }
                                return acceptedFiles.length || rejectedFiles.length
                                  ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                                  : "Try dropping some files.";
                              }}
                          </Dropzone>
                      :
                        <div>
                          <p>{this.state.photoUrl.name}</p>
                          <img src={this.state.photoUrl} />
                        </div>
                    }
                  {errors.photoUrl && <InlineError text={errors.photoUrl}/>}
                                            
                </Form.Field>          
                <Divider/>
              <Form.Field error={!!errors.firstName}>
                <label>First Name</label>
                <input
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
                {errors.firstName && <InlineError text={errors.firstName} />}
                          </Form.Field>
                            
              <Form.Field error={!!errors.lastName}>
                <label>Last Name</label>
                <input
                  placeholder="lastName"
                  value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
                {errors.lastName && <InlineError text={errors.lastName} />}
                </Form.Field>

                <Form.Field error={!!errors.idNumber}>
                  <label>National ID Number</label>
                  <input
                    placeholder="idNumber"
                    value={this.state.idNumber}
                    onChange={e => this.setState({ idNumber: e.target.value })}
                  />
                  {errors.idNumber && <InlineError text={errors.idNumber} />}
                </Form.Field> 

                <Form.Field error={!!errors.nssfId}>
                  <label>NSSF ID Number</label>
                  <input
                    placeholder="nssfId"
                    value={this.state.nssfId}
                    onChange={e => this.setState({ nssfId: e.target.value })}
                  />
                  {errors.nssfId && <InlineError text={errors.nssfId} />}
                </Form.Field>
                <Form.Field error={!!errors.nhifId}>
                  <label>NHIF ID Number</label>
                  <input
                    placeholder="nhifId"
                    value={this.state.nhifId}
                    onChange={e => this.setState({ nhifId: e.target.value })}
                  />
                  {errors.nhifId && <InlineError text={errors.nhifId} />}
                </Form.Field> 
                <Form.Field error={!!errors.gender}>
                  <label>Gender</label>
                  <Dropdown
                    value={this.state.gender}
                    search
                    selection
                    options={options}
                    onChange={this.setValue.bind(this)}
                  />
                  {errors.gender && <InlineError text={errors.gender} />}
              </Form.Field>            
              <Form.Field error={!!errors.phoneNumber}>
                <label>Phone Number</label>
                <Phone
                  placeholder="Enter phone number"
                  value={this.state.phoneNumber}
                  onChange={phoneNumber => this.setState({ phoneNumber })}
                />
                {errors.phoneNumber && <InlineError text={errors.phoneNumber} />}
              </Form.Field>
              <Form.Field error={!!errors.addressNo}>
                <label>Address Number</label>
                <input
                  placeholder="addressNo"
                  value={this.state.addressNo}
                  onChange={e => this.setState({ addressNo: e.target.value })}
                />
                {errors.addressNo && <InlineError text={errors.addressNo} />}
                </Form.Field> 
                <Form.Field error={!!errors.location}>
                <label>Location</label>
                <input
                  placeholder="location"
                  value={this.state.location}
                  onChange={e => this.setState({ location: e.target.value })}
                />
                {errors.location && <InlineError text={errors.location} />}
                          </Form.Field> 
                          <Form.Field error={!!errors.highestEducationLevel}>
                <label>Highest Level of Education</label>
               
                  <Dropdown
                  value={this.state.highestEducationLevel}
                  search
                  selection
                  options={educationOptions}
                  onChange={this.educationSetValue.bind(this)}
                />  
                {errors.highestEducationLevel && <InlineError text={errors.highestEducationLevel} />}
                </Form.Field>
                
                <Form.Field error={!!errors.certificatesUrl}>
                          <label>Upload Education Certificates</label>    
                          {this.state.certificatesUrl === null
                      ? 
                      <Dropzone 
                              multiple={false}
                              
                            onDrop={this.handleCertificatesPhotoUpload} >
                            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                if (isDragActive) {
                                  return "This file is authorized";
                                }
                                if (isDragReject) {
                                  return "This file is not authorized";
                                }
                                return acceptedFiles.length || rejectedFiles.length
                                  ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                                  : "Try dropping some files.";
                              }}
                          </Dropzone>
                      :
                        <div>
                          <p>{this.state.certificatesUrl.name}</p>
                          <img src={this.state.certificatesUrl} />
                        </div>
                    }
                  {errors.certificatesUrl && <InlineError text={errors.certificatesUrl}/>}
                                            
                </Form.Field> 
                <Divider/>
                <Form.Field error={!!errors.designation}>
                <label>Designation</label>
                  <Dropdown
                  search
                  selection    
                  options={roleOptions}
                  value={this.state.designation}
                  onChange={this.roleValue.bind(this)}
                />
                {errors.designation && <InlineError text={errors.designation} />}
                </Form.Field>  
                <Form.Field error={!!errors.curriculumVitaeUrl}>
                          <label>Upload Curriculum Vitae</label>    
                          {this.state.curriculumVitaeUrl === null
                      ? 
                      <Dropzone 
                              multiple={false}
                              
                            onDrop={this.handleCurriculumVitaePhotoUpload} >
                            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                if (isDragActive) {
                                  return "This file is authorized";
                                }
                                if (isDragReject) {
                                  return "This file is not authorized";
                                }
                                return acceptedFiles.length || rejectedFiles.length
                                  ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                                  : "Try dropping some files.";
                              }}
                          </Dropzone>
                      :
                        <div>
                          <p>{this.state.curriculumVitaeUrl.name}</p>
                          <img src={this.state.curriculumVitaeUrl} />
                        </div>
                    }

                  {errors.curriculumVitaeUrl && <InlineError text={errors.curriculumVitaeUrl}/>}
                                            
                </Form.Field> 
                <Divider/>
                <Form.Field error={!!errors.dateOfEmployment}>
                  
                <label>Date of Employment </label>{' '}
                <DatePicker selected={this.state.dateOfEmployment} onChange={this.handleEmploymentChange} />
                </Form.Field>
                <Divider/>
                <Form.Field error={!!errors.dateOfTermination}>
                <label>Date of Termination </label>{' '}
                <DatePicker selected={this.state.dateOfTermination} onChange={this.handleTerminationChange} />
              </Form.Field>            
                <Form.Field error={!!errors.currentSalary}>
                <label>Current Salary</label>
                <input
                  placeholder="currentSalary"
                                  value={this.state.currentSalary}
                  type='number'                
                  onChange={e => this.setState({ currentSalary: e.target.value })}
                />
                {errors.currentSalary && <InlineError text={errors.currentSalary} />}
                </Form.Field>          
              <Form.Button fluid positive>Submit</Form.Button>          
                          
                          
            </Segment>
          </Form>        
              </Grid.Column>
          </Grid>
      );      
  }
    
    _createPersonnel = async () => { 
        const { firstName, lastName, nssfId,
            nhifId, idNumber, phoneNumber,
            gender, location, addressNo, 
            photoUrl, highestEducationLevel, certificatesUrl,
            curriculumVitaeUrl, roleId, dateOfEmployment,
            dateOfTermination, currentSalary } = this.state


        await this.props.createPersonnel({
            variables: { firstName, lastName, nssfId,
                nhifId, idNumber, phoneNumber,
                gender, location, addressNo, 
                photoUrl, highestEducationLevel, certificatesUrl,
                curriculumVitaeUrl, roleId, dateOfEmployment,
                dateOfTermination, currentSalary },
            refetchQueries: [{ query: Personnel_Feed_Query }]
        })
        this.props.history.push(`/personnel/list`);
    }

}

export default compose(graphql(Role_Feed_Query, { name: 'roleFeed' }),
  graphql(CREATEPERSONNELMUTATION, { name: "createPersonnel" }))(PersonnelCreate);
