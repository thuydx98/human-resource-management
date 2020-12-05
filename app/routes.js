import Dashboard from 'containers/Layouts/Dashboard';
import Icons from 'containers/Layouts/Icons';
import Map from 'containers/Layouts/Map';
import Notifications from 'containers/Layouts/Notifications';
import TableList from 'containers/Layouts/TableList';
import Typography from 'containers/Layouts/Typography';
import UserProfile from 'containers/Layouts/UserProfile';
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
