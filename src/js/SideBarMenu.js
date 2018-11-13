import React, { Component } from 'react';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const ColorForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label="Red" name="color" value="red" />
      <Form.Checkbox label="Orange" name="color" value="orange" />
      <Form.Checkbox label="Green" name="color" value="green" />
      <Form.Checkbox label="Blue" name="color" value="blue" />
    </Form.Group>
  </Form>
);

const PersonnelForm = (
  <Menu.Menu>
    <Menu.Item
      name="personnel"
      as={Link}
      to="/personnel/list"
      //active={activeItem === 'personnel'}
      onClick={this.handleItemClick}
    >
      Employee List
    </Menu.Item>
    <Menu.Item
      name="createpersonnel"
      as={Link}
      to="/personnel/new"
      //active={activeItem === 'createpersonnel'}
      onClick={this.handleItemClick}
    >
      Add Employee
    </Menu.Item>
    <Menu.Item
      name="attendance"
      as={Link}
      to="/personnel/attendance"
      //active={activeItem === 'attendance'}
      onClick={this.handleItemClick}
    >
      Add Employee Attendance
    </Menu.Item>
    <Menu.Item
      name="terminatedpersonnel"
      as={Link}
      to="/personnel/termination/list"
      //active={activeItem === 'terminatedpersonnel'}
      onClick={this.handleItemClick}
    >
      Employee Termination List
    </Menu.Item>
    <Menu.Item
      name="terminatepersonnel"
      as={Link}
      to="/personnel/termination/new"
      //active={activeItem === 'terminatepersonnel'}
      onClick={this.handleItemClick}
    >
      Terminate Employee
    </Menu.Item>
    <Menu.Item
      name="personnelroles"
      as={Link}
      to="/personnel/roles/list"
      //active={activeItem === 'personnelroles'}
      onClick={this.handleItemClick}
    >
      Employee Roles
    </Menu.Item>
    <Menu.Item
      name="addroles"
      as={Link}
      to="/personnel/roles/new"
      //active={activeItem === 'addroles'}
      onClick={this.handleItemClick}
    >
      Add Roles
    </Menu.Item>

    <Menu.Item
      name="assignEmployeeToProject"
      as={Link}
      to="/projects/assignpersonnel"
      //active={activeItem === 'assignEmployeeToProject'}
      onClick={this.handleItemClick}
    >
      Assign Employee Project
    </Menu.Item>
  </Menu.Menu>
);

const SalaryForm = (
  <Menu.Menu>
    <Menu.Item
      name="salarieslist"
      to="/salaryrequests/list"
      as={Link}
      //active={activeItem =='salarieslist'}
      onClick={this.handleItemClick}
    >
      Salaries List
    </Menu.Item>

    <Menu.Item
      name="salariesInitiated"
      to="/salaryrequests/initiated"
      as={Link}
      //active={activeItem =='salariesInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="salariesApproved"
      to="/salaryrequests/approved"
      as={Link}
      //active={activeItem =='salariesApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="salariesIssued"
      to="/salaryrequests/issued"
      as={Link}
      //active={activeItem =='salariesIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="salariesNew"
      to="/salaryrequests/new"
      as={Link}
      //active={activeItem =='salariesNew'}
      onClick={this.handleItemClick}
    >
      Create Salaries Requisition
    </Menu.Item>
  </Menu.Menu>
);

const ReportsForm = (
  <Menu.Menu>
    <Menu.Item name="reports" to="/reports/vehicles" as={Link} onClick={this.handleItemClick}>
      Vehicle Reports
    </Menu.Item>
    <Menu.Item name="reports" to="/reports/personnel" as={Link} onClick={this.handleItemClick}>
      Personnel Reports
    </Menu.Item>
    <Menu.Item name="reports" to="/reports/materials" as={Link} onClick={this.handleItemClick}>
      Materials Reports
    </Menu.Item>
    <Menu.Item name="reports" to="/reports/miscellaneous" as={Link} onClick={this.handleItemClick}>
      Miscellaneous Reports
    </Menu.Item>
  </Menu.Menu>
);

