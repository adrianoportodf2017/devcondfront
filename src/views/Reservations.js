import React, { useState, useEffect } from 'react';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel ,
  CFormTextarea,
  CFormInput  ,
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
  const [modalTitleField, setModalTitleField] = useState('');
  const [modalFileField, setModalFileField] = useState('');
  const [modalId, setModalId] = useState('');

  const fields = [
    { label: 'Unidade', key: 'name_unit' },
    { label: 'Área', key: 'name_area' },
    { label: 'Data da Reserva', key: 'reservation_date' },
    { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
  ];

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const result = await api.getReservations();
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
    setModalTitleField(list[index]['title']);
    setModalFileField(list[index]['fileurl']);
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
    setModalTitleField('');
    setModalFileField('');
    setShowModal(true);
  }

  const handleModalSave = async () => {

    if (modalTitleField) {
      setModalLoading(true);
      let result;

      let data = {
        title: modalTitleField
      };

      if (modalId === '') {
        if (modalFileField) {
          data.file = modalFileField;
          result = await api.addDocument(data);
        }
        else {
          alert('Selecione o arquivo');
          setModalLoading(false);
          return;
        }
      } else {
        if (modalFileField) {
          data.file = modalFileField;
        }
        result = await api.updateDocument(modalId, data);
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
          <h2>Reservas</h2>
          <CCard>
            <CCardHeader>
              <CButton color="primary" onClick={handleNewButton}>
                <CIcon name="cil-check" /> Nova Reserva
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable
                items={list}
                fields={fields}
                loading={loading}
                noItemsViewSlot=" "
                columnFilter
                sorter
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
        <CModalHeader closeButton>{modalId === '' ? 'Novo' : 'Editar'} Reserva</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel  htmlFor="modal-title">Título da Reserva</CFormLabel >
            <CFormInput  
              type="text"
              id="modal-title"
              placeholder="Digite um título do documento"
              value={modalTitleField}
              onChange={e => setModalTitleField(e.target.value)}
              disabled={modalLoading}
            />
          </CForm>
          <CForm>
            <CFormLabel  htmlFor="modal-file">Insira uma Imagem ou PDF</CFormLabel >
            <CFormInput  
              type="file"
              id="modal-file"
              name="file"
              onChange={e => setModalFileField(e.target.files[0])}
            />
          </CForm>
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