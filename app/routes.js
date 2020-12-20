import UserList from 'containers/UserList/Loadable';
import DepartmentList from './containers/DepartmentList/Loadable';
import Leave from './containers/Leave/Loadable';
import SalaryManagement from './containers/SalaryManagement/Loadable';
import SeatingPlan from './containers/SeatingPlan/Loadable';
import UserInfo from './containers/UserInfo/Loadable';
import Dashboard from './containers/Dashboard/Loadable';
import TimeSheet from './containers/TimeSheet/Loadable';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
  },
  {
    path: '/time-sheet/:userId?',
    uri: '/time-sheet',
    name: 'Time-sheet',
    icon: 'tim-icons icon-bullet-list-67',
    component: TimeSheet,
  },
  {
    path: '/leave',
    name: 'Leave',
    icon: 'tim-icons icon-send',
    component: Leave,
  },
  {
    path: '/information/:userId?',
    uri: '/information',
    name: 'Information',
    icon: 'tim-icons icon-alert-circle-exc',
    component: UserInfo,
  },
  {
    path: '/contact',
    name: 'Directory',
    icon: 'tim-icons icon-single-02',
    component: UserList,
  },
  {
    path: '/seating-management',
    name: 'Seating plan',
    icon: 'tim-icons icon-molecule-40',
    component: SeatingPlan,
  },
  {
    path: '/departments',
    name: 'Departments',
    icon: 'tim-icons icon-components',
    component: DepartmentList,
  },
  {
    path: '/salaries',
    name: 'Salaries',
    icon: 'tim-icons icon-money-coins',
    component: SalaryManagement,
  },
];

export default routes;
