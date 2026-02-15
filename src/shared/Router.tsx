import MainLayout from '@components/layout/Main';
import { ROUTE_PUBLIC } from '@constants/route';
import CurrencyRate from '@modules/currencyRate';

import {
  BrowserRouter,
  Navigate,
  useRoutes,
  type RouteObject,
} from 'react-router-dom';

const publicRoute: RouteObject = {
  path: ROUTE_PUBLIC.HOME,
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={ROUTE_PUBLIC.CURRENCY_RATE} replace />,
    },
    {
      path: ROUTE_PUBLIC.CURRENCY_RATE,
      element: <CurrencyRate />,
    },
  ],
};

const Router = () => {
  const Routes = () => useRoutes([publicRoute]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default Router;
