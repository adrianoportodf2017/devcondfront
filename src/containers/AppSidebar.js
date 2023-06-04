import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CSidebar,
  CSidebarNav,
  CNavItem,
  CSidebarNavTitle,

} from '@coreui/react';

// sidebar nav config
import navigation from './_nav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <div className='row'>
      <div className='col-2'>
    
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarNav>
        <img src="/homelogo.png" className="mt-2 mb-3 ml-auto mr-auto" width="70%" />
        {navigation.map((item, index) => (
          <CNavItem
            key={index}
            name={item.name}
            to={item.to}
            icon={item.icon}
          />
        ))}
      </CSidebarNav>
    </CSidebar>
    </div>
    </div>
  );
};

export default React.memo(AppSidebar);
