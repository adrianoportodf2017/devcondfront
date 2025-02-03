import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useApi from '../services/api';
import EmailComposerModal from './../components/EmailModal';
import { Mail } from 'lucide-react';

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
   const [showModal, setShowModal] = useState(false);



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
          <>
          <button
  onClick={() => setShowModal(true)}
  className="floating-email-btn"
>
  <Mail className="w-6 h-6" />
</button>
<EmailComposerModal showModal={showModal} onClose={() => setShowModal(false)} />
          </>
        </>
      }
    </div>
  )
}

export default TheLayout
