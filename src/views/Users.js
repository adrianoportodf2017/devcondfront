import React, { useState, useEffect } from 'react';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CTextarea,
  CInput,
  CAlert,
  CInputFile,
  CSelect
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import useApi from '../services/api';

const fields = [
  { label: 'Nome', key: 'name' },
  { label: 'CPF', key: 'cpf' },
  { label: 'Perfil', key: 'profile_name' },
  { label: 'EMAIL', key: 'email' },
  { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
];

export default () => {
  const api = useApi()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [profile, setProfile] = useState([])
  const [selectedProfile, setSelectedProfile] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [modalId, setModalId] = useState('')
  const [error, setError] = useState('')

  const [modalNameField, setModalNameField] = useState('')
  const [modalCPFField, setModalCPFField] = useState('')
  const [modalEmailField, setModalEmailField] = useState('')
  const [modalPhoneField, setModalPhoneField] = useState('')
  const [modalProfileField, setModalProfileField] = useState('')


  const [modalPasswordField, setModalPasswordField] = useState('')
  const [modalPasswordConfirmField, setModalPasswordConfirmField] = useState('')

  const getList = async () => {
    setLoading(true)
    const result = await api.getUsers();
    const profiles = await api.getProfiles();
    setLoading(false)

    if (result.error === '') {
      setList(result.list);
      setProfile(profiles.list);
    } else {
      setLoading(false)
      alert(result.error)
    }
  }

  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleloseModal = () => {
    setShowModal(false)
  }

  const handleNewButton = () => {
    setModalId('')

    setModalId('')
    setModalNameField('')
    setModalCPFField('')
    setModalEmailField('')
    setModalPhoneField('')
    setModalPasswordField('')
    setModalPasswordConfirmField('')
    setShowModal(true)
  }

  const handleEditButton = (id: number) => {
    let index = list.findIndex((v) => v.id === id)

    setModalId(list[index]['id'])
    setModalNameField(list[index]['name'])
    setModalCPFField(list[index]['cpf'])
    setModalEmailField(list[index]['email'])
    setModalPhoneField(list[index]['phone'])
    setModalProfileField(list[index]['profile'])
    setModalPasswordField('')
    setModalPasswordConfirmField('')
    setShowModal(true)
  }

  const handleModalSave = async () => {
    if (modalNameField && modalCPFField && modalEmailField) {
      setLoadingModal(true)
      let result
      let data = {
        name: modalNameField,
        email: modalEmailField,
        phone: modalPhoneField,
        profile: modalProfileField,
        cpf: modalCPFField
      }

      if (modalPasswordField) {
        if (modalPasswordField === modalPasswordConfirmField) {
          data.password = modalPasswordField
        } else {
          alert('Senha nao confere')
          setLoadingModal(false)
        }
      }
      if (modalId === '') {
        result = await api.addUser(data)
      } else {
        result = await api.updateUser(modalId, data)
      }

      setLoadingModal(false)

      if (result.error === '') {
        setShowModal(false)
        getList()
        setError('')

      } else {
        setError(result.error)
      }
    } else {
      setError('Preencha os Campos')
    }
  }

  const handleRemoveButton = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluirr?')) {
      const result = await api.removeUser(id)

      if (result.error === '') {
        getList()
      } else {
        alert(result.error)
      }
    }
  }
  return (
    <>
      <CRow>
        <CCol>
          <h2>Usuários Cadastrados</h2>

          <CCard>
            <CCardHeader>
              <CButton color="primary" onClick={handleNewButton}>
                <CIcon icon="cil-check" className="small-icon" /> Novo Usuário
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={list}
                fields={fields}
                loading={loading}
                noItemsViewSlot=" "
                columnFilter
                sorter
                hover
                striped
                pagination
                itemsPerPage={10}
                scopedSlots={{
                  actions: (item: any, index: number) => (
                    <td>
                      <CButtonGroup key={index}>
                        <CButton
                          color="info"
                          onClick={() => handleEditButton(item.id)}
                        >
                          Editar
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleRemoveButton(item.id)}
                        >
                          Excluir
                        </CButton>
                      </CButtonGroup>
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal show={showModal} onClose={handleloseModal}>
        <CModalHeader closeButton>
          {modalId === '' ? 'Nova ' : 'Editar '}Usuário
        </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal-name">Nome do Usuário</CLabel>
            <CInput
              type="text"
              id="modal-name"
              value={modalNameField}
              onChange={(e: any) => setModalNameField(e.target.value)}
              disabled={loading}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal-email">E-mail do Usuário</CLabel>
            <CInput
              type="email"
              id="modal-email"
              value={modalEmailField}
              onChange={(e: any) => setModalEmailField(e.target.value)}
              disabled={loading}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal-email">Telefone do Usuário</CLabel>
            <CInput
              type="number"
              id="modal-email"
              value={modalPhoneField}
              onChange={(e: any) => setModalPhoneField(e.target.value)}
              disabled={loading}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal-cpf">Cpf do Usuário</CLabel>
            <CInput
              type="text"
              id="modal-cpf"
              value={modalCPFField}
              onChange={(e: any) => setModalCPFField(e.target.value)}
              disabled={loading}
            />
          </CFormGroup>

          <CFormGroup>
  <CLabel htmlFor="modal-profile">Perfil de Usuário</CLabel>
  <CSelect
    id="modal-profile"
    value={modalProfileField}
    onChange={(e) => setModalProfileField(e.target.value)}
    disabled={loading}
  >
    <option value="">Selecione um perfil</option>
    
    {profile.map((item) => (
      <option key={item.id} value={item.id} selected={item.id === modalProfileField}>
        {item.name}
      </option>
    ))}
  </CSelect>
</CFormGroup>


          <CFormGroup>
            <CLabel htmlFor="modal-password">Nova Senha</CLabel>
            <CInput
              type="password"
              id="modal-password"
              value={modalPasswordField}
              placeholder="Digite uma nova Senha para o usuário"
              onChange={(e: any) => setModalPasswordField(e.target.value)}
              disabled={loading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-password">Confirme a Nova Senha</CLabel>
            <CInput
              type="password"
              id="modal-password"
              placeholder="Confirme a nova Senha"
              value={modalPasswordConfirmField}
              onChange={(e: any) =>
                setModalPasswordConfirmField(e.target.value)
              }
              disabled={loading}
            />
          </CFormGroup>

          {error !== '' && <CAlert color="danger">{error}</CAlert>}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleModalSave} disabled={loading}>
            {loadingModal ? 'Salvando' : 'Salvar'}
          </CButton>
          <CButton color="secondary" onClick={handleloseModal}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>

  );
}
