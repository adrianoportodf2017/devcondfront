import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CDataTable,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CAlert,
  CBadge
} from '@coreui/react';
import { Plus, Edit2, Trash2, Play } from 'lucide-react';
import useApi from './../../services/api';

const WebhooksManager = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [webhooks, setWebhooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentWebhook, setCurrentWebhook] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const eventTypes = [
    { value: 'payment.success', label: 'Pagamento Aprovado' },
    { value: 'payment.failed', label: 'Pagamento Falhou' },
    { value: 'subscription.created', label: 'Assinatura Criada' },
    { value: 'subscription.updated', label: 'Assinatura Atualizada' },
    { value: 'subscription.canceled', label: 'Assinatura Cancelada' },
    { value: 'customer.created', label: 'Cliente Criado' },
    { value: 'customer.updated', label: 'Cliente Atualizado' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    event: '',
    url: '',
    description: '',
    header: {},
    is_active: true
  });

  useEffect(() => {
    loadWebhooks();
  }, []);

  const loadWebhooks = async () => {
    setLoading(true);
    const result = await api.getWebhooks();
    if (!result.error) {
      setWebhooks(result.webhooks);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHeaderChange = (e, index) => {
    const { name, value } = e.target;
    const header = { ...formData.header };
    if (name === 'headerKey') {
      const oldKey = Object.keys(header)[index];
      const oldValue = header[oldKey];
      delete header[oldKey];
      if (value) header[value] = oldValue;
    } else {
      const key = Object.keys(header)[index];
      header[key] = value;
    }
    setFormData(prev => ({ ...prev, header }));
  };

  const addHeader = () => {
    setFormData(prev => ({
      ...prev,
      header: { ...prev.header, '': '' }
    }));
  };

  const removeHeader = (key) => {
    const header = { ...formData.header };
    delete header[key];
    setFormData(prev => ({ ...prev, header }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setError('');
    
    const result = currentWebhook
      ? await api.updateWebhook(currentWebhook.id, formData)
      : await api.createWebhook(formData);
    
    setModalLoading(false);
    
    if (!result.error) {
      setSuccess('Webhook ' + (currentWebhook ? 'atualizado' : 'criado') + ' com sucesso!');
      setShowModal(false);
      loadWebhooks();
    } else {
      setError(result.error);
    }
  };

  const handleEdit = (webhook) => {
    setCurrentWebhook(webhook);
    setFormData({
      name: webhook.name,
      event: webhook.event,
      url: webhook.url,
      description: webhook.description,
      header: webhook.header || {},
      is_active: webhook.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este webhook?')) {
      const result = await api.deleteWebhook(id);
      if (!result.error) {
        loadWebhooks();
        setSuccess('Webhook excluído com sucesso!');
      } else {
        setError(result.error);
      }
    }
  };

  const handleTestWebhook = async (webhook) => {
    setLoading(true);
    const result = await api.testWebhook(webhook.id);
    setLoading(false);
    
    if (!result.error) {
      setSuccess('Teste enviado com sucesso!');
    } else {
      setError(result.error);
    }
  };

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'event', label: 'Evento' },
    { key: 'url', label: 'URL' },
    { 
      key: 'status',
      label: 'Status',
      render: (item) => (
        <CBadge color={item.is_active ? 'success' : 'secondary'}>
          {item.is_active ? 'Ativo' : 'Inativo'}
        </CBadge>
      )
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (item) => (
        <>
          <CButton
            color="info"
            size="sm"
            className="mr-2"
            onClick={() => handleTestWebhook(item)}
          >
            <Play size={16} />
          </CButton>
          <CButton
            color="primary"
            size="sm"
            className="mr-2"
            onClick={() => handleEdit(item)}
          >
            <Edit2 size={16} />
          </CButton>
          <CButton
            color="danger"
            size="sm"
            onClick={() => handleDelete(item.id)}
          >
            <Trash2 size={16} />
          </CButton>
        </>
      )
    }
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h2>Webhooks</h2>
              <CButton
                color="primary"
                onClick={() => {
                  setCurrentWebhook(null);
                  setFormData({
                    name: '',
                    event: '',
                    url: '',
                    description: '',
                    header: {},
                    is_active: true
                  });
                  setShowModal(true);
                }}
              >
                <Plus size={20} className="mr-2" />
                Novo Webhook
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}

            <CDataTable
              items={webhooks}
              fields={columns}
              hover
              striped
              bordered
              loading={loading}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={item.is_active ? 'success' : 'secondary'}>
                      {item.is_active ? 'Ativo' : 'Inativo'}
                    </CBadge>
                  </td>
                ),
                actions: (item) => (
                  <td>
                    <CButton
                      color="info"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleTestWebhook(item)}
                    >
                      <Play size={16} />
                    </CButton>
                    <CButton
                      color="primary"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 size={16} />
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </CButton>
                  </td>
                )
              }}
              
              noItemsView={{
                noItems: 'Nenhum webhook cadastrado',
                noResults: 'Nenhum resultado encontrado'
              }}
            />
          </CCardBody>
        </CCard>

        <CModal
          show={showModal}
          onClose={() => setShowModal(false)}
          size="lg"
        >
          <CForm onSubmit={handleSubmit}>
            <CModalHeader closeButton>
              {currentWebhook ? 'Editar' : 'Novo'} Webhook
            </CModalHeader>
            <CModalBody>
              <CFormGroup>
                <CLabel>Nome</CLabel>
                <CInput
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nome do webhook"
                  required
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel>Evento</CLabel>
                <CSelect
                  name="event"
                  value={formData.event}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione um evento</option>
                  {eventTypes.map(event => (
                    <option key={event.value} value={event.value}>
                      {event.label}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>

              <CFormGroup>
                <CLabel>URL</CLabel>
                <CInput
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://sua-api.com/webhook"
                  required
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel>Descrição</CLabel>
                <CInput
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descrição do webhook"
                />
              </CFormGroup>

              <CFormGroup>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <CLabel>header</CLabel>
                  <CButton
                    color="secondary"
                    size="sm"
                    onClick={addHeader}
                  >
                    <Plus size={16} className="mr-1" />
                    Adicionar Header
                  </CButton>
                </div>
                {Object.entries(formData.header).map(([key, value], index) => (
                  <div key={index} className="d-flex mb-2">
                    <CInput
                      className="mr-2"
                      placeholder="Nome do Header"
                      value={key}
                      onChange={(e) => handleHeaderChange(e, index)}
                      name="headerKey"
                    />
                    <CInput
                      className="mr-2"
                      placeholder="Valor do Header"
                      value={value}
                      onChange={(e) => handleHeaderChange(e, index)}
                      name="headerValue"
                    />
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => removeHeader(key)}
                    >
                      <Trash2 size={16} />
                    </CButton>
                  </div>
                ))}
              </CFormGroup>

              <CFormGroup>
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      is_active: e.target.checked
                    }))}
                    className="mr-2"
                  />
                  <label htmlFor="is_active">Webhook Ativo</label>
                </div>
              </CFormGroup>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </CButton>
              <CButton
                color="primary"
                type="submit"
                disabled={modalLoading}
              >
                {modalLoading ? 'Salvando...' : 'Salvar'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CCol>
    </CRow>
  );
};

export default WebhooksManager;