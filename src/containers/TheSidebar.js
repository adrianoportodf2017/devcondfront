import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavItem,
  CSidebarNavDropdown,
} from '@coreui/react';
import CustomSidebarNav from '../components/SideBar'; // Importar o componente personalizado

import loadMenu from './_nav';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.sidebarShow);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const menuData = await loadMenu();
      setMenuItems(menuData);
    };
    fetchMenu();
  }, []);

  

  return (
    <CSidebar
      show={show}
      onShowChange={val => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarNav>
        <img src="/homelogo.png" className="mt-2 mb-3 ml-auto mr-auto" width="70%" />
     {/* Renderiza os itens de menu personalizados */}
     <CustomSidebarNav items={menuItems} />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
