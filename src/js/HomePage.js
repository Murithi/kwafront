import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import { Segment, Icon, Image, Grid } from 'semantic-ui-react'
import SideBarMenu from './SideBarMenu'
import Vehicles from './Vehicles'
import CreateVehicle from './CreateVehicle'
import CreateVehicleOwner from './CreateVehicleOwner'
import VehicleOwnerList from './VehicleOwnerList'
import VehicleOwnerDetail from './VehicleOwnerDetails'
import VehicleOwnerEdit from './VehicleOwnerEdit'
import VehicleDetails from './VehicleDetails'
import PersonnelList from './PersonnelList'
import PersonnelCreate from './PersonnelCreate'
import PersonnelDetails from './PersonnelDetails'
import TerminationList from './TerminationList'
import SearchPersonnel from './SearchPersonnel'
import PersonnelTerminate from './PersonnelTerminate'
import PersonnelRoles from './PersonnelRoles'
import PersonnelRolesCreate from './PersonnelRolesCreate'
import ProjectList from './ProjectList'
import ProjectDetails from './ProjectDetails'
import ProjectCreate from './ProjectCreate'
import SectionsList from './SectionsList'
import SectionsCreate from './SectionsCreate'
import DriversAdd from './DriversCreate'
import DriversList from './DriversList'
import AssignVehicle from './VehicleAssign'
import AssignPersonnelProject from './AssignPersonnelProject'
import PersonnelByRolesListing from './PersonnelByRolesListing'
import ServiceRequisitionsList from './ServiceRequisitionsList'
import ServiceRequisitionCreate from './ServiceRequisitionCreate'
import PersonnelAttendanceRecord from './PersonnelAttendanceRecord'
import ServiceRequisitionsInitiated from './ServiceRequisitionsInitiated'
import ServiceRequisitionsByUser from './ServiceRequisitionsInitiated'
import ServiceRequisitionApprove from './ServiceRequisitionApprove'
import ServiceRequisitionsApproved from './ServiceRequisitionsApproved'
import ServiceRequisitionsIssuedCash from './ServiceRequisitionsIssuedCash'
import RepairsRequisitionsCreate from './RepairsRequisitionsCreate'
import RepairsRequisitionsInititated from './RepairsRequisitionsInititated'
import RepairsRequisitionsApprove from './RepairsRequisitionsApprove'
import RepairsRequisitionsApproved from './RepairsRequisitionsApproved'
import RepairsRequisitionsIssuedCash from './RepairsRequisitionsIssuedCash'
import RepairsRequisitionsList from './RepairsRequisitionsList'
import MaterialsList from './materialsList.'
import MaterialsCreate from './MaterialsCreate'
import MaterialsEdit from './MaterialsEdit'
import MaterialsDetails from './MaterialsDetails'
import IssueCash from './IssueCash'
import ReportCash from './ReportCash'
import IssueRepairsCash from './IssueRepairsCash'
import ReportRepairsRequisitionsCash from './ReportRepairsRequisitionsCash'
import SuppliersCreate from './SuppliersCreate'
import SuppliersEdit from './SuppliersEdit'
import SuppliersList from './SuppliersList'
import Users from './Users'
import RegisterUsers from './RegisterUsers'
import Signup from './Signup'
import MaterialRequisitionCreate from './MaterialRequisitionCreate'
import MaterialRequistionInitiated from './MaterialRequisitionInitiated'
import VehicleAssignmentList from './VehicleAssignmentList'
import MaterialRequisitionsApprove from './MaterialRequisitionsApprove'
import MaterialRequisitionsApproved from './MaterialRequisitionsApproved'
import MaterialRequisitionsIssueCash from './MaterialRequisitionsIssueCash'
import MaterialRequisitionsIssuedCash from './MaterialRequisitionsIssuedCash'
import MaterialRequisitionReport from './MaterialRequisitionsReport.js'
import MaterialRequisitionsIssueCheque from './MaterialRequisitionsIssueCheque'
import MaterialRequisitionsIssuedCheque from './MaterialRequisitionsIssuedCheque'
import StoreReciepts from './StoreReciepts'
import StoreIssues from './StoreIssues'
import StoreList from './StoreList'
import InspectionRequestCreate from './InspectionRequestCreate'
import InspectionRequestsInitiated from './InspectionRequestsInitiated'
import InspectionRequestApprove from './InspectionRequestApprove'
import InspectionRequisitionsApproved from './InspectionRequestApproved'
import IssueInspectionCash from './IssueInspectionCash'
import InspectionIssuedCash from './InspectionIssuedCash'
import ReportInspectionCash from './ReportInspectionCash'
import InspectionList from './InspectionList'
import FuelRequestCreate from './FuelRequestCreate'
import FuelRequestsInitiated from './FuelRequestsInitiated'
import FuelRequestsApprove from './FuelRequestsApprove'
import FuelRequestsApproved from './FuelRequestsApproved'
import FuelRequestsIssueCash from './FuelRequestsIssueCash'
import FuelRequestsIssuedCash from './FuelRequestsIssuedCash'
import ReportFuelRequestCash from './ReportFuelRequestCash'
import FuelRequestsList from './FuelRequestsList'
import AdvanceRequestCreate from './AdvanceRequestCreate'
import AdvanceRequestInitiated from './AdvanceRequestInitiated'
import AdvanceRequestApprove from './AdvanceRequestApprove'
import AdvanceRequestsApproved from './AdvanceRequestsApproved'
import IssueAdvanceCash from './IssueAdvanceCash'
import AdvanceRequestList from './AdvanceRequestList'
import CashBalancesList from './CashBalancesList'
import CashBalancesDetails from './CashBalancesDetails'
import PaymentListing from './PaymentListing'
import CashRecord from './CashRecord'
import AccountStatement from './AccountStatement'
import SalaryRequestCreate from './SalaryRequestCreate'
import SalaryRequestsInitiated from './SalaryRequestsInitiated'
import SalaryRequestApprove from './SalaryRequestApprove'
import SalaryRequestsApproved from './SalaryRequestsApproved'
import IssueSalaryCash from './IssueSalaryCash'
import SalaryCashIssued from './IssuedSalaryCash'
import SalaryRequestsList from './SalaryRequestsList'
import MiscellaneousCreate from './MiscellaneousCreate'
import MiscellaneousInititated from './MiscellaneousInititated'
import MiscellaneousApprove from './MiscellaneousApprove'
import MiscellaneousApproved from './MiscellaneousApproved'
import MiscellaneousIssueCash from './MiscellaneousIssueCash'
import MiscellaneousIssuedCash from './MiscellaneousIssuedCash'
import MiscellaneousReport from './MiscellaneousReport'
import AdvanceRequestsIssued from './AdvanceRequestsIssued'
import VehicleReport from './VehicleReport'
import VehicleSummary from './VehicleSummary'
import PersonnelSummary from './PersonnelSummary'
import MaterialsSummary from './MaterialsSummary'
import MiscellaneousSummary from './MiscellaneousSummary'
import StoreIssuesList from './StoreIssuesList'
import OverTimeInitiated from './OverTimeInitiated'
import OverTimeCreate from './OverTimeCreate'
import UserDetails from './UserDetails'
import OverTimeApprove from './OverTimeApprove'
import OverTimeApproved from './OverTimeApproved'
import OverTimeIssue from './OverTimeIssue'
// import PersonnelReport from './PersonnelReport'
// import MaterialsReport from './MaterialsReport'
// import SupplierReport from './SupplierReport'
// import AccountReport from './AccountReport'
// import UserReport from './UserReport'

