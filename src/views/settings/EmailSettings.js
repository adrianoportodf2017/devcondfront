import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CAlert,
  CSelect,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText
} from '@coreui/react';
import { Mail, Server, Key, Send } from 'lucide-react';
import useApi from './../../services/api';
import LoadingSpinner from './../../components/LoadingSpinner';

const EmailSettings = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [settings, setSettings] = useState({
    smtp_host: '',
    smtp_port: '',
    smtp_user: '',
    smtp_password: '',
    smtp_encryption: 'tls',
    from_name: '',
    from_email: '',
    reply_to: ''
  });

  useEffect(() => {
    loadEmailSettings();
  }, []);

  const loadEmailSettings = async () => {
    setLoading(true);
    const result = await api.getEmailSettings();
    if (!result.error) {
      setSettings(result.settings);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await api.updateEmailSettings(settings);
    
    setLoading(false);
    if (!result.error) {
      setSuccess('Configurações de email salvas com sucesso!');
    } else {
      setError(result.error);
    }
  };

  const handleTestEmail = async () => {
    setTestLoading(true);
    setError('');
    setSuccess('');

    const result = await api.testEmailSettings(settings);
    
    setTestLoading(false);
    if (!result.error) {
      setSuccess('Email de teste enviado com sucesso!');
    } else {
      setError('Erro ao enviar email de teste: ' + result.error);
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h2>Configurações de Email</h2>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* SMTP Server Settings */}
              <h3 className="mb-4">Configurações do Servidor SMTP</h3>
              
              <CFormGroup>
                <CLabel>Servidor SMTP</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <Server size={18} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    name="smtp_host"
                    value={settings.smtp_host}
                    onChange={handleInputChange}
                    placeholder="smtp.gmail.com"
                    required
                  />
                </CInputGroup>
              </CFormGroup>

              <CRow>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel>Porta SMTP</CLabel>
                    <CInput
                      type="number"
                      name="smtp_port"
                      value={settings.smtp_port}
                      onChange={handleInputChange}
                      placeholder="587"
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel>Criptografia</CLabel>
                    <CSelect
                      name="smtp_encryption"
                      value={settings.smtp_encryption}
                      onChange={handleInputChange}
                    >
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                      <option value="none">Nenhuma</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CFormGroup>
                <CLabel>Usuário SMTP</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <Mail size={18} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    name="smtp_user"
                    value={settings.smtp_user}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </CInputGroup>
              </CFormGroup>

              <CFormGroup>
                <CLabel>Senha SMTP</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <Key size={18} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="password"
                    name="smtp_password"
                    value={settings.smtp_password}
                    onChange={handleInputChange}
                    placeholder="Sua senha"
                    required
                  />
                </CInputGroup>
              </CFormGroup>

              {/* Email Settings */}
              <h3 className="mt-5 mb-4">Configurações de Envio</h3>

              <CRow>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel>Nome do Remetente</CLabel>
                    <CInput
                      type="text"
                      name="from_name"
                      value={settings.from_name}
                      onChange={handleInputChange}
                      placeholder="Nome da Empresa"
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel>Email do Remetente</CLabel>
                    <CInput
                      type="email"
                      name="from_email"
                      value={settings.from_email}
                      onChange={handleInputChange}
                      placeholder="noreply@empresa.com"
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CFormGroup>
                <CLabel>Email de Resposta (Reply-To)</CLabel>
                <CInput
                  type="email"
                  name="reply_to"
                  value={settings.reply_to}
                  onChange={handleInputChange}
                  placeholder="contato@empresa.com"
                />
              </CFormGroup>

              {error && <CAlert color="danger">{error}</CAlert>}
              {success && <CAlert color="success">{success}</CAlert>}

              <div className="d-flex justify-content-between mt-4">
                <CButton
                  color="info"
                  onClick={handleTestEmail}
                  disabled={testLoading || loading}
                >
                  <Send size={18} className="mr-2" />
                  {testLoading ? 'Enviando...' : 'Enviar Email de Teste'}
                </CButton>

                <CButton
                  color="primary"
                  type="submit"
                  disabled={loading || testLoading}
                >
                  {loading ? 'Salvando...' : 'Salvar Configurações'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EmailSettings;