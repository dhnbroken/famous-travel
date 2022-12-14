import Login from 'src/pages/Login/Login';
import UserInfo from 'src/pages/UserInfo/UserInfo';
import Chat from 'src/pages/Chat/Chat';

const publicRoutes = [
  { path: '/', component: Map },
  { path: '/login', component: Login },
  { path: '/user/info', component: UserInfo },
  { path: '/chat', component: Chat },
];

export { publicRoutes };