const AdvanceForm = (
  <Menu.Menu>
    <Menu.Item
      name="advancerequests"
      to="/advancerequests/list"
      as={Link}
      //active={activeItem =='salarieslist'}
      onClick={this.handleItemClick}
    >
      Advance Request List
    </Menu.Item>

    <Menu.Item
      name="advanceInitiated"
      to="/advancerequests/initiated"
      as={Link}
      //active={activeItem =='salariesInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="advanceApproved"
      to="/advancerequests/approved"
      as={Link}
      //active={activeItem =='salariesApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="advanceIssued"
      to="/advancerequests/issued"
      as={Link}
      //active={activeItem =='salariesIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="advanceNew"
      to="/advancerequests/new"
      as={Link}
      //active={activeItem =='salariesNew'}
      onClick={this.handleItemClick}
    >
      Create Advance Requisition
    </Menu.Item>
  </Menu.Menu>
);

const OverTimeForm = (
  <Menu.Menu>
    <Menu.Item
      name="overtimelist"
      to="/overtimerequests/list"
      as={Link}
      //active={activeItem =='salarieslist'}
      onClick={this.handleItemClick}
    >
      Over Time List
    </Menu.Item>

    <Menu.Item
      name="overtimeInitiated"
      to="/overtimerequests/initiated"
      as={Link}
      //active={activeItem =='salariesInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="overtimeApproved"
      to="/overtimerequests/approved"
      as={Link}
      //active={activeItem =='salariesApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="overtimeIssued"
      to="/overtimerequests/issued"
      as={Link}
      //active={activeItem =='salariesIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="overtimeNew"
      to="/overtimerequests/new"
      as={Link}
      //active={activeItem =='salariesNew'}
      onClick={this.handleItemClick}
    >
      Create Overtime Requisition
    </Menu.Item>
  </Menu.Menu>
);

const VehicleForm = (
  <Menu.Menu>
    <Menu.Item
      name="vehicleownerlist"
      //active={activeItem === 'vehicleownerlist'}
      onClick={this.handleItemClick}
      as={Link}
      to="/vehicleowner/list"
    >
      View Vehicle Owners
    </Menu.Item>
    <Menu.Item
      name="vehicleownernew"
      //active={activeItem === 'vehicleownernew'}
      onClick={this.handleItemClick}
      as={Link}
      to="/vehicleowner/new"
    >
      Add Vehicle Owners
    </Menu.Item>
    <Menu.Item
      name="vehicles"
      as={Link}
      to="/vehicles/list"
      //active={activeItem === 'vehicles'}
      onClick={this.handleItemClick}
    >
      View Car List
    </Menu.Item>

    <Menu.Item
      name="addVehicle"
      to="/vehicles/new"
      as={Link}
      //active={activeItem === 'addVehicle'}
      onClick={this.handleItemClick}
    >
      Add Vehicles
    </Menu.Item>
    <Menu.Item
      name="asignVehicle"
      to="/vehicles/assign"
      as={Link}
      //active={activeItem === 'asignVehicle'}
      onClick={this.handleItemClick}
    >
      Assign Vehicles
    </Menu.Item>
    <Menu.Item
      name="assignedVehicleList"
      to="/vehicles/assignment/list"
      as={Link}
      //active={activeItem == 'asignedVehicleList'}
      onClick={this.handleItemClick}
    >
      Assigned Vehicle List
    </Menu.Item>
  </Menu.Menu>
);
const VehicleRepairForm = (
  <Menu.Menu>
    <Menu.Item
      name="repairsList"
      to="/repairsrequisitions/list"
      as={Link}
      //active={activeItem =='repairsList'}
      onClick={this.handleItemClick}
    >
      Repairs Requisitions List
    </Menu.Item>

    <Menu.Item
      name="repairsInitiated"
      to="/repairsrequisitions/initiated"
      as={Link}
      //active={activeItem =='repairsInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="repairsApproved"
      to="/repairsrequisitions/approved"
      as={Link}
      //active={activeItem =='repairsApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="repairsIssued"
      to="/repairsrequisitions/issued"
      as={Link}
      //active={activeItem =='repairsIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="repairsNew"
      to="/repairsrequisitions/new"
      as={Link}
      //active={activeItem =='repairsNew'}
      onClick={this.handleItemClick}
    >
      Create Repair Requisition
    </Menu.Item>
  </Menu.Menu>
);

