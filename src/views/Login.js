import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../services/api'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const api = useApi();
  const navigate = useNavigate();

  const handleLoginButton = async () => {
    if (email && password) {
      setLoading(true);
      const result = await api.login(email, password);
      setLoading(false);
      if (result.error === "") {
        localStorage.setItem('token', result.token);
       // alert(result.token);
       navigate('/');
      } else {
        setError(result.error);
      }
    } else {
      setError("Digite seus dados");
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Digite seus dados de acesso</p>
                  {error !== '' &&
                  <CAlert color='danger'>{error}</CAlert>
                  }

                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        </CInputGroupText>
                      <CFormInput type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}   disabled={loading}    />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                        <CInputGroupText>
                        </CInputGroupText>
                      <CFormInput type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}   disabled={loading}    />
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLoginButton}
                          disabled={loading}                 
                        >
                          {loading ? 'Carregando' : 'Entrar'}
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
