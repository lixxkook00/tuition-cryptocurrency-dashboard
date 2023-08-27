import { Navigate, useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import BlogPage from './pages/BlogPage';
import UserPage from './pages/user';
import LoginPage from './pages/login';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/dash-board';
import AdminWallet from './pages/admin-wallet';
import Tuition from './pages/tuition';

import { setUserInfor } from './actions';

const checkAuthentication = (dispatch) => {
  if(JSON.parse(localStorage.getItem('user')) !== null){

    dispatch(setUserInfor(JSON.parse(localStorage.getItem('user'))))

    return true;
  }

  return false;
}

const AuthenticatedRoute = ({ element, redirectTo, path , dispatch}) => {
  const isAuthenticated = checkAuthentication(dispatch); 

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default function Router() {

  const dispatch = useDispatch();

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: 
        <AuthenticatedRoute
          redirectTo="/login"
          element={<DashboardLayout />}
          dispatch={dispatch}
        />
      ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'admin-wallet', element: <AdminWallet /> },
        { path: 'tuition', element: <Tuition /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
