import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Condominios = React.lazy(() => import('./views/Condominios'));
const Assembleias = React.lazy(() => import('./views/Assembleias'));
const AssembleiaDocumentos = React.lazy(() => import('./views/AssembleiaDocumentos'));


const Logout = React.lazy(() => import('./views/logout'));
const Wall = React.lazy(() => import('./views/Wall'));
const Documents = React.lazy(() => import('./views/Documents'));
const Reservations = React.lazy(() => import('./views/Reservations'));
const Users = React.lazy(() => import('./views/Users'));
const Commonareas= React.lazy(() => import('./views/Commonareas'));
const Units= React.lazy(() => import('./views/Units'));
const RecoveryPassword = React.lazy(() => import('./views/RecoveryPassword'));






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/condominios', name: 'Lista de Condôminios', component: Condominios },
  { path: '/assembleias', name: 'Lista de Assembleias', component: Assembleias },
  { path: '/AssembleiaDocumentos/:id', name: 'Lista de Documentos', component: AssembleiaDocumentos },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/wall', name: 'Wall', component: Wall },
  { path: '/documents', name: 'Documents', component: Documents },
  { path: '/reservations', name: 'Reservations', component: Reservations },
  { path: '/commonareas', name: 'Áreas Comuns', component: Commonareas },
  { path: '/units', name: 'Unidades', component: Units },

  { path: '/users', name: 'Users', component: Users },
  { path: '/RecoveryPassword', name: 'RecoveryPassword', component: RecoveryPassword },




];

export default routes;
