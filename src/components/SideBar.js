import React from 'react';
import { Link, useHistory } from 'react-router-dom'; // Importa o componente Link
import {
  CSidebarNavItem,
  CSidebarNavDropdown,
  CSidebarNavTitle
} from '@coreui/react';

// Componente para renderizar itens de navegação
const SidebarNavItem = ({ item }) => {
  ;

  return (
    <Link to={item.to}>
      <CSidebarNavItem
        name={item.name}
        to={item.to}
        icon={item.icon}

      /> </Link>
  );
};

const SidebarNavDropdown = ({ item }) => {
  const history = useHistory(); // Hook para navegação

  const handleDropDonwClick = () => {
    history.push(item.to);
  };
  return (
    <Link to={item.to}>
      <CSidebarNavDropdown
        name={item.name}
        icon={item.icon}
        to={item.to}

      >
        {item._children.map((child, index) => (
          <SidebarNavItem key={index} item={child} />
        ))}
      </CSidebarNavDropdown>

    </Link>
  );
};

// Componente para renderizar títulos
const SidebarNavTitle = ({ item }) => {
  return <CSidebarNavTitle>{item._children[0]}</CSidebarNavTitle>;
};

// Componente principal para o Sidebar
const CustomSidebarNav = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        switch (item._tag) {
          case 'CSidebarNavItem':
            return <SidebarNavItem key={index} item={item} />;
          case 'CSidebarNavDropdown':
            return <SidebarNavDropdown key={index} item={item} />;
          case 'CSidebarNavTitle':
            return <SidebarNavTitle key={index} item={item} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default CustomSidebarNav;
