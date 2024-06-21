import React from 'react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import Folders from '../services/api';
import { useHistory, Link } from 'react-router-dom';

const api = Folders();

const RedirectionLink = ({ to, children }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(to);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer',   }}>
      {children}
    </div>
  );
};



const generateMenu = (jsonData) => {
  return jsonData.map((item) => {
    const menuItem = {
      _tag: 'CSidebarNavItem',
      name: item.title,
      to: '/Folders/' + item.id,
      customClasses: 'text-left',
    };

    menuItem.name = (
      <span style={{ whiteSpace: 'normal' }}>{item.title}</span>
    );

    if (item.children && item.children.length > 0) {
      menuItem._tag = 'CSidebarNavDropdown';
      menuItem.route = '/Folders/' + item.id;
      menuItem._children = generateMenu(item.children);

      menuItem._children.forEach((child) => {
        child.name = (
          <RedirectionLink to={child.to}>{child.name}</RedirectionLink>
        );
      });
    }
    return menuItem;
  });
};

const loadMenu = async () => {
  try {
    const jsonData = await api.getFolders();
    const dynamicMenu = generateMenu(jsonData);

    const _nav = [
      {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon="cil-home" className="small-icon" />,
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
        _tag: 'CSidebarNavDropdown',
        name: 'Pastas',
        route: '/Folders/1',
        icon: <CIcon icon={freeSet.cilWindow} className="small-icon" />,
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Adicionar Nova Pasta',
            to: '/newFolder/0',
            icon: <CIcon icon={freeSet.cilPlus} className="small-icon" />,
          },
          ...dynamicMenu.map((item) => {
            return {
              ...item,
              name: (
                <RedirectionLink to={item.to}>{item.name}</RedirectionLink>
              )
            };
          }),
        ]
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Visualizar Pastas',
        to: '/ListFolders/0',
        icon: <CIcon icon={freeSet.cilShortText} className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Avisos',
        to: '/wall',
        icon: <CIcon icon="cil-warning" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Notícias',
        route: '/news',
        icon: <CIcon icon="cil-notes" className="small-icon" />,
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Notícias',
            to: '/noticias',
            icon: <CIcon icon="cil-notes" className="small-icon" />,
            className: 'ml-3',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Categorias',
            to: '/categorias/noticias',
            icon: <CIcon icon={freeSet.cilLayers} className="small-icon" />,
            className: 'ml-3',
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Classificados',
        to: '/classifield',
        icon: <CIcon icon={freeSet.cilCart} className="small-icon" />,
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Classificados',
            to: '/classificados/',
            icon: <CIcon icon={freeSet.cilCart} className="small-icon" />,
            className: 'ml-3',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Categorias',
            to: '/categorias/classificados',
            icon: <CIcon icon={freeSet.cilLayers} className="small-icon" />,
            className: 'ml-3',
          },
        ],
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Galeria de Fotos',
        to: '/galeria',
        icon: <CIcon icon={freeSet.cilImage} className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Convênios/Parceiros',
        to: '/benefits',
        icon: <CIcon icon={freeSet.cilTouchApp} className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Enquetes',
        to: '/classifield',
        icon: <CIcon icon="cil-list" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Reservas',
        to: '/reservations',
        icon: <CIcon icon="cil-calendar" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Ocorrências',
        to: '/ocorrencias',
        icon: <CIcon icon={freeSet.cilBellExclamation} className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Achados e Perdidos',
        to: '/achados-e-perdidos',
        icon: <CIcon icon="cil-lock-locked" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavTitle',
        _children: ['Dados']
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Usuários',
        to: '/users',
        icon: <CIcon icon="cil-people" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Unidades',
        to: '/units',
        icon: <CIcon icon="cil-home" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Áreas Comuns',
        to: '/commonareas',
        icon: <CIcon icon="cil-paperclip" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavTitle',
        _children: ['Configurações']
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Site',
        to: '',
        icon: <CIcon icon={freeSet.cilBrowser} className="small-icon" />,
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Páginas',
            to: '/paginas',
            icon: <CIcon icon={freeSet.cilFindInPage} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Slider',
            to: '/slider',
            icon: <CIcon icon={freeSet.cilLibrary} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Dados de Contatos',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilPhone} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Serviços',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilBriefcase} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Time',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilGroup} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Sobre Nos',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilAddressBook} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Acesso Rápido',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilTouchApp} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Rodapé',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilInfo} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Utilidades',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilTags} className="small-icon" />,
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Configurações do Site',
            to: '/contatos',
            icon: <CIcon icon={freeSet.cilPhone} className="small-icon" />,
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Sistema',
        to: '',
        icon: <CIcon icon={freeSet.cilSettings} className="small-icon" />,
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Logs',
            to: '/logs',
            icon: <CIcon icon={freeSet.cilList} className="small-icon" />,
            className: 'ml-3',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Permissões',
            to: '/profiles',
            icon: <CIcon icon={freeSet.cilCheck} className="small-icon" />,
            className: 'ml-3',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Resetar Banco de Dados',
            to: '/resetarbanco',
            icon: <CIcon icon={freeSet.cilCheck} className="small-icon" />,
            className: 'ml-3',
          },
        ],
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Meu Perfil',
        to: '/profile',
        icon: <CIcon icon="cil-user" className="small-icon" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sair',
        to: '/logout',
        icon: <CIcon icon="cil-drop" className="small-icon" />,
      },
    ];

    return _nav;
  } catch (error) {
    console.error('Erro ao carregar o menu:', error);
    return [];
  }
};

export default loadMenu;
