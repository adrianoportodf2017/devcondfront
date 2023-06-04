import React from 'react'


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Condominios = React.lazy(() => import('./views/Condominios'));
const Logout = React.lazy(() => import('./views/logout'));
const Wall = React.lazy(() => import('./views/Wall'));
const Documents = React.lazy(() => import('./views/Documents'));
const Reservations = React.lazy(() => import('./views/Reservations'));
const Users = React.lazy(() => import('./views/Users'));




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/condominios', name: 'Lista de Condôminios', element: Condominios },
  { path: '/logout', name: 'Logout', element: Logout },
  { path: '/wall', name: 'Wall', element: Wall },
  { path: '/documents', name: 'Documents', element: Documents },
  { path: '/reservations', name: 'Reservations', element: Reservations },
  { path: '/users', name: 'Users', element: Users },



];

export default routes;
