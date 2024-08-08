import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CRow, CModal, CModalBody, CModalFooter } from '@coreui/react';
import useApi from '../services/api';
import './ListFolder.css'; // Certifique-se de criar e importar o arquivo CSS
import CIcon from "@coreui/icons-react";
import { cibAtom, cilArrowCircleLeft, cilFolder, cilPencil, cilPlus, cilSave, cilTrash } from "@coreui/icons";
const getFileIconClass = (fileType) => {
    switch (fileType) {
        case 'pdf':
            return 'fas fa-file-pdf';
        case 'doc':
        case 'docx':
            return 'fas fa-file-word';
        case 'xls':
        case 'xlsx':
            return 'fas fa-file-excel';
        case 'ppt':
        case 'pptx':
            return 'fas fa-file-powerpoint';
        case 'image':
            return 'fas fa-file-image';
        default:
            return 'fas fa-file';
    }
};

const Folder = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [folder, setFolder] = useState({});
    const [listFolders, setListFolders] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [showIframeModal, setShowIframeModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        getFolder();
    }, [id]);

    const getFolder = async () => {
        setLoading(true);
        if (id === '0') {
            const result = await api.getFolders();
            if (result['0'] && (result.error === '' || result.error === undefined)) {
                setFolder(result['0']);
                setListFolders(result);
            } else {
                alert(result.error);
            }
        } else {
            const result = await api.getFolderById(id);
            if (result.error === '' || result.error === undefined) {
                setFolder(result);
                setListFolders(result.children);
                setListFiles(result.midias);
            } else {
                alert(result.error);
            }
        }
        setLoading(false);
    };

    const openIframeModal = (url) => {
        setIframeUrl(url);
        setShowIframeModal(true);
    };

    const handleFileClick = (item) => {
        if (item.type === 'image' || item.type === 'pdf') {
            openIframeModal(item.url);
        } else {
            window.open(item.url, '_blank');
        }
    };

    const IframeModal = ({ iframeUrl, onClose }) => (
        <CModal show={showIframeModal} onClose={onClose} size="xl">
            <CModalBody>
                <div style={{ width: '100%', height: '800px' }}>
                    <iframe src={iframeUrl} width="100%" height="100%" frameBorder="0"></iframe>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={onClose} color="secondary">Fechar</CButton>
                <CButton color="primary" onClick={() => window.open(iframeUrl, "_blank")}>Visualizar em Nova Guia</CButton>
            </CModalFooter>
        </CModal>
    );

    return (
        <>
            {id === '0' ? (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader></CCardHeader>
                            <CCardBody>
                                <CRow className="File-row justify-content-left">
                                    {listFolders.map((item) => (
                                        <CCol md="3" key={item.id} className="justify-content-left align-items-left text-center">
                                            <Link to={`/ListFolders/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="file-item">
                                                    <i className="fas fa-folder fa-4x" style={{ width: '100%', height: 'auto' }}></i>
                                                    <h5 className="flex-fill m-0 p-0">{item.title}</h5>
                                                    <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                                </div>
                                            </Link>
                                        </CCol>
                                    ))}
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            ) : (
                <CCard>
                    <IframeModal iframeUrl={iframeUrl} onClose={() => setShowIframeModal(false)} className="modal-lg w-100" style={{ height: '500px' }} />
                    <CCardBody>
                        <CCardHeader>
                            <CButtonGroup>
                                {id !== '0' && (
                                    <CButton  to={folder.parent_id ? `/ListFolders/${folder.parent_id}` : '/ListFolders/0'}>
                                       <CIcon icon={cilArrowCircleLeft}  className="small-icon"/> {folder.parent_id ? ' Voltar Pasta Anterior' : 'Voltar Para Listagem'}
                                    </CButton>
                                )}
                            </CButtonGroup>
                        </CCardHeader>
                        <CRow>
                            <CCol md="12">
                                <CFormGroup>
                                    <h3>{folder.title}</h3>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow className="mb-5">
                            <CCol md="6"></CCol>
                            <CCol md="12" className="mb-5">
                                <CFormGroup>
                                    <div dangerouslySetInnerHTML={{ __html: folder.content }} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <div className="row">
                            {listFolders.map((item) => (
                                <div className="col-lg-2 justify-content-left align-items-left text-center" key={item.id}>
                                    <Link to={`/ListFolders/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="file-item">
                                            <i className="fas fa-folder fa-4x" style={{ width: '100%', height: 'auto' }}></i>
                                            <h5 className="flex-fill m-0 p-0">{item.title}</h5>
                                            <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {listFiles.map((item) => (
                                <div className="col-lg-2 justify-content-left align-items-left text-center" key={item.id}>
                                    <div className="file-item" onClick={() => handleFileClick(item)} style={{ cursor: "pointer" }}>
                                        <i className={`${getFileIconClass(item.type)} fa-4x`} style={{ width: '100%', height: 'auto' }}></i>
                                        <h5 className="flex-fill m-0 p-0">{item.title}</h5>
                                        <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CCardBody>
                </CCard>
            )}
        </>
    );
};

export default Folder;
