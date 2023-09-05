
import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon content={freeSet.cilApplications}  customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Gestão do Sistema']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Condominios',
    to: '/condominios',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Assembleias',
    to: '/classifield',
    icon: <CIcon content={freeSet.cilShortText}  customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Avisos',
    to: '/wall',
    icon: 'cil-warning',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Documentos',
    to: '/documents',
    icon: 'cil-file',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Notícias',
    to: '/news',
    icon: 'cil-notes',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Classificados',
    to: '/classifield',
    icon: <CIcon content={freeSet.cilCart}  customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Galeria de Fotos',
    to: '/classifield',
    icon: <CIcon content={freeSet.cilImage}  customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Convênios/Parceiros',
    to: '/classifield',
    icon: <CIcon content={freeSet.cilTouchApp}  customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Enquetes',
    to: '/classifield',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Reservas',
    to: '/reservations',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Prestores de Serviços',
    to: '/reservations',
    icon: <CIcon content={freeSet.cilPaint}  customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Ocorrências',
    to: '/warnnings',
    icon: <CIcon content={freeSet.cilBellExclamation}  customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Achados e Perdidos',
    to: '/foundandlost',
    icon: 'cil-lock-locked',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Dados']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Usuários',
    to: '/users',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Unidades',
    to: '/units',
    icon: 'cil-home',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Áreas Comuns',
    to: '/commonareas',
    icon: 'cil-paperclip',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Configurações']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Meu Perfil',
    to: '/profile',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'sair',
    to: '/logout',
    icon: 'cil-drop',
  },
  
]

export default _nav
