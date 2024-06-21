import React, { useState, useEffect } from "react";
import './../scss/_custom.scss'; // Importe o arquivo CSS personalizado aqui
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputMask from 'react-input-mask';


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



const Galerias = () => {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');
    const [modalUserIdField, setModalUserIdField] = useState('');
    const [category, setCategory] = useState([]);
    const [modalCategoryField, setModalCategoryField] = useState('');
    const [modalFileField, setModalFileField] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);







    const  fields = [
        { label: 'Capa', key: 'Thumb', sorter: false, filter: false },
        { label: 'Título', key: 'title' },
        { label: 'Descrição', key: 'content' },
        { label: 'Status', key: 'status', sorter: false, filter: false },
        { label: 'Data da publicação', key: 'created_at' },
        { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
    ]

    useEffect(() => {
        getList();

    }, []);



    const getList = async () => {
        setLoading(true);
        const result = await api.getGalleries();
        const category = await api.getCategories('galerias');

        console.log(result);
        setLoading(false);

        if (result.error === '' || result.error === undefined) {
            setList(result.list);
            if (category) { setCategory(category.list); }

        } else {
            alert(result.error)
        }
    };

    const handleAddButton = () => {
        setModalId('');
        setModalTitleField('');
        setModalStatusField('0');
        setModalThumbField('');
        setModalContentField('');
        setModalFileField('');
        setModalUserIdField(localStorage.getItem('userId'));
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
                category_id: modalCategoryField,
                user_id: modalUserIdField,
                status: modalStatusField

            };

            if (modalThumbField) {
                data.thumb = modalThumbField;
            };


            if (modalId === '') {
                result = await api.addGallery(data)
            } else {
                result = await api.updateGallery(modalId, data);
            }

            setModalLoading(false)
            if (result.error === '' || result.error === undefined) {
                getList();
                setModalId(result.list.id)
                setShowModal(true);
                alert('Item Salvo Com Sucesso')

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
        setModalCategoryField(list[index]['category_id']);
        setModalContentField(list[index]['content']);
        setModalUserIdField(list[index]['user_id']);
        setListFiles(list[index]['midias']);
        setShowModal(true);

    }
    const handleDelButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.removeGallery(id);
            if (result.error === '' || result.error === undefined) {
                // Remova o item da lista atual de arquivos
                getList();
            } else {
                alert(result.error);
            }
        }
    };



    const handleDelFile = async (id_file) => {
        // Pergunte ao usuário se ele deseja realmente excluir o arquivo
        const confirm = await window.confirm(
            'Tem certeza de que deseja excluir este arquivo?' +
            '\n\n ATENÇÃO: Arquivo apagado permanentemente.'
        );

        if (confirm) {
            // Chame a API para excluir o arquivo
            try {
                const result = await api.removeFileGallery(id_file);

                if (result.error === '' || result.error === undefined) {
                    // Atualize listFiles para remover o arquivo excluído
                    setListFiles((currentFiles) => currentFiles.filter((file) => file.id !== id_file));
                    alert('Arquivo Deletado com Sucesso!');
                } else {
                    alert(result.error);
                }
            } catch (error) {
                alert('Erro ao excluir o arquivo. Verifique a conexão com a API.' + error);
            }
        }
    };

    const handleAddFile = async () => {
        if (modalFileField) {
            setModalLoading(true);
            const data = {
                file: modalFileField,
                id: modalId
            };
            const result = await api.addFileGallery(data, (percentCompleted) => {
                setUploadProgress(percentCompleted);
            });
            setModalLoading(false);
            if (result.error === '' || result.error === undefined) {
                // Atualize listFiles para remover o arquivo excluído
                setListFiles(result['list']['midias']);
            } else {
                alert(result.error);
            }
        } else {
            setModalLoading(false);
            alert('Preencha os campos para continuar');
        }
    };

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
                    <h2>Galerias </h2>

                    <CCard>
                        <CCardHeader>

                            <CButton
                                onClick={handleAddButton}
                                color="primary"                            >
                                <CIcon icon="cil-check" className="small-icon" /> Nova Galeria
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
                                            {item.content ? (
                                                <span>
                                                    {item.content.replace(/<[^>]*>/g, '').substring(0, 30)}
                                                    {item.content.length > 30 ? '...' : ''}
                                                </span>
                                            ) : null}
                                        </td>
                                    ),

                                    'status': (item) => (
                                        <td>
                                            {item.status === '1' ? (
                                                <span className="badge badge-success ">Ativo</span>
                                            ) : (
                                                <span className="badge badge-warning text-light">Desativado</span>
                                            )}
                                        </td>
                                    ),
                                    'name': (item) => (
                                        <td>
                                            <tr>Prop. {item.name}</tr>
                                            <tr>{item.contact}</tr>
                                            <tr>{item.adress}</tr>



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

            <CModal show={showModal} onClose={handleCloseModal} size="lg">
                <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Nova'}   - Galeria

                </CModalHeader>
                <CModalBody>
                    <div className="row">
                        <div className="col-sm-12">
                            <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
                            <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
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
                        <div className="col-sm-9">
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

                    <div className="row">
                        <div className="col-sm-12">
                            <CFormGroup>
                                <CLabel htmlFor="modal_Thumb">Capa</CLabel>
                                <CInput
                                    type="file"
                                    id='modal_Thumb'
                                    name="Thumb"
                                    placeholder="Escolha uma Imagem"
                                    onChange={(e) => setModalThumbField(e.target.files[0])}
                                    accept="image/*"
                                />
                            </CFormGroup>
                        </div>
                    </div>
                    {modalId && (
                        <div className="row m-1" >

                            <div className="row m-1">
                                <CLabel htmlFor="modal_Thumb">Galeria</CLabel>
                            </div>
                            <CFormGroup className="input-group mb-3">
                                <CInput
                                    type="file"
                                    id='file'
                                    name="file"
                                    className="form-control"
                                    placeholder=""
                                    onChange={(e) => setModalFileField([...e.target.files])}
                                    accept="image/*"
                                    multiple

                                />
                                <CButton color="primary" onClick={() => handleAddFile()} >Enviar nova imagem</CButton>
                            </CFormGroup>

                            {modalLoading && (
                                <div>
                                    <p>Progresso de Upload: {uploadProgress}%</p>
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: `${uploadProgress}%` }}
                                            aria-valuenow={uploadProgress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <CFormGroup className="mb-5">
                        <CLabel htmlFor="modal_Content">Descrição</CLabel>
                        <ReactQuill
                            style={{ height: '250px' }} // Defina a altura desejada aqui
                            theme="snow"
                            modules={modules}
                            value={modalContentField}
                            onChange={(content) => setModalContentField(content)}
                        />
                    </CFormGroup>
                    <CRow className="align-items-stretch">

                        {listFiles.map((item) => (
                            <CCol md="4" key={item.id} className="mt-5 file-column">
                                <div className="file-item d-flex flex-column" style={{ cursor: "pointer" }}>
                                    <img
                                        src={item.thumb ? item.thumb : item.icon}
                                        alt={item.title}
                                        className="img-fluid"
                                        style={{ width: '100%' }}
                                    />

                                    <h5 className="mt-auto">{item.title}</h5> {/* Use a classe "mt-auto" para alinhar no final da coluna. */}

                                    <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                    <CButton color="danger" onClick={() => handleDelFile(item.id)}>Excluir</CButton>
                                </div>
                            </CCol>
                        ))}
                    </CRow>



                </CModalBody>
                <CModalFooter className="mt-5">
                    <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
                    <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>



                </CModalFooter>
            </CModal>
        </>
    )


};
export default Galerias;