import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
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


import useApi from '../services/api';


const Folder = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [folder, setFolder] = useState({});
    const [listFolders, setListFolders] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [modalStatusField, setModalStatusField] = useState('');
    const [showIframeModal, setShowIframeModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(false);


    const fieldsListFolder = [
        { label: 'Capa', key: 'Thumb', sorter: false, filter: false },
        { label: 'Título', key: 'title' },
        { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
    ]

    useEffect(() => {
        getFolder();
    }, [id]);

    const getFolder = async () => {
        setLoading(true);
        const result = await api.getFolderById(id);
        setLoading(false);

        if (result.error === '' || result.error === undefined) {
            setFolder(result);
            setListFolders(result.children);
            setListFiles(result.midias);
        } else {
            alert(result.error);
        }
    };


    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleAddButton = () => {
        // setIsEditing(true);
    };
    const handleDelButton = () => {
        // setIsEditing(true);
    };


    const handleSave = async () => {
        setLoading(true);
        // Envie as informações atualizadas de folder para a API ou faça as ações necessárias
        // para salvar as alterações na pasta.
        // Você pode adicionar a lógica de atualização aqui.
        // Depois, atualize a lista de pastas se necessário.
        setLoading(false);
        setIsEditing(false);
    };

    const handleSwitchClick = async () => {
        setLoading(true);
        const dataStatus = folder.status === '1' ? '0' : '1'; // Troca o status entre 1 e 0
        const result = await api.updateFolderStatus(id, { 'status': dataStatus }); // Envie o novo status para a API usando o ID correto
        setLoading(false);

        if (result.error === '' || result.error === undefined) {
            // Atualize o estado local da pasta após a alteração do status
            setFolder({ ...folder, status: dataStatus });
        } else {
            alert(result.error);
        }
    }

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

    return (
        <>
            <CCard>
                <IframeModal iframeUrl={iframeUrl} onClose={() => setShowIframeModal(false)} className="modal-lg w-100" style={{ height: '500px' }} />
                <CCardBody>
                    <CRow>
                        <CCol md="1">
                            <CFormGroup>
                                <CLabel htmlFor="status">Status</CLabel><br />
                                {isEditing ? (
                                    <CSwitch
                                        id="status"
                                        color="success"
                                        checked={folder.status === '1'} // Use um valor booleano
                                        onChange={handleSwitchClick}
                                    />
                                ) : (
                                    <CSwitch
                                        id="status"
                                        color="success"
                                        checked={folder.status === '1'} // Use um valor booleano
                                        onChange={handleSwitchClick}
                                        disabled
                                    />)}
                            </CFormGroup>
                        </CCol>
                        <CCol md="12">
                            <CFormGroup>
                                <CLabel htmlFor="title">Titulo</CLabel>
                                {isEditing ? (
                                    <CInput
                                        type="text"
                                        id="title"
                                        value={folder.title}
                                        onChange={(e) => setFolder({ ...folder, title: e.target.value })}
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
                                <CLabel htmlFor="thumb">Imagem</CLabel>
                                {isEditing ? (
                                    <div ><img src={folder.thumb} width={300} className="m-3 rounded img-rounded" />
                                        <CInput
                                            type="file"
                                            id='modal_Thumb'
                                            name="Thumb"
                                            placeholder="Escolha uma Imagem"
                                            onChange={(e) => setFolder(e.target.files[0])}
                                        />
                                    </div>
                                ) : (
                                    <div><img src={folder.thumb} width={300} /></div>
                                )}
                            </CFormGroup>
                        </CCol>
                        <CCol md="12" className="mb-5">
                            <CFormGroup >
                                <CLabel htmlFor="modal_Content">Descrição</CLabel>
                                {isEditing ? (
                                    <ReactQuill
                                        style={{ height: '300px' }} // Defina a altura desejada aqui
                                        theme="snow"
                                        modules={modules}
                                        value={folder.content}
                                    //  onChange={(e) => setFolder({ ...folder, content: e.target.value })}
                                    />
                                ) : (
                                    <div>{folder.content}</div>
                                )}
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-5">
                        <CCol md="6">
                            {isEditing ? (
                                <CButton color="success" onClick={handleSave}>Save</CButton>
                            ) : (
                                <CButton color="primary" onClick={handleEdit}>Edit</CButton>
                            )}
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CRow>
                <CCol>
                    <h2>Pastas </h2>

                    <CCard>
                        <CCardHeader>
                            <CButton
                                onClick={handleAddButton}
                                color="primary"

                            >
                                <CIcon name="cil-check" /> Nova Pasta
                            </CButton>
                        </CCardHeader>

                        <CCardBody>
                            <CRow className="File-row">
                                {listFolders.map((item) => (
                                    <CCol md="4" key={item.id}>
                                        <div className="folder-item d-flex flex-column">
                                            <img src={item.thumb} width={200} alt={item.title} className="img-fluid rounded m-2" style={{ width: '250px', height: '250px' }} />
                                            <h3 className="flex-fill">{item.title}</h3>
                                            <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                        <CButtonGroup>
                                            <CButton color="info" to={`/Folders/${item.id}`}>Acessar</CButton>
                                            <CButton color="danger" onClick={() => handleDelButton(item.id)}>Excluir</CButton>
                                        </CButtonGroup>
                                    </CCol>
                                ))}
                            </CRow>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol>
                    <h2>Arquivos </h2>

                    <CCard>
                        <CCardHeader>
                            <CButton
                                onClick={handleAddButton}
                                color="primary"

                            >
                                <CIcon name="cil-check" /> Novo Arquivo
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="File-row">
                                {listFiles.map((item) => (
                                    <CCol md="4" key={item.id}>
                                        <div className="file-item " onClick={() => handleFileClick(item)} style={{ cursor: "pointer" }} >
                                            <img src={item.icon} alt={item.title} className="img-fluid rounded-circle" style={{ width: '200px', height: '200px' }} />
                                            <h3>{item.title}</h3>
                                            <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                            <CButtonGroup>
                                                <CButton color="danger" onClick={() => handleDelButton(item.id)}>Excluir</CButton>
                                            </CButtonGroup>
                                        </div>
                                    </CCol>
                                ))}
                            </CRow>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default Folder;
