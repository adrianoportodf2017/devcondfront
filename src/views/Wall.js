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
    CSelect

} from '@coreui/react';
import CIcon from "@coreui/icons-react";

import useApi from '../services/api'



const Avisos = () => {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalTypeField, setModalTypeField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');



    const fields = [
        { label: 'Ativo', key: 'Status', sorter: false, filter: false },
        { label: 'Capa', key: 'Thumb', sorter: false, filter: false },
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
        const result = await api.getWall();
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
        setModalTitleField('');
        setModalStatusField('1');
        setModalThumbField('');
        setModalTypeField('');
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
                type: modalTypeField,
                content: modalContentField,
            };

            if (modalThumbField) {
                data.thumb = modalThumbField;
            };


            if (modalId === '') {
                result = await api.addWall(data)
            } else {
                result = await api.updateWall(modalId, data);
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
        setModalTypeField(list[index]['type']);


        setModalContentField(list[index]['content']);
        setShowModal(true);

    }

    const handleDelButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.removeWall(id);
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
        const result = await api.updateWallStatus(item.id, { 'status': dataStatus }); // Envie o novo status para a API
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
                                    'Thumb': (item) => (
                                        <td>
                                            <img src={item.thumb} width={100} />
                                        </td>
                                    ),

                                    'Title': (item) => (
                                        <td>
                                            {item.title}
                                        </td>
                                    ),

                                    'content': (item) => (
                                        <td>
                                            {item.content.replace(/<[^>]*>/g, '').substring(0, 150)}
                                            {item.content.length > 150 ? '...' : ''}
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

            <CModal show={showModal} onClose={handleCloseModal} size="xl">
                <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Nova'} Aviso </CModalHeader>
                <CModalBody>
                    <CFormGroup>

                        <div className="row">
                            <div className="col-sm-6">
                                <CFormGroup>
                                    <CLabel htmlFor="modal-status">Status</CLabel>
                                    <CSelect
                                        id="modal-status"
                                        value={modalStatusField}
                                        onChange={(e) => setModalStatusField(e.target.value)}
                                        disabled={loading}
                                    >
                                        <option value="">Status</option>
                                        <option value="0" selected={"0" == modalStatusField}>
                                            Desativar                                    </option>
                                        <option value="1" selected={"1" == modalStatusField}>
                                            Ativar
                                        </option>
                                    </CSelect>
                                </CFormGroup>
                            </div>
                            <div className="col-sm-6">
                                <CFormGroup>
                                    <CLabel htmlFor="modal-type">Restrição de Aviso</CLabel>
                                    <CSelect
                                        id="modal-type"
                                        value={modalTypeField}
                                        onChange={(e) => setModalTypeField(e.target.value)}
                                        disabled={loading}
                                    >
                                        <option value="0" selected={modalTypeField === "0"}>
                                            Público
                                        </option>
                                        <option value="1" selected={modalTypeField === "1"}>
                                            Restrito - Apenas para Usuários Logados
                                        </option>
                                    </CSelect>
                                </CFormGroup>
                            </div>

                            <div className="col-xl-6">
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
                            </div>
                        </div>
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
                    <CFormGroup className="mb-5">
                        <CLabel htmlFor="modal_Content">Descrição</CLabel>
                        <ReactQuill
                            style={{ height: '300px' }} // Defina a altura desejada aqui
                            theme="snow"
                            modules={modules}
                            value={modalContentField}
                            onChange={(content) => setModalContentField(content)}
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
export default Avisos;