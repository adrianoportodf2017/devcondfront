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
  CInputFile,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import useApi from '../services/api';
export default () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalData, setModalData] = useState({
    id: '',
    name: '',
    cnpj: '',
    Thumb: '',
    description: '',
    address: '',
    adress_number: '',
    city: '',
    district: '',
    address_zip: '',
    state: '',
    billit: ''

  });

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
    const condominio = list[index];
    setModalData({
      id: condominio.id,
      name: condominio.name,
      cnpj: condominio.cnpj,
      Thumb: condominio.Thumb,
      description: condominio.description,
      address: condominio.address,
      adress_number: condominio.adress_number,
      city: condominio.city,
      district: condominio.district,
      address_zip: condominio.address_zip,
      state: condominio.state,
      billit: condominio.billit

    });
    setShowModal(true);
  }

  const handleRemoveButton = async (index) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const result = await api.removeCondominio(list[index].id);
      if (result.error === '') {
        getList();
      } else {
        alert(result.error);
      }
    }
  }

  const handleDownloadButton = async (index) => {
    window.open(list[index].fileurl);
  }

  const handleNewButton = () => {
    setModalData({
      id: '',
      name: '',
      cnpj: '',
      Thumb: '',
      description: '',
      address: '',
      adress_number: '',
      city: '',
      district: '',
      address_zip: '',
      state: '',
      billit: ''

    });
    setShowModal(true);
  }

  const handleModalSave = async () => {
    if (modalData.name && modalData.cnpj) {
      setModalLoading(true);
      let result;

      const data = {
        name: modalData.name,
        cnpj: modalData.cnpj,
        Thumb: modalData.Thumb,
        description: modalData.description,
        address: modalData.address,
        adress_number: modalData.adress_number,
        city: modalData.city,
        district: modalData.district,
        address_zip: modalData.address_zip,
        state: modalData.state,
        billit: modalData.billit

      };

      if (modalData.id === '') {
        if (modalData.Thumb) {
          result = await api.addCondominio(data);
        } else {
          alert('Selecione o arquivo');
          setModalLoading(false);
          return;
        }
      } else {
        result = await api.updateCondominio(modalData.id, data);
      }

      setModalLoading(false);

      if (result.error === '' && result.error != true ) {
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
                <CIcon icon="cil-check" className="small-icon" /> Novo Condomínio
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
      <CModal visible={true} show={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>{modalData.id === '' ? 'Novo' : 'Edssitar'} Condomínio</CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal-name">Nome</CLabel>
            <CInput
              type="text"
              id="modal-name"
              placeholder="Digite o nome"
              value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
              disabled={modalLoading}
            />
            <CLabel htmlFor="modal-cnpj">CNPJ</CLabel>
            <CInput
              type="text"
              id="modal-cnpj"
              placeholder="Digite o CNPJ"
              value={modalData.cnpj}
              onChange={(e) => setModalData({ ...modalData, cnpj: e.target.value })}
              disabled={modalLoading}
            />
             <CLabel htmlFor="modal-cnpj">Link para 2ª via do Boleto</CLabel>
            <CInput
              type="text"
              id="modal-billit"
              placeholder="Insira o Link"
              value={modalData.billit}
              onChange={(e) => setModalData({ ...modalData, billit: e.target.value })}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-Thumb">Insira uma Logo do Condomínio</CLabel>
            <CInput
              type="file"
              id="modal-Thumb"
              name="Thumb"
              onChange={(e) => setModalData({ ...modalData, Thumb: e.target.files[0] })}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-description">Descrição</CLabel>
            <CTextarea
              id="modal-description"
              placeholder="Digite a descrição"
              value={modalData.description}
              onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-address">Endereço</CLabel>
            <CInput
              type="text"
              id="modal-address"
              placeholder="Digite o endereço"
              value={modalData.address}
              onChange={(e) => setModalData({ ...modalData, address: e.target.value })}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-adress-number">Número do Endereço</CLabel>
            <CInput
              type="text"
              id="modal-adress-number"
              placeholder="Digite o número do endereço"
              value={modalData.adress_number}
              onChange={(e) => setModalData({ ...modalData, adress_number: e.target.value })}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-city">Cidade</CLabel>
            <CInput
              type="text"
              id="modal-city"
              placeholder="Digite a cidade"
              value={modalData.city}
              onChange={(e) => setModalData({ ...modalData, city: e.target.value })}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-district">Bairro</CLabel>
            <CInput
              type="text"
              id="modal-district"
              placeholder="Digite o bairro"
              value={modalData.district}
              onChange={(e) => setModalData({ ...modalData, district: e.target.value })}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-address-zip">CEP</CLabel>
            <CInput
              type="text"
              id="modal-address-zip"
              placeholder="Digite o CEP"
              value={modalData.address_zip}
              onChange={(e) => setModalData({ ...modalData, address_zip: e.target.value })}
              disabled={modalLoading}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-state">Estado</CLabel>
            <CInput
              type="text"
              id="modal-state"
              placeholder="Digite o estado"
              value={modalData.state}
              onChange={(e) => setModalData({ ...modalData, state: e.target.value })}
              disabled={modalLoading}
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
          >
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

    </>
  );
}