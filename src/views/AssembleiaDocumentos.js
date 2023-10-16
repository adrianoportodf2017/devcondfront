import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
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
    CLink,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,
    CSwitch,

} from '@coreui/react';
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons';


import useApi from '../services/api'



const DocumentosAssembleia = () => {
    const api = useApi();
    const { id } = useParams();


    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalFileField, setModalFileField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalContentField, setModalContentField] = useState([]);
    const [showIframeModal, setShowIframeModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(false);



    const fields = [
        { label: 'Ativo', key: 'Status', sorter: false, filter: false },
        { label: 'Capa', key: 'Thumb', sorter: false, filter: false },
        { label: 'Documento', key: 'file_url', sorter: false, filter: false },
        { label: 'Título', key: 'title' },
        { label: 'Descrição', key: 'content' },
        { label: 'Data da publicação', key: 'created_at' },
        { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
    ]

    useEffect(() => {
        getList();

    }, []);



    const getList = async () => {
        setLoading(true);
        const result = await api.getDocumentosAssembleia(id);
        console.log(result);
        setLoading(false);

        if (result.error === '' || result.error === undefined) {
            setList(result.list);
        } else {
            alert(result.error)
        }
    };
/**
 * 
 * Função para abrir modal do documento
*/
    const openIframeModal = (url) => {
        setIframeUrl(url);
        setShowIframeModal(true);
      };

      const IframeModal = ({ iframeUrl, onClose }) => {
        return (
          <CModal show={showIframeModal} onClose={onClose}>
            <CModalBody>
              <iframe src={iframeUrl} width="100%" height="400px" frameBorder="0"></iframe>
            </CModalBody>
            <CModalFooter>
              <CButton onClick={onClose} color="secondary">Fechar</CButton>
            </CModalFooter>
          </CModal>
        );
      };  

    const handleAddButton = () => {
        setModalId('');
        setModalStatusField('1');
        setModalTitleField('');
        setModalFileField('');
        setModalThumbField('');
        setModalContentField('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };


    const handleModalSave = async () => {

        if (modalTitleField) {
            setModalLoading(true);
            let result;
            let data = {
                status: modalStatusField,
                title: modalTitleField,
                content: modalContentField,
                assembleia_id: id
            };

            if (modalThumbField) {
                data.thumb = modalThumbField;
            };
            if (modalFileField) {
                data.file = modalFileField;
            };


            if (modalId === '') {
                result = await api.addDocumentoAssembleia(data)
            } else {
                result = await api.updateDocumentoAssembleia(modalId, data);
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


    const handleEditButton = (id) => {
        let index = list.findIndex(v => v.id == id)
        setModalId(list[index]['id']);
        setModalStatusField(list[index]['status']);
        setModalThumbField('');
        setModalTitleField(list[index]['title']);
        setModalFileField('');
        setModalContentField(list[index]['content']);
        setShowModal(true);

    }

    const handleDelButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.removeDocumentoAssembleia(id);
            if (result.error == '' || result.error == undefined) {
                getList();
            } else {
                alert(result.error)
            }
        }
    }

    const handleSwitchClick = async (item) => {
        setLoading(true);
        const dataStatus = item.status == '1' ? '0' : '1'; // Troca o status entre 1 e 0
        const result = await api.updateDocumentoAssembleiaStatus(item.id, { 'status': dataStatus }); // Envie o novo status para a API
        setLoading(false);
        if (result.error === '' || result.error === undefined) {
            getList();
        } else {
            alert(result.error);
        }
    }






    const handleModalSwitchClick = () => {
        setModalStatusField(modalStatusField == '1' ? '0' : '1');
    }
    return (
        <>
            <CRow>
                <IframeModal iframeUrl={iframeUrl} onClose={() => setShowIframeModal(false)} />

                <CCol>
                    <h2>Documentos da Assembleia: { id }  </h2>

                    <CCard>
                        <CCardHeader>
                            <CButtonGroup className="p-2">


                                <CButton color="success" to="/Assembleias">
                                    <div className="d-flex align-items-center">
                                        <CIcon content={freeSet.cilArrowCircleLeft} customClasses="" />
                                        Voltar
                                    </div>
                                </CButton>
                                <CButton onClick={handleAddButton} color="primary">
                                    <CIcon name="cil-check" /> Novo Documento
                                </CButton>
                            </CButtonGroup>
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
                                    'Thumb': (item) => (
                                        <td>
                                            <img src={item.thumb} width={100} />
                                        </td>
                                    ),

                                    'file_url': (item) => (
                                        <td>
                                          <CLink onClick={() => openIframeModal(item.file_url)}>Visualizar</CLink>
                                        </td>
                                      ),

                                    'Title': (item) => (
                                        <td>
                                            {item.title}
                                        </td>
                                    ),

                                    'created_at': (item) => (
                                        <td>
                                            {new Date(item.created_at).toLocaleDateString('pt-BR')}
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
                <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Nova'} Assembleia </CModalHeader>
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
                            name="title"
                            value={modalTitleField}
                            onChange={(e) => setModalTitleField(e.target.value)}
                        />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="modal_File">Documento</CLabel>
                        <CInput
                            type="file"
                            id='modal_File'
                            name="File"
                            placeholder="Escolha uma Documento"
                            onChange={(e) => setModalFileField(e.target.files[0])}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_Thumb">Capa</CLabel>
                        <CInput
                            type="file"
                            id='modal_Thumb'
                            name="Thumb"
                            placeholder="Escolha uma Imagem"
                            onChange={(e) => setModalThumbField(e.target.files[0])}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_Content">Descrição</CLabel>
                        <CInput
                            type="text"
                            id='modal_Content'
                            name="Content"
                            placeholder=""
                            value={modalContentField}
                            onChange={(e) => setModalContentField(e.target.value)}
                        />
                    </CFormGroup>


                </CModalBody>
                <CModalFooter>
                    <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
                    <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>



                </CModalFooter>
            </CModal>
        </>
    )


};
export default DocumentosAssembleia;