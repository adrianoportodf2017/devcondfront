import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import { htmlEditButton } from 'quill-html-edit-button';
import 'react-quill/dist/quill.snow.css';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
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
import { cibAtom, cilArrowCircleLeft, cilFolder, cilPencil, cilPlus, cilSave, cilTrash } from "@coreui/icons";

import useApi from '../services/api';
import FolderList from '../components/FolderList';
import FileList from '../components/FileList';
import AddFolderModal from '../components/AddFolderModal';
import AddFileModal from '../components/AddFileModal';

const Folder = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [folder, setFolder] = useState({});
    const [listFolders, setListFolders] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showIframeModal, setShowIframeModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState('');
    const [title, setTitle] = useState('');
    const [order, setOrder] = useState('');
    const [status, setStatus] = useState('1');
    const [content, setContent] = useState('');
    const [thumb, setThumb] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalFile, setShowModalFile] = useState(false);

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

    useEffect(() => {
        getFolder();
    }, [id]);

    const getFolder = async () => {
        setLoading(true);
        const result = await api.getFolderById(id);
        setLoading(false);

        if (result.error === '' || result.error === undefined) {
            setFolder(result);
            setTitle(result.title);
            setOrder(result.order);
            setStatus(result.status);
            setContent(result.content);
            setListFolders(result.children);
            setListFiles(result.midias);
        } else {
            alert(result.error);
        }
    };

    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        if (title) {
            const data = { id, title, status, order, content, thumb };
            try {
                const result = await api.updateFolder(data);
                if (result.error === '' || result.error === undefined) {
                    setFolder(result.list);
                    setIsEditing(false);
                } else {
                    setIsEditing(false);
                    alert(result.error);
                }
            } catch (error) {
                setIsEditing(false);
                alert('Erro ao criar a pasta. Verifique a conexão com a API.');
            }
        } else {
            alert('Preencha os campos para continuar.');
        }
    };

    const handleSwitchClick = async () => {
        const dataStatus = status === '1' ? '0' : '1';
        setStatus(dataStatus);
    };

    const handleDelButton = async () => {
        try {
            const result = await api.removeFolder(id);
            if (result.error === '' || result.error === undefined) {
                window.location.href = `/ListFolders/0`;
                setIsEditing(false);
            } else {
                setIsEditing(false);
                alert(result.error);
            }
        } catch (error) {
            setIsEditing(false);
            alert('Erro ao criar a pasta. Verifique a conexão com a API.' + error);
        }
    };

    const handleDelFile = async (id_file) => {

        // Pergunte ao usuário se ele deseja realmente excluir a pasta
        const confirm = await window.confirm(
            'Tem certeza de que deseja excluir este arquivo?' +
                '\n\n ATENÇÃO: Arquivo apagado permanentemente.',
                
        );
    
        if (confirm) {
            // Chame a API para excluir a pasta
            try {
                const result = await api.removeFile(id_file);
    
                if (result.error === '' || result.error === undefined) {
                    getFolder();
                    setIsEditing(false);
                    alert('Arquivo Deletado com Sucesso!');

    
                } else {
                    setIsEditing(false);
                    alert(result.error);
                }
            } catch (error) {
                setIsEditing(false);
                alert('Erro ao excluir a pasta. Verifique a conexão com a API.' + error);
            }
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
        <CModal show={showIframeModal} onClose={onClose} size="xl">
            <CModalBody>
                <div style={{ width: '100%', height: '800px' }}>
                    <iframe src={iframeUrl} width="100%" height="100%" frameBorder="0"></iframe>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={onClose} color="secondary">Fechar</CButton>
                <CButton color="primary" onClick={() => window.open(iframeUrl, "_blank")} >   Visualizar em Nova Guia </CButton>
            </CModalFooter>
        </CModal>
    );
};


    const handleFileClick = (item) => {
        if (item.type === 'imagem' || item.type === 'pdf') {
            openIframeModal(item.url);
        } else {
            window.open(item.url, '_blank');
        }
    };

    return (
        <>
            <CCard>
            <IframeModal iframeUrl={iframeUrl} onClose={() => setShowIframeModal(false)} className="modal-lg w-100" style={{ height: '500px' }} />
            <CCardBody>
                    <CCardHeader>
                        <CButtonGroup>
                            <CButton to={folder.parent_id ? `/Folders/${folder.parent_id}` : '/ListFolders/0'}>
                                <CIcon icon={cilArrowCircleLeft}  className="small-icon"/>{folder.parent_id ? 'Voltar Pasta Anterior' : 'Voltar Para Home'} </CButton>
                            {isEditing ? (
                                <CButton onClick={handleSave}><CIcon icon={cilSave} className="small-icon" />Salvar</CButton>
                            ) : (
                                <CButton onClick={handleEdit}><CIcon icon={cilPencil} className="small-icon" />Editar</CButton>
                            )}
                            <CButton onClick={handleDelButton}><CIcon icon={cilTrash}  className="small-icon"/>Excluir Pasta</CButton>
                        </CButtonGroup>
                    </CCardHeader>
                    <CRow>
                        <CCol md="1">
                            <CFormGroup>
                                <CLabel htmlFor="status">Status</CLabel><br />
                                <CSwitch
                                    id="status"
                                    color="success"
                                    checked={folder.status === '1'}
                                    onChange={handleSwitchClick}
                                    disabled={!isEditing}
                                />
                            </CFormGroup>
                        </CCol>
                        <CCol md="1">
                            <CFormGroup>
                                <CLabel htmlFor="status">Posição</CLabel><br />
                                {isEditing ? (
                                    <CInput
                                        type="number"
                                        id="order"
                                        value={order}
                                        onChange={(e) => setOrder(e.target.value)}
                                    />
                                ) : (
                                    <div>{folder.order}</div>
                                )}
                            </CFormGroup>
                        </CCol>
                        <CCol md="12">
                            <CFormGroup>
                                <CLabel htmlFor="title">Titulo</CLabel>
                                {isEditing ? (
                                    <CInput
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                ) : (
                                    <div>{folder.title}</div>
                                )}
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mb-5">
                        <CCol md="6">
                            <CFormGroup>
                                {isEditing && (
                                    <>
                                        <CLabel htmlFor="thumb">Imagem</CLabel>
                                        <img src={folder.thumb} width={300} className="m-3 rounded img-rounded" alt="Thumb" />
                                        <CInput
                                            type="file"
                                            id='modal_Thumb'
                                            name="Thumb"
                                            onChange={(e) => setThumb(e.target.files[0])}
                                            accept="image/*"
                                        />
                                    </>
                                )}
                            </CFormGroup>
                        </CCol>
                        <CCol md="12" className="mb-5">
                            <CFormGroup>
                                <CLabel htmlFor="modal_Content">Descrição</CLabel>
                                {isEditing ? (
                                    <ReactQuill
                                        style={{ height: '300px' }}
                                        theme="snow"
                                        value={content}
                                        modules={modules}
                                        onChange={(value) => setContent(value)}
                                    />
                                ) : (
                                    folder.content && folder.content !== "null" ? (
                                        <div dangerouslySetInnerHTML={{ __html: folder.content }} />
                                    ) : null
                                )}
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CCardFooter>
                        {isEditing && <CButton color="success" onClick={handleSave}>Salvar</CButton>}
                    </CCardFooter>
                </CCardBody>
            </CCard>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButtonGroup>
                                <CButton onClick={() => setShowModal(true)}>
                                    <CIcon icon={cilFolder} className="small-icon"  /> Nova Pasta
                                </CButton>
                                <CButton onClick={() => setShowModalFile(true)}>
                                    <CIcon icon={cilPlus} className="small-icon" /> Adicionar Arquivo
                                </CButton>
                            </CButtonGroup>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="File-row justify-content-left">
                                <FolderList listFolders={listFolders} handleDelFolder={handleDelButton} />
                                <FileList listFiles={listFiles} handleFileClick={handleFileClick} handleDelFile={handleDelFile} />
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <AddFolderModal showModal={showModal} handleCloseModal={() => setShowModal(false)} getFolder={getFolder} parentId={id} />
            <AddFileModal showModalFile={showModalFile} handleCloseModalFile={() => setShowModalFile(false)} getFolder={getFolder} parentId={id} />
        </>
    );
};

export default Folder;
