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
  CInputFile
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import useApi from '../services/api';

export default () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalNameField, setModalNameField] = useState('');
  const [modalCodigoField, setModalCodigoField] = useState('');
  const [modalCNPJField, setModalCNPJField] = useState('');
  const [modalThumbField, setModalThumbField] = useState('');
  const [modalId, setModalId] = useState('');

  const fields = [
    { label: 'Nome', key: 'name' },
    { label: 'Ações', key: 'actions', _style: { width: '1px' } }
  ];

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const result = await api.getCondominios();
    setLoading(false);
    if (result.error === '') {
      setList(result.list);
    } else {
      alert(result.error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleEditButton = (index) => {
    setModalId(list[index]['id']);
    setModalNameField(list[index]['name']);
    setModalNameField(list[index]['cnpj']);
    setModalCodigoField(list[index]['codigo']);
    setModalThumbField(list[index]['Thumb']);
    setShowModal(true);
  }

  const handleRemoveButton = async (index) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const result = await api.removeDocument(list[index]['id']);
      if (result.error === '') {
        getList();
      } else {
        alert(result.error);
      }
    }
  }


  const handleDownloadButton = async (index) => {
    window.open(list[index]['fileurl']);
  }

  const handleNewButton = () => {
    setModalId('');
    setModalNameField('');
    setModalCodigoField('');
    setModalCNPJField('');
    setModalThumbField('');
    setShowModal(true);
  }

  const handleModalSave = async () => {

    if (modalNameField) {
      setModalLoading(true);
      let result;

      let data = {
        name: modalNameField,
        codigo: modalCodigoField,
        cnpj: modalCNPJField

      };

      if (modalId === '') {
        if (setModalThumbField) {
          data.thumb = modalThumbField;
          result = await api.addCondominio(data);
        }
        else {
          alert('Selecione o arquivo');
          setModalLoading(false);
          return;
        }
      } else {
        if (modalThumbField) {
          data.thumb = modalThumbField;
        }
        result = await api.updateCondominio(modalId, data);
      }

      setModalLoading(false);
      if (result.error === '') {
        setShowModal(false);
        getList();
      } else {
        alert(result.error);
      }
    } else {
      alert('Preencha os campos!');
    }

  }

  return (
    <>
      <CRow>
        <CCol>
          <h2>Lista de Condomínios Cadastrados</h2>
          <CCard>
            <CCardHeader>
              <CButton color="primary" onClick={handleNewButton}>
                <CIcon name="cil-check" /> Novo Condomínio
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={list}
                fields={fields}
                loading={loading}
                noItemsViewSlot=" "
                hover
                striped
                bordered
                pagination
                itemsPerPage={5}
                scopedSlots={{
                  'actions': (item, index) => (
                    <td>
                      <CButtonGroup>
                        <CButton color="info" onClick={() => handleEditButton(index)}>Editar</CButton>
                        <CButton color='danger' onClick={() => handleRemoveButton(index)}>Excluir</CButton>
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
        <CModalHeader closeButton>{modalId === '' ? 'Novo' : 'Editar'} Condomínio</CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal-name">Nome</CLabel>
            <CInput
              type="text"
              id="modal-name"
              placeholder="Digite o nome"
              value={modalNameField}
              onChange={e => setModalNameField(e.target.value)}
              disabled={modalLoading}
            />
        <CLabel htmlFor="modal-codigo">Código</CLabel>
            <CInput
              type="text"
              id="modal-codigo"
              placeholder="Digite o codigo do Condomínio"
              value={modalCodigoField}
              onChange={e => setModalCodigoField(e.target.value)}
              disabled={modalLoading}
            />
             <CLabel htmlFor="modal-codigo">CNPJ</CLabel>
            <CInput
              type="text"
              id="modal-cnpj"
              placeholder="Digite o CNPJ"
              value={modalCNPJField}
              onChange={e => setModalCNPJField(e.target.value)}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-Thumb">Insira uma Logo do Condomínio</CLabel>
            <CInput
              type="file"
              id="modal-Thumb"
              name="Thumb"
              onChange={e => setModalThumbField(e.target.files[0])}
            />
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={handleModalSave}
            disabled={modalLoading}
          >
            {modalLoading ? 'Carregando...' : 'Salvar'}
          </CButton>
          <CButton
            color="secondary"
            onClick={handleCloseModal}
            disabled={modalLoading}
          >Cancelar</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}