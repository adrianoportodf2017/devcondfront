import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Condominios = React.lazy(() => import('./views/Condominios'));
const Assembleias = React.lazy(() => import('./views/Assembleias'));
const AssembleiaDocumentos = React.lazy(() => import('./views/AssembleiaDocumentos'));
const Folders = React.lazy(() => import('./views/Folders'));
const ListFolder = React.lazy(() => import('./views/ListFolder'));
const NewFolder = React.lazy(() => import('./views/NewFolder'));

const Logout = React.lazy(() => import('./views/logout'));
const Wall = React.lazy(() => import('./views/Wall'));
const News = React.lazy(() => import('./views/News'));
const Benefits = React.lazy(() => import('./views/Benefits'));
const ServiceProviders = React.lazy(() => import('./views/ServiceProviders'));
const Polls = React.lazy(() => import('./views/Poll'));
const Classified = React.lazy(() => import('./views/Classified'));
const Gallery = React.lazy(() => import('./views/Gallery'));
const Videos = React.lazy(() => import('./views/Videos'));
const Warning = React.lazy(() => import('./views/Warning'));
const LostAndFound = React.lazy(() => import('./views/LostAndFound'));


const Category = React.lazy(() => import('./views/Category'));
const Documents = React.lazy(() => import('./views/Documents'));
const Reservations = React.lazy(() => import('./views/Reservations'));
const Users = React.lazy(() => import('./views/Users'));
const Profiles = React.lazy(() => import('./views/Profiles'));
const Guardhouse = React.lazy(() => import('./views/Guardhouse'));

const Commonareas= React.lazy(() => import('./views/Commonareas'));
const Units= React.lazy(() => import('./views/Units'));
const RecoveryPassword = React.lazy(() => import('./views/RecoveryPassword'));


/***
 * 
 * site
 */

const Paginas = React.lazy(() => import('./views/Pages'));
const Editor = React.lazy(() => import('./editor/Editor'));




/**** */

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/condominios', name: 'Lista de Condôminios', component: Condominios },
  { path: '/assembleias', name: 'Lista de Assembleias', component: Assembleias },
  { path: '/AssembleiaDocumentos/:id', name: 'Lista de Documentos', component: AssembleiaDocumentos },
  { path: '/Folders/:id', name: 'Pasta', component: Folders },
  { path: '/ListFolders/:id', name: 'Pasta', component: ListFolder },
  { path: '/newFolder/:id', name: 'Pasta', component: NewFolder },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/wall', name: 'Wall', component: Wall },
  { path: '/noticias', name: 'Notícias', component: News },
  { path: '/beneficios', name: 'Benefícios', component: Benefits },
  { path: '/prestadorServico', name: 'Prestadores de Serviços', component: ServiceProviders },
  { path: '/enquetes', name: 'Enquetes', component: Polls },

  { path: '/classificados', name: 'Classificados', component: Classified },
  { path: '/galeria', name: 'Galeria de Fotos', component: Gallery },
  { path: '/videos', name: 'Lista de Videos', component: Videos },

  { path: '/achados-e-perdidos', name: 'Achados e Perdidos', component: LostAndFound },

  { path: '/ocorrencias', name: 'Ocorrências', component: Warning },

  { path: '/documents', name: 'Documents', component: Documents },
  { path: '/reservations', name: 'Reservations', component: Reservations },
  { path: '/commonareas', name: 'Áreas Comuns', component: Commonareas },
  { path: '/units', name: 'Unidades', component: Units },
  { path: '/users', name: 'Users', component: Users },
  { path: '/profiles', name: 'Perfils de Acesso', component: Profiles },

  { path: '/RecoveryPassword', name: 'RecoveryPassword', component: RecoveryPassword },
  { path: '/categorias/:type', name: 'Categorias', component: Category },
  { path: '/categorias/', name: 'Categorias', component: Category },
  { path: '/Guardhouse/', name: 'Portaria', component: Guardhouse },


  /***site */


  { path: '/editor/:pageId', name: 'Editor', component: Editor },
  { path: '/paginas', name: 'Páginas', component: Paginas },







];

export default routes;
