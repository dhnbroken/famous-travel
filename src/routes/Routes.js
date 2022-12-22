import Login from 'src/pages/Login/Login';
import UserInfo from 'src/pages/UserInfo/UserInfo';
import Location from 'src/pages/Location/Location';
import ChatRoom from 'src/components/ChatRoom';
import Home from 'src/pages/Home/Home';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/user/info', component: UserInfo },
  { path: '/location', component: Location },
  { path: '/chat', component: ChatRoom },
];

export { publicRoutes };
