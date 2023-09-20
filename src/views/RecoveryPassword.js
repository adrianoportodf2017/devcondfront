import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useApi from '../services/api'
import { useHistory } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CModal, // Importe CModal
  CModalHeader, // Importe CModalHeader
  CModalBody, // Importe CModalBody
  CModalFooter, // Importe CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'





// ... (seu código existente)

const Login = () => {
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const api = useApi();
  const history = useHistory();

 // Use useLocation para obter a localização atual
 const location = useLocation();

 // Use useEffect para definir email e token quando a localização muda
 useEffect(() => {
   // Analise a localização atual para obter os parâmetros da URL
   const searchParams = new URLSearchParams(location.search);
   const emailParam = searchParams.get('email');
   const tokenParam = searchParams.get('token');

   // Atualize o estado com os valores dos parâmetros da URL
   if (emailParam && tokenParam) {
     setEmail(emailParam);
     setToken(tokenParam);
   }
 }, [location]);
   
 


  const handleResetPassword= async (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado normalmente (evita atualização da página)

    if (password_confirmation && password) {
      if(password_confirmation == password){
        setLoading(true);
        const result = await api.resetPassword(password_confirmation, password, email, token);
        setLoading(false);
        if (result.error === '') {
          setError('');
          setSuccess('Senha Alterada Com sucesso');
          history.push('/login', { resetSuccess: 'Senha alterada com sucesso' });

        } else {
          setError(result.error);
          setSuccess('');
        }
      }else{
        setError('As senhas fornecidas não coincidem!');
        setSuccess('');
      }      
    } else {
      setError('Digite sua Senha');
      setSuccess('');
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                <CForm onSubmit={handleResetPassword}>
                    <h1>Atualizar Senha</h1>
                    <p className="text-muted">Digite sua nova senha</p>
                  {error !== '' &&
                  <CAlert color='danger'>{error}</CAlert>
                  }
                  {success !== '' &&
                  <CAlert color='success'>{success}</CAlert>
                  }

               <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}   disabled={loading}    />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Confirmar Senha" value={password_confirmation} onChange={e => setPasswordConfirm(e.target.value)}   disabled={loading}    />
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                      <CButton
                        type="submit"
                        className="btn btn-primary px-4"
                        disabled={loading}
                      >
                        {loading ? 'Carregando' : 'Atualizar'}
                      </CButton>
                      </CCol>
                    </CRow>


                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>SuperCond</h2>
                    <p>Gerenciador de Condôminios.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Feitor por: agenciatecnet.com.br</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>    
    </div>
  )
}

export default Login
