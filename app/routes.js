import DashboardSample from 'containers/Layout/Dashboard';
import Icons from 'containers/Layout/Icons';
import Notifications from 'containers/Layout/Notifications';
import TableList from 'containers/Layout/TableList';
import Typography from 'containers/Layout/Typography';
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
    layout: '/admin',
  },
  {
    path: '/time-sheet',
    name: 'Time-sheet',
    icon: 'tim-icons icon-bullet-list-67',
    component: TimeSheet,
    layout: '/admin',
  },
  {
    path: '/leave',
    name: 'Leave',
    icon: 'tim-icons icon-send',
    component: Leave,
    layout: '/admin',
  },
  {
    path: '/information',
    name: 'Information',
    icon: 'tim-icons icon-alert-circle-exc',
    component: UserInfo,
    layout: '/admin',
  },
  {
    path: '/contact',
    name: 'Directory',
    icon: 'tim-icons icon-single-02',
    component: UserList,
    layout: '/admin',
  },
  {
    path: '/seating-management',
    name: 'Seating plan',
    icon: 'tim-icons icon-molecule-40',
    component: SeatingPlan,
    layout: '/admin',
  },
  {
    path: '/departments',
    name: 'Departments',
    icon: 'tim-icons icon-components',
    component: DepartmentList,
    layout: '/admin',
  },
  {
    path: '/salaries',
    name: 'Salaries',
    icon: 'tim-icons icon-money-coins',
    component: SalaryManagement,
    layout: '/admin',
  },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: 'tim-icons icon-atom',
  //   component: Icons,
  //   layout: '/admin',
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: 'tim-icons icon-bell-55',
  //   component: Notifications,
  //   layout: '/admin',
  // },
  // {
  //   path: '/tables',
  //   name: 'Table List',
  //   icon: 'tim-icons icon-puzzle-10',
  //   component: TableList,
  //   layout: '/admin',
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   icon: 'tim-icons icon-align-center',
  //   component: Typography,
  //   layout: '/admin',
  // },
];

export default routes;
