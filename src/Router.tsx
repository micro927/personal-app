import { AuthContext } from '@components/AuthProvider/context';
import MainLayout from '@components/layout/Main';
import { ROUTE } from '@constants/route';
import CoupleDebt from '@modules/coupleDebt';
import Home from '@modules/home';
import Login from '@modules/login';
import { useContext } from 'react';
import {
  BrowserRouter,
  Navigate,
  useRoutes,
  type RouteObject,
} from 'react-router-dom';

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTE.HOME,
        index: true,
        element: <Home />,
      },
      {
        path: ROUTE.COUPLE_DEBT,
        element: <CoupleDebt />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTE.HOME} replace />,
  },
];

const authRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTE.LOGIN,
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTE.LOGIN} replace />,
  },
];

const Router = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const Routes = () => useRoutes(isLoggedIn ? routes : authRoutes);
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default Router;
