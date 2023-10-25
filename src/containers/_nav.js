
import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'


let json = [
  {
    "id": 1,
    "title": "Assembleia",
    "status": "Ativo",
    "content": "Informações gerais sobre as assembleias realizadas no Condomínio ABC.",
    "thumb": "https://via.placeholder.com/800x600.png/004411?text=optio",
    "thumb_file": "https://via.placeholder.com/800x600.png/0099bb?text=consectetur",
    "parent_id": null,
    "created_at": "2023-10-21T03:42:15.000000Z",
    "updated_at": "2023-10-21T03:42:15.000000Z",
    "children": [
      {
        "id": 2,
        "title": "Assembleia de Janeiro de 2023",
        "thumb": "https://via.placeholder.com/800x600.png/00ddcc?text=officia",
        "content": "Resumo da assembleia realizada em janeiro de 2023.",
        "children": [
          {
            "id": 4,
            "title": "Ata da Assembleia",
            "thumb": "https://via.placeholder.com/800x600.png/00aa99?text=quidem",
            "content": "Ata da assembleia realizada em janeiro de 2023.",
            "children": [
              {
                "id": 4,
                "title": "Ata da Assembleia",
                "thumb": "https://via.placeholder.com/800x600.png/00aa99?text=quidem",
                "content": "Ata da assembleia realizada em janeiro de 2023.",
                "children": []
              },
              {
                "id": 5,
                "title": "Documentos da Assembleia",
                "thumb": "https://via.placeholder.com/800x600.png/0099bb?text=quae",
                "content": "Documentos relacionados à assembleia de janeiro de 2023.",
                "children": []
              }
            ]
          },
          {
            "id": 5,
            "title": "Documentos da Assembleia",
            "thumb": "https://via.placeholder.com/800x600.png/0099bb?text=quae",
            "content": "Documentos relacionados à assembleia de janeiro de 2023.",
            "children": []
          }
        ]
      },
      {
        "id": 2,
        "title": "Assembleia de Janeiro de 2021",
        "thumb": "https://via.placeholder.com/800x600.png/00ddcc?text=officia",
        "content": "Resumo da assembleia realizada em janeiro de 2023.",
        "children": [
          {
            "id": 4,
            "title": "Ata da Assembleia",
            "thumb": "https://via.placeholder.com/800x600.png/00aa99?text=quidem",
            "content": "Ata da assembleia realizada em janeiro de 2023.",
            "children": []
          },
          {
            "id": 5,
            "title": "Documentos da Assembleia",
            "thumb": "https://via.placeholder.com/800x600.png/0099bb?text=quae",
            "content": "Documentos relacionados à assembleia de janeiro de 2023.",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "Reuniões do Conselho",
    "status": "Ativo",
    "content": "Informações sobre as reuniões do conselho do Condomínio ABC.",
    "thumb": "https://via.placeholder.com/800x600.png/00ee00?text=ullam",
    "thumb_file": "https://via.placeholder.com/800x600.png/008888?text=neque",
    "parent_id": null,
    "created_at": "2023-10-21T03:42:15.000000Z",
    "updated_at": "2023-10-21T03:42:15.000000Z",
    "children": [
      {
        "id": 9,
        "title": "Reunião de Fevereiro de 2023",
        "thumb": "https://via.placeholder.com/800x600.png/002233?text=ut",
        "content": "Resumo da reunião do conselho realizada em fevereiro de 2023.",
        "children": [
          {
            "id": 10,
            "title": "Pauta da Reunião",
            "thumb": "https://via.placeholder.com/800x600.png/00dd22?text=harum",
            "content": "Pauta da reunião do conselho de fevereiro de 2023.",
            "children": []
          }
        ]
      }
    ]
  }
]


const generateMenu = (jsonData) => {
  return jsonData.map((item) => {
    const menuItem = {
      _tag: 'CSidebarNavItem',
      name: item.title,
      to: item.to,
      customClasses: 'text-left', // Alinha o texto à esquerda
    };

    // Adicione uma classe CSS para permitir a quebra de palavras no título
    menuItem.name = (
      <span style={{ whiteSpace: 'normal' }}>{item.title}</span>
    );

    if (item.children && item.children.length > 0) {
      menuItem._tag = 'CSidebarNavDropdown';
      menuItem._children = generateMenu(item.children);
    }

    return menuItem;
  });
};


// Gere o menu dinamicamente a partir do JSON
const dynamicMenu = generateMenu(json);




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
    _tag: 'CSidebarNavDropdown',
    name: 'Pastas', // Nome da categoria
    route: '/folders', // Rota da categoria
    icon: <CIcon content={freeSet.cilFolder}  customClasses="c-sidebar-nav-icon"/>,
    _children: dynamicMenu,

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Assembleias',
    to: '/assembleias',
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
    _tag: 'CSidebarNavDropdown',
    name: 'Notícias', // Nome da categoria
    route: '/news', // Rota da categoria
    icon: 'cil-notes', // Ícone da categoria
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Notícias',
        to: '/news/news-1',
        icon: 'cil-notes',
        className: 'ml-3',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Categorias',
        to: '/news/news-2',
        icon: <CIcon content={freeSet.cilLayers}  customClasses="c-sidebar-nav-icon"/>,
        className: 'ml-3',

      },
      // Adicione mais notícias conforme necessário
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Classificados',
    to: '/classifield',
    icon: <CIcon content={freeSet.cilCart}  customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Classificados',
        to: '/news/news-1',
        icon: <CIcon content={freeSet.cilCart}  customClasses="c-sidebar-nav-icon"/>,
        className: 'ml-3',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Categorias',
        to: '/news/news-2',
        icon: <CIcon content={freeSet.cilLayers}  customClasses="c-sidebar-nav-icon"/>,
        className: 'ml-3',

      },
      // Adicione mais notícias conforme necessário
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Galeria de Fotos',
    to: '/classifield',
    icon: <CIcon content={freeSet.cilImage}  customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Convênios/Parceiros',
    to: '/classifield',
    icon: <CIcon content={freeSet.cilTouchApp}  customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Convênios/Parceiros',
        to: '/news/news-1',
        icon: <CIcon content={freeSet.cilTouchApp}  customClasses="c-sidebar-nav-icon"/>,
        className: 'ml-3',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Categorias',
        to: '/news/news-2',
        icon: <CIcon content={freeSet.cilLayers}  customClasses="c-sidebar-nav-icon"/>,
        className: 'ml-3',

      },
      // Adicione mais notícias conforme necessário
    ],
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
