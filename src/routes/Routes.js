import Login from 'src/pages/Login/Login';
import UserInfo from 'src/pages/UserInfo/UserInfo';

const publicRoutes = [
  { path: '/', component: Map },
  { path: 'login', component: Login },
  { path: '/user/info', component: UserInfo },
];

export { publicRoutes };
