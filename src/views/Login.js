import React, { useState } from 'react'
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



const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
    // Adicione esses estados para o modal
    const [modalOpen, setModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

  const api = useApi();
  const history = useHistory();

  const location = useLocation();
  const   {resetSuccess}  = location.state || {}; // Acessa resetSuccess do objeto de estado

  const handleLoginButton = async () => {
    if (email && password) {
      setLoading(true);
      const result = await api.login(email, password);
      setLoading(false);
      if (result.error === "") {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user.id);
        alert(result.user.id);
       // alert(result.token);
      // history.push('/');
      } else {
        setError(result.error);
      }
    } else {
      setError("Digite seus dados");
    }
  }

  const openResetPasswordModal = () => {
    setModalOpen(true);
  };
  
  const handleResetPassword = async () => {

    setLoading(true);

    // Enviar a solicitação de recuperação de senha ao servidor usando o email em resetEmail
    // Aqui você pode usar a API para enviar um email de recuperação de senha ou realizar qualquer ação necessária
    // Certifique-se de que a API retorne uma resposta com uma propriedade 'error' que indique se houve um erro
    
    // Simulando uma resposta da API com base no valor de resetEmail
    const result = await api.recoveryPassword(resetEmail);  
    if (result.error === false) {
      setModalOpen(false);
      // Exiba uma mensagem de sucesso para o usuário, informando que as instruções foram enviadas para a caixa de entrada
      setSuccess(result.message);
      setError('');
    } else {
      // Exiba uma mensagem de erro para o usuário
      setModalOpen(false);
      setError(result.message);
      setSuccess('');

    }
    setLoading(false);

  };
  
  // Função de simulação de solicitação de redefinição de senha (substitua com a chamada real à sua API)
  const simulateResetPasswordRequest = async (email) => {
    // Aqui, você pode simular a chamada real à sua API para enviar um email de recuperação de senha
    // e retornar uma resposta simulada com base no valor de resetEmail
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulando uma chamada assíncrona
  
    if (email === 'usuario@email.com') {
      return { error: false };
    } else {
      return { error: true };
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado normalmente (evita atualização da página)

    if (email && password) {
      setLoading(true);
      const result = await api.login(email, password);
      setLoading(false);

      if (result.error === '') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user.id);
        localStorage.setItem('userName', result.user.name);
        localStorage.setItem('userEmail', result.user.email);


        history.push('/');
      } else {
        setError(result.error);
        setSuccess('');
      }
    } else {
      setError('Digite seus dados');
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
                <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-muted">Digite seus dados de acesso</p>
                  {error !== '' &&
                  <CAlert color='danger'>{error}</CAlert>
                  }
                  {success !== '' &&
                  <CAlert color='success'>{success}</CAlert>
                  }
                  {/* Exibir a mensagem de sucesso se estiver presente */}
                  {resetSuccess && <CAlert color='success'>{resetSuccess}</CAlert>}

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}   disabled={loading}    />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}   disabled={loading}    />
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                      <CButton
                        type="submit"
                        className="btn btn-primary px-4"
                        disabled={loading}
                      >
                        {loading ? 'Carregando' : 'Entrar'}
                      </CButton>
                      </CCol>
                    </CRow>
                    <Link to="#" onClick={openResetPasswordModal}>Esqueceu a senha?</Link>


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
      <CModal show={modalOpen} onClose={() => setModalOpen(false)}>
  <CModalHeader closeButton>Recuperar Senha</CModalHeader>
  <CModalBody>
    <p>Informe seu endereço de e-mail para receber instruções de recuperação de senha.</p>
    <CInput
      type="email"
      placeholder="E-mail"
      value={resetEmail}
      onChange={(e) => setResetEmail(e.target.value)}
    />
  </CModalBody>
  <CModalFooter>
  <CButton  color="primary" disabled={loading}  onClick={handleResetPassword}>                       
    {loading ? 'Carregando' : 'Recuperar Senha'}
 </CButton>
    <CButton color="secondary" onClick={() => setModalOpen(false)}>
      Cancelar
    </CButton>
  </CModalFooter>
</CModal>
    </div>
  )
}

export default Login
