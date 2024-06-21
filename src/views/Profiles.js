import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSwitch,

} from '@coreui/react';
import CIcon from "@coreui/icons-react";

import useApi from '../services/api'



const Perfils = () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState('');
  const [modalNameField, setModalNameField] = useState('');
  const [modalRolesField, setModalRolesField] = useState('');
  const [modalStatusField, setModalStatusField] = useState('');



  const fields = [
    { label: 'Ativo', key: 'Status', sorter: false, filter: false },
    { label: 'Título', key: 'name' },
    { label: 'Regras', key: 'roles' },
    { label: 'Data da publicação', key: 'created_at' },
    { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
  ]

  useEffect(() => {
    getList();

  }, []);



  const getList = async () => {
    setLoading(true);
    const result = await api.getProfiles();
    console.log(result);
    setLoading(false);

    if (result.error === '' || result.error === undefined) {
      setList(result.list);
    } else {
      alert(result.error)
    }
  };

  const handleAddButton = () => {
    setModalId('');
    setModalNameField('');
    setModalStatusField('1');
    setModalRolesField('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false)
  };


  const handleModalSave = async () => {

    if (modalNameField) {
      setModalLoading(true);
      let result;
      let data = {
        status: modalStatusField,
        name: modalNameField,
        roles: modalRolesField,
      };


      if (modalId === '') {
        result = await api.addProfile(data)
      } else {
        result = await api.updateProfile(modalId, data);
      }

      setModalLoading(false)
      if (result.error === '' || result.error === undefined) {
        setShowModal(false);
        getList();
      } else {
        alert(result.error);
        setModalLoading(false);

      }

    } else {
      alert('Preencha os campos para continuar');
      setModalLoading(false);
    }

  };


  const handleEditButton = (id) => {
    let index = list.findIndex(v => v.id == id)
    setModalId(list[index]['id']);
    setModalStatusField(list[index]['status']);
    setModalNameField(list[index]['name']);
    setModalRolesField(list[index]['roles']);
    setShowModal(true);

  }

  const handleDelButton = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const result = await api.removeProfile(id);
      if (result.error === '' || result.erro === undefined) {
        getList();
      } else {
        alert(result.error)
      }
    }
  }

  const handleSwitchClick = async (item) => {
    setLoading(true);
    const dataStatus = item.status == '1' ? '0' : '1'; // Troca o status entre 1 e 0
    const result = await api.updateProfileStatus(item.id, { 'status': dataStatus }); // Envie o novo status para a API
    setLoading(false);
    if (result.error === '' || result.error === undefined) {
      getList();
    } else {
      alert(result.error);
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'], // Formatação de texto
      [{ list: 'ordered' }, { list: 'bullet' }], // Listas ordenadas e não ordenadas
      ['link', 'image'], // Inserção de links e imagens
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],


      ['clean'], // Remoção de formatação
    ],
  };





  const handleModalSwitchClick = () => {
    setModalStatusField(modalStatusField == '1' ? '0' : '1');
  }
  return (
    <>
      <CRow>
        <CCol>
          <h2>Avisos </h2>

          <CCard>
            <CCardHeader>
              <CButton
                onClick={handleAddButton}
                color="primary"

              >
                <CIcon icon="cil-check" className="small-icon" /> Novo Aviso
              </CButton>
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={list}
                fields={fields}
                loading={loading}
                noItemsViewSlot=''
                columnFilter
                sorter
                hover
                striped
                border
                pagination
                itemsPerPage={10}
                scopedSlots={{
                  'Status': (item) => (
                    <td>
                      <CSwitch
                        color="success"
                        checked={item.status == '1' ? 'true' : ''}
                        onChange={() => handleSwitchClick(item)} />
                    </td>
                  ),
                  'Name': (item) => (
                    <td>
                      {item.name}
                    </td>
                  ),
                  'created_at': (item) => (
                    <td>
                      {new Date(item.updated_at).toLocaleDateString('pt-BR')}
                    </td>
                  ),

                  'actions': (item, index) => (
                    <td>
                      <CButtonGroup>
                        <CButton color="info" onClick={() => handleEditButton(item.id)} >
                          Editar
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelButton(item.id)}>Excluir</CButton>
                      </CButtonGroup>
                    </td>
                  )
                }}

              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal show={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Nova'} Aviso </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal_status">Ativo</CLabel><br />
            <CSwitch
              color="success"
              checked={modalStatusField == '0' ? '' : 'true'}
              onChange={handleModalSwitchClick}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal_title">Titulo</CLabel>
            <CInput
              type="text"
              id='modal_title'
              name="name"
              value={modalNameField}
              onChange={(e) => setModalNameField(e.target.value)}
            />
          </CFormGroup>
          <CFormGroup className="mb-5">
            <CLabel htmlFor="modal_Content">Roles</CLabel>
            <ReactQuill
              style={{ height: '300px' }} // Defina a altura desejada aqui
              theme="snow"
              modules={modules}
              value={modalRolesField}
              onChange={(roles) => setModalRolesField(roles)}
            />
          </CFormGroup>


        </CModalBody>
        <CModalFooter className="mt-5">
          <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
          <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>



        </CModalFooter>
      </CModal>
    </>
  )


};
export default Perfils;
