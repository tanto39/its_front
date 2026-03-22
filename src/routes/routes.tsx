import { Navigate, RouteObject } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/LoginPage/LoginPage';
import Cars from '../pages/Cars/Cars';
import Car from '../pages/Car/Car';
import Unit from '../pages/Unit/Unit';
import TechRequests from '../pages/TechRequests/TechRequests';
import TechRequest from '../pages/TechRequest/TechRequest';
import Stat from '../pages/Stat/Stat';
import Page404 from '../pages/Page404/Page404';
import Users from '../pages/Users/Users';
import User from '../pages/User/User';


export const publicRoutes: RouteObject[] = [
  { path: "/", element: <LoginPage/> },
  { path: "*", element: <Navigate replace to="/" /> },
];

export const privateRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard/> },
  { path: '/cars', element: <Cars /> },
  { path: '/cars/:id', element: <Car /> },
  { path: '/unit/:id', element: <Unit /> },
  { path: '/tech_requests', element: <TechRequests /> },
  { path: '/tech_requests/:id', element: <TechRequest /> },
  { path: '/stat', element: <Stat /> },
  { path: '/users', element: <Users /> },
  { path: '/users/:id', element: <User /> },
  { path: '/404', element: <Page404 /> },
  { path: "*", element: <Navigate replace to="/404" /> },
];