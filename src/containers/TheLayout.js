import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useApi from '../services/api';

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  const api = useApi();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const checkLogin = async () => {
      if (api.getToken()) {
       // alert(api.getToken());

        const result = await api.validateToken();
       //alert(result);
        if (result.error === "") {
          setLoading(false);
        }else{
          console.log(result);
         history.push('/login');
        }
      } else {
       history.push('/login');
      }
    }
    checkLogin();
  }, [])

  return (
    <div className="c-app c-default-layout">

      {!loading &&
        <>
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </>
      }
    </div>
  )
}

export default TheLayout
