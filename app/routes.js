import Dashboard from 'containers/Layout/Dashboard';
import Icons from 'containers/Layout/Icons';
import Map from 'containers/Layout/Map';
import Notifications from 'containers/Layout/Notifications';
import TableList from 'containers/Layout/TableList';
import Typography from 'containers/Layout/Typography';
import UserProfile from 'containers/Layout/UserProfile';
import UserList from 'containers/UserList/Loadable';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'User Management',
    icon: 'tim-icons icon-single-02',
    component: UserList,
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'tim-icons icon-atom',
    component: Icons,
    layout: '/admin',
  },
  {
    path: '/map',
    name: 'Map',
    icon: 'tim-icons icon-pin',
    component: Map,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'tim-icons icon-bell-55',
    component: Notifications,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'tim-icons icon-single-02',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Table List',
    icon: 'tim-icons icon-puzzle-10',
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'tim-icons icon-align-center',
    component: Typography,
    layout: '/admin',
  },
];

export default routes;
