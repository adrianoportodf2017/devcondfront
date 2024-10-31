import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import { htmlEditButton } from 'quill-html-edit-button';
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
  CSwitch,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CLabel,
  CListGroup,
  CListGroupItem,
  CBadge,
  CSelect,
  CInputCheckbox

} from '@coreui/react';

import useApi from '../services/api';
import { cibAtom, cilArrowCircleLeft, cilFolder, cilPencil, cilPlus, cilSave, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Portaria = () => {
  const api = useApi();

  const [acessos, setAcessos] = useState([]); // Exemplo de lista de acessos

  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState('');
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalNameField, setModalNameField] = useState('');
  const [modalEmailField, setModalEmailField] = useState('');
  const [modalPhoneField, setModalPhoneField] = useState('');
  const [modalUnitField, setModalUnitField] = useState('');
  const [modalTypeField, setModalTypeField] = useState('');
  const [modalDateField, setModalDateField] = useState('');
  const [modalLocationField, setModalLocationField] = useState('');
  const [ModalThumbField, setModalThumbField] = useState('');
  const [modalVeiculoField, setModalVeiculoField] = useState('');
  const [modalNotesField, setmodalNotesField] = useState('');

  

  useEffect(() => {
    setAcessos([
      {
        "data": "2024-09-13 10:30",
        "nome": "Pedro Santos",
        "tipo": "Visitante",
        "local": "Bloco A",
        "status": "Liberado"
      },
      {
        "data": "2024-09-13 11:00",
        "nome": "Ana Lima",
        "tipo": "Entrega",
        "local": "Bloco B",
        "status": "Aguardando"
      },
      {
        "data": "2024-09-13 11:15",
        "nome": "Roberto Costa",
        "tipo": "Morador",
        "local": "Bloco C",
        "status": "Liberado"
      }
    ]);
  }, []);


  const getList = async () => {
    setLoading(true);
    const result = await api.getBenefits();
    console.log(result);
    setLoading(false);

    if (result && result.error === '' || result.error === undefined) {
      setList(result.list);
    } else {
      if (result) {
        alert(result.error)
      }
      alert('erro');

    }
  };
  const handleAddButton = () => {
    setModalId('');
    setModalNameField('');
    setModalEmailField('');
    setModalPhoneField('');
    setModalUnitField('');
    setModalTypeField('');
    setModalDateField('');
    setModalThumbField('');
    setModalLocationField(''); 
    setModalVeiculoField('');     
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false)
  };
  const handleEditButton = (id) => {
    let index = list.findIndex(v => v.id == id)
    setModalId(list[index]['id']);
    setModalThumbField('');
    setModalNameField(list[index]['name']);
    setModalEmailField(list[index]['email']);
    setModalPhoneField(list[index]['phone']);
    setModalUnitField(list[index]['unit']);
    setModalTypeField(list[index]['type']);
    setModalDateField(list[index]['date']);
    setModalLocationField(list[index]['location']);
    setModalVeiculoField(list[index]['veiculo']);     
    setShowModal(true);
  }

  const handleDelButton = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const result = await api.removeBenefit(id);
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
    const result = await api.updateBenefitStatus(item.id, { 'status': dataStatus }); // Envie o novo status para a API
    setLoading(false);
    if (result.error === '' || result.error === undefined) {
      getList();
    } else {
      alert(result.error);
    }
  }



  const handleModalSave = async () => {
    if (modalNameField) {
      setModalLoading(true);
      let result;
      let data = {
        name: modalNameField,
        unit_id: modalUnitField,
        email: modalEmailField,
        phone: modalPhoneField,
        type: modalTypeField,
        date: modalDateField,
        location: modalLocationField,
        veiculo: modalVeiculoField,
        notes: modalNotesField,
      };


      if (ModalThumbField) {
        data.thumb = ModalThumbField;
      }

      if (modalId === '') {
        result = await api.addVisits(data)
      } else {
        result = await api.updateVisits(modalId, data);
      }

      setModalLoading(false)
      if (result.error === '' || result.error === undefined) {
        setShowModal(false);
        getList();
      } else {
        alert(result.error)
      }
    } else {
      alert('Preencha os campos para continuar')
    }
  };


  Quill.register('modules/htmlEditButton', htmlEditButton);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
    ],
    htmlEditButton: {
      debug: true,
      msg: "Edit the content in HTML format",
      okText: "Ok",
      cancelText: "Cancel",
      buttonHTML: "&lt;&gt;",
      buttonTitle: "Show HTML source",
      syntax: false,
      prependSelector: 'div#myelement',
      editorModules: {}
    }
  };
  return (
    <>
      {/* Título da página */}
      <CRow className="mb-3">
        <CCol>
          <h2>Portaria</h2>
        </CCol>
      </CRow>

      {/* Card principal para Porteiros */}

      {/* Cards de Acessos do Dia e Encomendas */}
      <CRow className="mb-4">
        {/* Card de Acessos do Dia */}
        <CCol xs="12" sm="12" lg="12">
          <CCard className="shadow-sm h-100">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CButton onClick={handleAddButton} color="light" border="true">
                <CIcon icon={cilPlus} className="small-icon" /> Novo Visitante
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CListGroup flush>
                {acessos.map((acesso, index) => (
                  <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Data:</strong> {acesso.data} <br />
                      <strong>Nome:</strong> {acesso.nome} <br />
                      <strong>Tipo:</strong> {acesso.tipo} <br />
                      <strong>Local:</strong> {acesso.local}
                    </div>
                    {/* Badge de Status */}
                    <CBadge color={acesso.status === 'Autorizado' ? 'success' : 'danger'}>
                      {acesso.status}
                    </CBadge>
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={showModal} onClose={handleCloseModal} size="lg" closeOnBackdrop={false}>
        <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Novo'} Visitante </CModalHeader>
        <CModalBody>

          <div className="row">
            <div className="col-sm-6">
              <CFormGroup>
                <CLabel htmlFor="unidade">Unidade / Bloco</CLabel>
                <CSelect
                  id="unidade"
                  name="unidade"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="">Selecione...</option>

                </CSelect>
              </CFormGroup>
            </div>
            <div className="col-sm-6">

              <CFormGroup>
                <CLabel htmlFor="local">Local</CLabel>
                <CSelect
                  id="local"
                  name="local"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Unidade">Unidade</option>
                  <option value="Dependências do Condomínio">Dependências do Condomínio</option>
                </CSelect>
              </CFormGroup>

            </div>

            <div className="col-sm-12 ">
              <CFormGroup>
                <div className="border-bottom rounded-bottom p-2 mb-3 d-flex ">
                  <div className="align-items-center m-3 ">
                    <CInputCheckbox
                      type="radio"
                      id="convidado"
                      name="para"
                      value="convidado"
                      required
                    />
                    <CLabel htmlFor="convidado" className="ms-2">Convidado</CLabel>
                  </div>
                  <div className=" align-items-center m-3">
                    <CInputCheckbox
                      type="radio"
                      id="prestador_servico"
                      name="para"
                      value="prestador_servico"
                      required
                    />
                    <CLabel htmlFor="prestador_servico" className="ms-2">Prestador de Serviços</CLabel>
                  </div>
                </div>
              </CFormGroup>
            </div>

            <div className="col-sm-6 ">
              <CFormGroup>
                <CLabel htmlFor="nome">Nome</CLabel>
                <CInput
                  type="text"
                  id="nome"
                  name="nome"
                  required
                />
              </CFormGroup>
            </div>
            <div className="col-sm-6 ">
              <CFormGroup>
                <CLabel htmlFor="documento">Documento</CLabel>
                <CInput
                  type="text"
                  id="documento"
                  name="documento"
                />
              </CFormGroup>
            </div>

            <div className="col-sm-6 ">
              <CFormGroup>
                <CLabel htmlFor="email">E-mail</CLabel>
                <CInput
                  type="text"
                  id="email"
                  name="email"
                //onChange={handleChange}
                />
              </CFormGroup>
            </div>
            <div className="col-sm-6 ">

              <CFormGroup>
                <CLabel htmlFor="celular">Celular</CLabel>
                <CInput
                  id="celular"
                  name="celular"
                />
              </CFormGroup>
            </div>

          </div>
          <CFormGroup>
            <CLabel htmlFor="modal_Thumb">Foto</CLabel>
            <CInput
              type="file"
              id='modal_Thumb'
              name="Thumb"
              placeholder="Escolha uma Imagem"
              onChange={(e) => setModalThumbField(e.target.files[0])}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="data_ini">Início</CLabel>
            <CInput
              type="datetime-local"
              id='modal_event'
              name="event"
       
            />
          </CFormGroup>
        </CModalBody>
        <CModalFooter className="mt-5">
          <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
          <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>

        </CModalFooter>
      </CModal>
    </>
  );
};

export default Portaria;