const VehicleServiceForm = (
  <Menu.Menu>
    <Menu.Item
      name="serviceList"
      to="/servicerequisitions/list"
      as={Link}
      //active={activeItem =='serviceList'}
      onClick={this.handleItemClick}
    >
      Service Requisitions List
    </Menu.Item>

    <Menu.Item
      name="serviceInitiated"
      to="/servicerequisitions/initiated"
      as={Link}
      //active={activeItem =='serviceInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="serviceApproved"
      to="/servicerequisitions/approved"
      as={Link}
      //active={activeItem =='serviceApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="serviceIssued"
      to="/servicerequisitions/issued"
      as={Link}
      //active={activeItem =='serviceIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="serviceNew"
      to="/servicerequisitions/new"
      as={Link}
      //active={activeItem =='serviceNew'}
      onClick={this.handleItemClick}
    >
      Create Service Requisition
    </Menu.Item>
  </Menu.Menu>
);

const VehicleInspectionForm = (
  <Menu.Menu>
    <Menu.Item
      name="inspectionList"
      to="/inspectionrequisitions/list"
      as={Link}
      //active={activeItem =='inspectionList'}
      onClick={this.handleItemClick}
    >
      Inspection Request List
    </Menu.Item>

    <Menu.Item
      name="inspectionInitiated"
      to="/inspectionrequisitions/initiated"
      as={Link}
      //active={activeItem =='inspectionInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="inspectionApproved"
      to="/inspectionrequisitions/approved"
      as={Link}
      //active={activeItem =='inspectionApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="inspectionIssued"
      to="/inspectionrequisitions/issued"
      as={Link}
      //active={activeItem =='inspectionIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="inspectionNew"
      to="/inspectionrequisitions/new"
      as={Link}
      //active={activeItem =='inspectionNew'}
      onClick={this.handleItemClick}
    >
      Create Inspection Requisition
    </Menu.Item>
  </Menu.Menu>
);

const FuelManagementForm = (
  <Menu.Menu>
    <Menu.Item
      name="fuelList"
      to="/fuelrequisitions/list"
      as={Link}
      //active={activeItem =='fuelList'}
      onClick={this.handleItemClick}
    >
      Fuel Requisitions List
    </Menu.Item>

    <Menu.Item
      name="fuelInitiated"
      to="/fuelrequisitions/initiated"
      as={Link}
      //active={activeItem =='fuelInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="fuelApproved"
      to="/fuelrequisitions/approved"
      as={Link}
      //active={activeItem =='fuelApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="fuelIssued"
      to="/fuelrequisitions/issued"
      as={Link}
      //active={activeItem =='fuelIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="fuelNew"
      to="/fuelrequisitions/new"
      as={Link}
      //active={activeItem =='fuelNew'}
      onClick={this.handleItemClick}
    >
      Create Fuel Requisition
    </Menu.Item>
  </Menu.Menu>
);

const MaterialsManagementForm = (
  <Menu.Menu>
    <Menu.Item
      name="materialsList"
      to="/materials/list"
      as={Link}
      //active={activeItem =='materialsList'}
      onClick={this.handleItemClick}
    >
      Materials List
    </Menu.Item>

    <Menu.Item
      name="materialsNew"
      to="/materials/new"
      as={Link}
      //active={activeItem =='materialsNew'}
      onClick={this.handleItemClick}
    >
      Add Materials
    </Menu.Item>
  </Menu.Menu>
);

