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
  CSwitch,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText
} from '@coreui/react';
import { Key, CreditCard, DollarSign } from 'lucide-react';
import useApi from './../../services/api';

const PaymentIntegration = () => {
  const api = useApi();
  const [activeTab, setActiveTab] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [stripeSettings, setStripeSettings] = useState({
    enabled: false,
    test_mode: true,
    public_key: '',
    secret_key: '',
    webhook_secret: '',
    test_public_key: '',
    test_secret_key: '',
    test_webhook_secret: ''
  });

  const [assasSettings, setAssasSettings] = useState({
    enabled: false,
    test_mode: true,
    api_key: '',
    webhook_secret: '',
    test_api_key: '',
    test_webhook_secret: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const result = await api.getPaymentSettings();
    if (!result.error) {
      setStripeSettings(result.stripe || stripeSettings);
      setAssasSettings(result.assas || assasSettings);
    }
    setLoading(false);
  };

  const handleStripeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStripeSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAssasChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAssasSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveStripe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await api.updateStripeSettings(stripeSettings);
    
    setLoading(false);
    if (!result.error) {
      setSuccess('Configurações do Stripe salvas com sucesso!');
    } else {
      setError(result.error);
    }
  };

  const handleSaveAssas = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await api.updateAssasSettings(assasSettings);
    
    setLoading(false);
    if (!result.error) {
      setSuccess('Configurações do Asaas salvas com sucesso!');
    } else {
      setError(result.error);
    }
  };

  const handleTestWebhook = async (gateway) => {
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await api.testPaymentWebhook(gateway);
    
    setLoading(false);
    if (!result.error) {
      setSuccess(`Webhook do ${gateway} testado com sucesso!`);
    } else {
      setError(`Erro ao testar webhook do ${gateway}: ${result.error}`);
    }
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h2>Integrações de Pagamento</h2>
          </CCardHeader>
          <CCardBody>
            <CNav tabs>
              <CNavItem>
                <CNavLink
                  active={activeTab === 'stripe'}
                  onClick={() => setActiveTab('stripe')}
                >
                  Stripe
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeTab === 'assas'}
                  onClick={() => setActiveTab('assas')}
                >
                  Asaas
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent className="mt-4">
              <CTabPane active={activeTab === 'stripe'}>
                <CForm onSubmit={handleSaveStripe}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Configurações do Stripe</h3>
                    <CFormGroup className="mb-0">
                      <CSwitch
                        color="primary"
                        name="enabled"
                        checked={stripeSettings.enabled}
                        onChange={handleStripeChange}
                        label="Ativar Stripe"
                      />
                    </CFormGroup>
                  </div>

                  <CFormGroup>
                    <CSwitch
                      className="mr-1"
                      color="primary"
                      name="test_mode"
                      checked={stripeSettings.test_mode}
                      onChange={handleStripeChange}
                    />
                    <span className="ml-2">Modo de Teste</span>
                  </CFormGroup>

                  {stripeSettings.test_mode ? (
                    <>
                      <CFormGroup>
                        <CLabel>Chave Pública de Teste</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            name="test_public_key"
                            value={stripeSettings.test_public_key}
                            onChange={handleStripeChange}
                            placeholder="pk_test_..."
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel>Chave Secreta de Teste</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="test_secret_key"
                            value={stripeSettings.test_secret_key}
                            onChange={handleStripeChange}
                            placeholder="sk_test_..."
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel>Chave do Webhook de Teste</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="test_webhook_secret"
                            value={stripeSettings.test_webhook_secret}
                            onChange={handleStripeChange}
                            placeholder="whsec_..."
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>
                    </>
                  ) : (
                    <>
                      <CFormGroup>
                        <CLabel>Chave Pública de Produção</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            name="public_key"
                            value={stripeSettings.public_key}
                            onChange={handleStripeChange}
                            placeholder="pk_live_..."
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel>Chave Secreta de Produção</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="secret_key"
                            value={stripeSettings.secret_key}
                            onChange={handleStripeChange}
                            placeholder="sk_live_..."
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel>Chave do Webhook de Produção</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="webhook_secret"
                            value={stripeSettings.webhook_secret}
                            onChange={handleStripeChange}
                            placeholder="whsec_..."
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>
                    </>
                  )}

                  {error && <CAlert color="danger">{error}</CAlert>}
                  {success && <CAlert color="success">{success}</CAlert>}

                  <div className="d-flex justify-content-between">
                    <CButton
                      color="info"
                      onClick={() => handleTestWebhook('stripe')}
                      disabled={loading}
                    >
                      Testar Webhook
                    </CButton>
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Salvando...' : 'Salvar Configurações'}
                    </CButton>
                  </div>
                </CForm>
              </CTabPane>

              <CTabPane active={activeTab === 'assas'}>
                <CForm onSubmit={handleSaveAssas}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Configurações do Asaas</h3>
                    <CFormGroup className="mb-0">
                      <CSwitch
                        color="primary"
                        name="enabled"
                        checked={assasSettings.enabled}
                        onChange={handleAssasChange}
                        label="Ativar Asaas"
                      />
                    </CFormGroup>
                  </div>

                  <CFormGroup>
                    <CSwitch
                      className="mr-1"
                      color="primary"
                      name="test_mode"
                      checked={assasSettings.test_mode}
                      onChange={handleAssasChange}
                    />
                    <span className="ml-2">Modo de Teste</span>
                  </CFormGroup>

                  {assasSettings.test_mode ? (
                    <>
                      <CFormGroup>
                        <CLabel>Chave da API de Teste</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="test_api_key"
                            value={assasSettings.test_api_key}
                            onChange={handleAssasChange}
                            placeholder="$aact_YourTestApiKey"
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel>Chave do Webhook de Teste</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="test_webhook_secret"
                            value={assasSettings.test_webhook_secret}
                            onChange={handleAssasChange}
                            placeholder="Chave do webhook de teste"
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>
                    </>
                  ) : (
                    <>
                      <CFormGroup>
                        <CLabel>Chave da API de Produção</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="api_key"
                            value={assasSettings.api_key}
                            onChange={handleAssasChange}
                            placeholder="$aact_YourProductionApiKey"
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel>Chave do Webhook de Produção</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <Key size={18} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            name="webhook_secret"
                            value={assasSettings.webhook_secret}
                            onChange={handleAssasChange}
                            placeholder="Chave do webhook de produção"
                            required
                          />
                        </CInputGroup>
                      </CFormGroup>
                    </>
                  )}

                  {error && <CAlert color="danger">{error}</CAlert>}
                  {success && <CAlert color="success">{success}</CAlert>}

                  <div className="d-flex justify-content-between">
                    <CButton
                      color="info"
                      onClick={() => handleTestWebhook('assas')}
                      disabled={loading}
                    >
                      Testar Webhook
                    </CButton>
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Salvando...' : 'Salvar Configurações'}
                    </CButton>
                  </div>
                </CForm>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PaymentIntegration;