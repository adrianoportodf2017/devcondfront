import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import { htmlEditButton } from 'quill-html-edit-button';
import 'react-quill/dist/quill.snow.css';
import { cibAtom, cilArrowCircleLeft, cilFolder, cilPencil, cilPlus, cilSave, cilTrash } from "@coreui/icons";

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
    CSelect,
    CTextarea

} from '@coreui/react';
import CIcon from "@coreui/icons-react";

import useApi from '../services/api'



const Noticias = () => {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');
    const [modalStatusThumbField, setModalStatusThumbField] = useState('');

    const [category, setCategory] = useState([]);
    const [modalCategoryField, setModalCategoryField] = useState('')





    const fields = [
        { label: 'Ativo', key: 'Status', sorter: false, filter: false },
        { label: 'Capa', key: 'Thumb', sorter: false, filter: false },
        { label: 'Título', key: 'title' },
        { label: 'Descrição', key: 'content' },
        { label: 'Relatório', key: 'likes_count', sorter: false, filter: false },
        { label: 'Data da publicação', key: 'created_at' },
        { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
    ]

    useEffect(() => {
        getList();

    }, []);



    const getList = async () => {
        setLoading(true);
        const result = await api.getNews();
        const category = await api.getCategories('noticias');

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
        setModalStatusField('1');
        setModalStatusThumbField('1');
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
                status_thumb: modalStatusThumbField,
                title: modalTitleField,
                content: modalContentField,
                category_id: modalCategoryField,

            };

            if (modalThumbField) {
                data.thumb = modalThumbField;
            };


            if (modalId === '') {
                result = await api.addNew(data)
            } else {
                result = await api.updateNew(modalId, data);
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
        setModalStatusThumbField(list[index]['status_thumb']);
        setModalThumbField('');
        setModalTitleField(list[index]['title']);
        setModalCategoryField(list[index]['category_id']);
        setModalContentField(list[index]['content']);
        setShowModal(true);

    }

    const handleDelButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.removeNew(id);
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
        const result = await api.updateNewStatus(item.id, { 'status': dataStatus }); // Envie o novo status para a API
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
    const handleModalSwitchThumbClick = () => {
        setModalStatusThumbField(modalStatusThumbField == '1' ? '0' : '1');
    }


    Quill.register('modules/htmlEditButton', htmlEditButton);


    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['clean']
        ],
        keyboard: {
            bindings: {
                tab: false
            }
        },
        htmlEditButton: {
            debug: true, // logging, default:false
            msg: "Edit the content in HTML format", //Custom message to display in the editor, default: Edit HTML here, when you click "OK" the quill editor's contents will be replaced
            okText: "Ok", // Text to display in the OK button, default: Ok,
            cancelText: "Cancel", // Text to display in the cancel button, default: Cancel
            buttonHTML: "&lt;&gt;", // Text to display in the toolbar button, default: <>
            buttonTitle: "Show HTML source", // Text to display as the tooltip for the toolbar button, default: Show HTML source
            syntax: false, // Show the HTML with syntax highlighting. Requires highlightjs on window.hljs (similar to Quill itself), default: false
            prependSelector: 'div#myelement', // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
            editorModules: {} // The default mod
        }
    };

    class CustomClipboard {
        constructor(quill, options) {
            this.quill = quill;
            this.options = options;
            
            quill.root.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text');
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = text;
                
                // Preserve classes from elements
                const elements = tempDiv.getElementsByTagName('*');
                Array.from(elements).forEach(el => {
                    if (el.classList.length > 0) {
                        el.setAttribute('class', el.getAttribute('class'));
                    }
                });
                
                const cleanHtml = tempDiv.innerHTML;
                const delta = quill.clipboard.convert(cleanHtml);
                quill.setContents(delta, 'silent');
            });
        }
    }

    ReactQuill.Quill.register('modules/customClipboard', CustomClipboard, true);


    return (
        <>
            <CRow>
                <CCol>
                    <h2>Noticias </h2>

                    <CCard>
                        <CCardHeader>
                            <CButton onClick={handleAddButton} color="light" border="true">
                                <CIcon icon={cilPlus} className="small-icon" /> Novo Noticia
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

                                    'content': (item) => (  // Corrigido: adicionado a chave 'content' e a função
                                        <td>
                                            {item.content 
                                                ? item.content.replace(/<[^>]*>/g, '').substring(0, 30) + 
                                                  (item.content.length > 30 ? '...' : '')
                                                : 'N/A'}
                                        </td>
                                    ),

                                    'likes_count': (item) => (
                                        <td>
                                            <tr>Curtidas: {item.likes_count}</tr>
                                            <tr>Visualizaçoes: {item.views_count}</tr>
                                            <tr>Comentários: {item.comments_count}</tr>


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
                                                <CButton color="light" onClick={() => handleEditButton(item.id)} >
                                                    <CIcon icon={cilPencil} className="small-icon" />

                                                    Editar
                                                </CButton>
                                                <CButton color="light" onClick={() => handleDelButton(item.id)}>
                                                    <CIcon icon={cilTrash} className="small-icon" />
                                                    Excluir</CButton>
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
                <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Nova'} Noticia </CModalHeader>
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
                        <CLabel htmlFor="modal_status">Colocar Imagem no Topo da Notícia?</CLabel><br />
                        <CSwitch
                            color="success"
                            checked={modalStatusThumbField == '0' ? '' : 'true'}
                            onChange={handleModalSwitchThumbClick}
                        /><br />
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
                        <CLabel htmlFor="modal-profile">Selecione Uma Categoria</CLabel>
                        <CSelect
                            id="modal-category"
                            value={modalCategoryField}
                            onChange={(e) => setModalCategoryField(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Selecione uma Categoria</option>

                            {category.map((item) => (
                                <option key={item.id} value={item.id} selected={item.id === modalCategoryField}>
                                    {item.name}
                                </option>
                            ))}
                        </CSelect>
                    </CFormGroup>


                    <CFormGroup className="mb-5">
    <CLabel htmlFor="modal_Content">Descrição</CLabel>
    <CTextarea
        id="modal_Content"
        name="content"
        value={modalContentField}
        onChange={(e) => setModalContentField(e.target.value)}
        style={{ height: '300px', marginBottom: '50px' }}
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
export default Noticias;