const SuppliersManagementForm = (
  <Menu.Menu>
    <Menu.Item
      name="suppliersList"
      to="/suppliers/list"
      as={Link}
      //active={activeItem =='suppliersList'}
      onClick={this.handleItemClick}
    >
      Suppliers List
    </Menu.Item>

    <Menu.Item
      name="suppliersNew"
      to="/suppliers/new"
      as={Link}
      //active={activeItem =='suppliersNew'}
      onClick={this.handleItemClick}
    >
      Add Suppliers
    </Menu.Item>
  </Menu.Menu>
);

const MaterialsRequisitionManagementForm = (
  <Menu.Menu>
    <Menu.Item
      name="materialrequisitionsNew"
      to="/materialrequisitions/new"
      as={Link}
      //active={activeItem =='materialrequisitionsNew'}
      onClick={this.handleItemClick}
    >
      Order Materials
    </Menu.Item>

    <Menu.Item
      name="materialrequisitionsInitiated"
      to="/materialrequisitions/initiated"
      as={Link}
      //active={activeItem =='materialrequisitionsInitiated'}
      onClick={this.handleItemClick}
    >
      View Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="materialrequisitionsApproved"
      to="/materialrequisitions/approved"
      as={Link}
      //active={activeItem =='materialrequisitionsApproved'}
      onClick={this.handleItemClick}
    >
      View Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="materialrequisitionsIssued "
      to="/materialrequisitions/issued "
      as={Link}
      //active={activeItem =='materialrequisitionsIssued '}
      onClick={this.handleItemClick}
    >
      View Issued Cash Requisitions
    </Menu.Item>

    <Menu.Item
      name="materialrequisitionsChequed "
      to="/materialrequisitions/chequed "
      as={Link}
      //active={activeItem =='materialrequisitionsChequed '}
      onClick={this.handleItemClick}
    >
      View Issued Cheque Requisitions
    </Menu.Item>
  </Menu.Menu>
);
const StoresManagementForm = (
  <Menu.Menu>
    <Menu.Item
      name="storeReciepts "
      to="/store/reciepts "
      as={Link}
      //active={activeItem =='storeReciepts '}
      onClick={this.handleItemClick}
    >
      View Store Reciepts
    </Menu.Item>

    <Menu.Item
      name="storeIssues "
      to="/store/issues "
      as={Link}
      //active={activeItem =='storeIssues '}
      onClick={this.handleItemClick}
    >
      View Store Issues
    </Menu.Item>

    <Menu.Item
      name="storeList "
      to="/store/list "
      as={Link}
      //active={activeItem =='storeList '}
      onClick={this.handleItemClick}
    >
      View Store List
    </Menu.Item>
  </Menu.Menu>
);