class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	logout = () => {
		localStorage.removeItem('auth-token')
		this.props.history.push(`/login`)
	}
	render() {
		return (
			<Grid>
				<Grid.Column width={3}>
					<SideBarMenu />
				</Grid.Column>
				<Grid.Column stretched width={13}>
					<Segment>
						<Switch>
							<Route exact path="/users/list" component={Users} />
							<Route exact path="/users/register" component={RegisterUsers} />
							<Route exact path="/users/:id" component={UserDetails} />

							<Route exact path="/vehicles/list" component={Vehicles} />
							<Route exact path="/vehicles/new" component={CreateVehicle} />
							<Route exact path="/vehicles/assign" component={AssignVehicle} />
							<Route
								exact
								path="/vehicles/edit/:id"
								component={VehicleOwnerEdit}
							/>
							<Route exact path="/vehicles/:id" component={VehicleDetails} />
							<Route
								exact
								path="/vehicles/assignment/list"
								component={VehicleAssignmentList}
							/>

							<Route
								exact
								path="/vehicleowner/list"
								component={VehicleOwnerList}
							/>
							<Route
								exact
								path="/vehicleowner/new"
								component={CreateVehicleOwner}
							/>
							<Route
								exact
								path="/vehicleowner/edit/:id"
								component={VehicleOwnerEdit}
							/>
							<Route
								exact
								path="/vehicleowner/:id"
								component={VehicleOwnerDetail}
							/>

							<Route exact path="/personnel/list" component={PersonnelList} />
							<Route exact path="/personnel/new" component={PersonnelCreate} />
							<Route
								exact
								path="/personnel/termination/list"
								component={TerminationList}
							/>
							<Route
								exact
								path="/personnel/termination/new"
								component={SearchPersonnel}
							/>
							<Route
								exact
								path="/personnel/search"
								component={SearchPersonnel}
							/>
							<Route
								exact
								path="/personnel/roles/list"
								component={PersonnelRoles}
							/>
							<Route
								exact
								path="/personnel/attendance"
								component={PersonnelAttendanceRecord}
							/>
							<Route
								exact
								path="/personnel/roles/new"
								component={PersonnelRolesCreate}
							/>
							<Route
								exact
								path="/personnel/roles/:id"
								component={PersonnelByRolesListing}
							/>
							<Route
								exact
								path="/personnel/termination/:id"
								component={PersonnelTerminate}
							/>
							<Route exact path="/personnel/:id" component={PersonnelDetails} />

							<Route exact path="/projects/list" component={ProjectList} />
							<Route exact path="/projects/new" component={ProjectCreate} />
							<Route
								exact
								path="/projects/assignpersonnel"
								component={AssignPersonnelProject}
							/>
							<Route exact path="/projects/:id" component={ProjectDetails} />
							<Route exact path="/sections/list" component={SectionsList} />
							<Route exact path="/sections/new" component={SectionsCreate} />

							{/* <Route exact path = '/drivers/list' component={DriversList} />
              <Route exact path='/drivers/new' component={DriversAdd} /> */}

							<Route
								exact
								path="/servicerequisitions/list"
								component={ServiceRequisitionsList}
							/>
							<Route
								exact
								path="/servicerequisitions/new"
								component={ServiceRequisitionCreate}
							/>
							<Route
								exact
								path="/servicerequisitions/initiated/all"
								component={ServiceRequisitionsInitiated}
							/>
							<Route
								exact
								path="/servicerequisitions/initiated"
								component={ServiceRequisitionsByUser}
							/>
							<Route
								exact
								path="/servicerequisitions/approve/:id"
								component={ServiceRequisitionApprove}
							/>
							<Route
								exact
								path="/servicerequisitions/approved"
								component={ServiceRequisitionsApproved}
							/>
							<Route
								exact
								path="/servicerequisitions/issued"
								component={ServiceRequisitionsIssuedCash}
							/>
							<Route
								exact
								path="/servicerequisitions/report/:id"
								component={ReportCash}
							/>
							<Route
								exact
								path="/servicerequisitions/issue/:id"
								component={IssueCash}
							/>

							<Route
								exact
								path="/repairsrequisitions/new"
								component={RepairsRequisitionsCreate}
							/>
							<Route
								exact
								path="/repairsrequisitions/initiated"
								component={RepairsRequisitionsInititated}
							/>
							<Route
								exact
								path="/repairsrequisitions/approve/:id"
								component={RepairsRequisitionsApprove}
							/>
							<Route
								exact
								path="/repairsrequisitions/approved"
								component={RepairsRequisitionsApproved}
							/>
							<Route
								exact
								path="/repairsrequisitions/issue/:id"
								component={IssueRepairsCash}
							/>
							<Route
								exact
								path="/repairsrequisitions/issued"
								component={RepairsRequisitionsIssuedCash}
							/>
							<Route
								exact
								path="/repairsrequisitions/report/:id"
								component={ReportRepairsRequisitionsCash}
							/>
							<Route
								exact
								path="/repairsrequisitions/list"
								component={RepairsRequisitionsList}
							/>

							<Route
								exact
								path="/inspectionrequisitions/new"
								component={InspectionRequestCreate}
							/>
							<Route
								exact
								path="/inspectionrequisitions/initiated"
								component={InspectionRequestsInitiated}
							/>
							<Route
								exact
								path="/inspectionrequisitions/approve/:id"
								component={InspectionRequestApprove}
							/>
							<Route
								exact
								path="/inspectionrequisitions/approved"
								component={InspectionRequisitionsApproved}
							/>
							<Route
								exact
								path="/inspectionrequisitions/issue/:id"
								component={IssueInspectionCash}
							/>
							<Route
								exact
								path="/inspectionrequisitions/issued"
								component={InspectionIssuedCash}
							/>
							<Route
								exact
								path="/inspectionrequisitions/report/:id"
								component={ReportInspectionCash}
							/>
							<Route
								exact
								path="/inspectionrequisitions/list"
								component={InspectionList}
							/>

							<Route
								exact
								path="/fuelrequisitions/new"
								component={FuelRequestCreate}
							/>
							<Route
								exact
								path="/fuelrequisitions/initiated"
								component={FuelRequestsInitiated}
							/>
							<Route
								exact
								path="/fuelrequisitions/approve/:id"
								component={FuelRequestsApprove}
							/>
							<Route
								exact
								path="/fuelrequisitions/approved"
								component={FuelRequestsApproved}
							/>
							<Route
								exact
								path="/fuelrequisitions/issue/:id"
								component={FuelRequestsIssueCash}
							/>
							<Route
								exact
								path="/fuelrequisitions/issued"
								component={FuelRequestsIssuedCash}
							/>
							<Route
								exact
								path="/fuelrequisitions/report/:id"
								component={ReportFuelRequestCash}
							/>
							<Route
								exact
								path="/fuelrequisitions/list"
								component={FuelRequestsList}
							/>

							<Route
								exact
								path="/advancerequests/new"
								component={AdvanceRequestCreate}
							/>
							<Route
								exact
								path="/advancerequests/initiated"
								component={AdvanceRequestInitiated}
							/>
							<Route
								exact
								path="/advancerequests/approve/:id"
								component={AdvanceRequestApprove}
							/>
							<Route
								exact
								path="/advancerequests/approved"
								component={AdvanceRequestsApproved}
							/>
							<Route
								exact
								path="/advancerequests/issue/:id"
								component={IssueAdvanceCash}
							/>
							<Route
								exact
								path="/advancerequests/list"
								component={AdvanceRequestList}
							/>
							<Route
								exact
								path="/advancerequests/issued"
								component={AdvanceRequestsIssued}
							/>

							<Route
								exact
								path="/salaryrequests/new"
								component={SalaryRequestCreate}
							/>
							<Route
								exact
								path="/salaryrequests/initiated"
								component={SalaryRequestsInitiated}
							/>
							<Route
								exact
								path="/salaryrequests/approve/:id"
								component={SalaryRequestApprove}
							/>
							<Route
								exact
								path="/salaryrequests/approved"
								component={SalaryRequestsApproved}
							/>
							<Route
								exact
								path="/salaryrequests/issue/:id"
								component={IssueSalaryCash}
							/>
							<Route
								exact
								path="/salaryrequests/issued"
								component={SalaryCashIssued}
							/>
							<Route
								exact
								path="/salaryrequests/list"
								component={SalaryRequestsList}
							/>

							<Route
								exact
								path="/overtimerequests/new"
								component={OverTimeCreate}
							/>
							<Route
								exact
								path="/overtimerequests/initiated"
								component={OverTimeInitiated}
							/>
							<Route
								exact
								path="/overtimerequests/approve/:id"
								component={OverTimeApprove}
							/>
							<Route
								exact
								path="/overtimerequests/approved"
								component={OverTimeApproved}
							/>
							<Route
								exact
								path="/overtimerequests/issue/:id"
								component={OverTimeIssue}
							/>

							<Route exact path="/materials/list" component={MaterialsList} />
							<Route exact path="/materials/new" component={MaterialsCreate} />
							<Route
								exact
								path="/materials/edit/:id"
								component={MaterialsEdit}
							/>
							<Route
								exact
								path="/materials/details/:id"
								component={MaterialsDetails}
							/>

							<Route exact path="/suppliers/new" component={SuppliersCreate} />
							<Route exact path="/suppliers/list" component={SuppliersList} />
							<Route
								exact
								path="/suppliers/edit/:id"
								component={SuppliersEdit}
							/>

							<Route
								exact
								path="/materialrequisitions/new"
								component={MaterialRequisitionCreate}
							/>
							<Route
								exact
								path="/materialrequisitions/initiated"
								component={MaterialRequistionInitiated}
							/>
							<Route
								exact
								path="/materialrequisitions/approve/:id"
								component={MaterialRequisitionsApprove}
							/>
							<Route
								exact
								path="/materialrequisitions/approved"
								component={MaterialRequisitionsApproved}
							/>
							<Route
								exact
								path="/materialrequisitions/issuecash/:id"
								component={MaterialRequisitionsIssueCash}
							/>
							<Route
								exact
								path="/materialrequisitions/issuecheque/:id"
								component={MaterialRequisitionsIssueCheque}
							/>
							<Route
								exact
								path="/materialrequisitions/issued"
								component={MaterialRequisitionsIssuedCash}
							/>
							<Route
								exact
								path="/materialrequisitions/report/:id"
								component={MaterialRequisitionReport}
							/>
							<Route
								exact
								path="/materialrequisitions/chequed"
								component={MaterialRequisitionsIssuedCheque}
							/>

							<Route
								exact
								path="/miscellaneous/new"
								component={MiscellaneousCreate}
							/>
							<Route
								exact
								path="/miscellaneous/initiated"
								component={MiscellaneousInititated}
							/>
							<Route
								exact
								path="/miscellaneous/approve/:id"
								component={MiscellaneousApprove}
							/>
							<Route
								exact
								path="/miscellaneous/approved"
								component={MiscellaneousApproved}
							/>
							<Route
								exact
								path="/miscellaneous/issue/:id"
								component={MiscellaneousIssueCash}
							/>
							<Route
								exact
								path="/miscellaneous/issued"
								component={MiscellaneousIssuedCash}
							/>
							<Route
								exact
								path="/miscellaneous/report/:id"
								component={MiscellaneousReport}
							/>

							<Route
								exact
								path="/reports/vehicles"
								component={VehicleSummary}
							/>
							<Route
								exact
								path="/reports/vehicles/:id"
								component={VehicleReport}
							/>
							<Route
								exact
								path="/reports/personnel"
								component={PersonnelSummary}
							/>
							<Route
								exact
								path="/reports/materials"
								component={MaterialsSummary}
							/>
							<Route
								exact
								path="/reports/miscellaneous"
								component={MiscellaneousSummary}
							/>

							<Route exact path="/store/reciepts" component={StoreReciepts} />
							<Route exact path="/store/issues" component={StoreIssues} />
							<Route exact path="/store/list" component={StoreList} />
							<Route
								exact
								path="/store/issues/list"
								component={StoreIssuesList}
							/>
							<Route
								exact
								path="/cashbalances/list"
								component={CashBalancesList}
							/>
							<Route
								exact
								path="/cashbalances/:id"
								component={CashBalancesDetails}
							/>
							<Route exact path="/cash/in" component={CashRecord} />
							<Route
								exact
								path="/cash/statement/:id"
								component={AccountStatement}
							/>

							<Route exact path="/payments/list" component={PaymentListing} />
						</Switch>
					</Segment>
				</Grid.Column>
			</Grid>
		)
	}
}

export default withRouter(HomePage)