const ProjectManagementForm = (
  <Menu.Menu>
    <Menu.Item
      name="listprojects"
      as={Link}
      to="/projects/list"
      //active={activeItem === 'listprojects'}
      onClick={this.handleItemClick}
    >
      Project List
    </Menu.Item>
    <Menu.Item
      name="addprojects"
      as={Link}
      to="/projects/new"
      //active={activeItem === 'addprojects'}
      onClick={this.handleItemClick}
    >
      Add Project
    </Menu.Item>
    <Menu.Item
      name="listsections"
      as={Link}
      to="/sections/list"
      //active={activeItem === 'listsections'}
      onClick={this.handleItemClick}
    >
      Sections List
    </Menu.Item>
    <Menu.Item
      name="addsection"
      as={Link}
      to="/section/new"
      //active={activeItem === 'addsection'}
      onClick={this.handleItemClick}
    >
      Add Section
    </Menu.Item>
  </Menu.Menu>
);
const MiscellaneousExpensesForm = (
  <Menu.Menu>
    <Menu.Item
      name="miscellaneouslist"
      to="/miscellaneous/list"
      as={Link}
      //active={activeItem =='miscellaneouslist'}
      onClick={this.handleItemClick}
    >
      Miscellaneous List
    </Menu.Item>

    <Menu.Item
      name="miscellaneousInitiated"
      to="/miscellaneous/initiated"
      as={Link}
      //active={activeItem =='miscellaneousInitiated'}
      onClick={this.handleItemClick}
    >
      Initiated Requisitions
    </Menu.Item>

    <Menu.Item
      name="miscellaneousApproved"
      to="/miscellaneous/approved"
      as={Link}
      //active={activeItem =='miscellaneousApproved'}
      onClick={this.handleItemClick}
    >
      Approved Requisitions
    </Menu.Item>

    <Menu.Item
      name="miscellaneousIssued"
      to="/miscellaneous/issued"
      as={Link}
      //active={activeItem =='miscellaneousIssued'}
      onClick={this.handleItemClick}
    >
      Issued Requisitions
    </Menu.Item>

    <Menu.Item
      name="miscellaneousNew"
      to="/miscellaneous/new"
      as={Link}
      //active={activeItem =='miscellaneousNew'}
      onClick={this.handleItemClick}
    >
      Create Miscellaneous Requisition
    </Menu.Item>
  </Menu.Menu>
);

const UserManagementForm = (
  <Menu.Menu>
    <Menu.Item
      name="viewUsers"
      to="/users/list"
      as={Link}
      //active={activeItem === 'viewUsers'}
      onClick={this.handleItemClick}
    >
      View Users
    </Menu.Item>
    <Menu.Item
      name="createUsers"
      to="/users/register"
      as={Link}
      //active={activeItem === 'createUsers'}
      onClick={this.handleItemClick}
    >
      Register New User
    </Menu.Item>
  </Menu.Menu>
);
export default class SideBarMenu extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title active={activeIndex === 0} content="Staff Management" index={0} onClick={this.handleClick} />
          <Accordion.Content active={activeIndex === 0} content={PersonnelForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content="Salary Management"
            index={1}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 1} content={SalaryForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 2}
            content="Advances Management"
            index={2}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 2} content={AdvanceForm} />
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 3}
            content="Overtime Management"
            index={3}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 3} content={OverTimeForm} />
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 4}
            content="Vehicle Management"
            index={4}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 4} content={VehicleForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title active={activeIndex === 5} content="Vehicle Repairs" index={5} onClick={this.handleClick} />
          <Accordion.Content active={activeIndex === 5} content={VehicleRepairForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title active={activeIndex === 6} content="Vehicle Service" index={6} onClick={this.handleClick} />
          <Accordion.Content active={activeIndex === 6} content={VehicleServiceForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 7}
            content="Vehicle Inspection"
            index={7}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 7} content={VehicleInspectionForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title active={activeIndex === 8} content="Fuel Management" index={8} onClick={this.handleClick} />
          <Accordion.Content active={activeIndex === 8} content={FuelManagementForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 9}
            content="Materials Management"
            index={9}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 9} content={MaterialsManagementForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 10}
            content="Suppliers Management"
            index={10}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 10} content={SuppliersManagementForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 11}
            content="Material Requisitions"
            index={11}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 11} content={MaterialsRequisitionManagementForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 12}
            content="Stores Management"
            index={12}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 12} content={StoresManagementForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 13}
            content="Miscellaneous Expenses"
            index={13}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 13} content={MiscellaneousExpensesForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 14}
            content="Project Management"
            index={14}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 14} content={ProjectManagementForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 15}
            content="User Management"
            index={15}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 15} content={UserManagementForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 15}
            content="Project Reports"
            index={15}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 15} content={ReportsForm} />
        </Menu.Item>
      </Accordion>
    );
  }
}
