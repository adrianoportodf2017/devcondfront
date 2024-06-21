import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
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


import useApi from '../services/api';


const Folder = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [folder, setFolder] = useState({});
    const [listFolders, setListFolders] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showIframeModal, setShowIframeModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(false);

    // Inicialize os estados para coletar os dados para editar os dados da pasta
    const [modalLoading, setModalLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('1'); // Defina o valor padrão desejado
    const [content, setContent] = useState('');
    const [thumb, setThumb] = useState(null); // Use null para o input type="file"


    useEffect(() => {
        getFolder();
    }, [id]);

    const getFolder = async () => {
        setLoading(true);
        if (id == '0') {
            const result = await api.getFolders();
            console.log(result['0']);
            if (result['0']) {
                if (result.error === '' || result.error === undefined) {
                    setFolder(result['0']);
                    setTitle(result['0'].title);
                    setStatus(result['0'].status);
                    setContent(result['0'].content);
                    setThumb(result['0'].thumb);
                    setListFolders(result);


                } else {
                    alert(result.error);
                }
            }
        }
        else {
            const result = await api.getFolderById(id);
            if (result.error === '' || result.error === undefined) {
                setFolder(result);
                setTitle(result.title);
                setStatus(result.status);
                setContent(result.content);
                //  setThumb(result.thumb);
                setListFolders(result.children);
                setListFiles(result.midias);
            } else {
                setLoading(false);
                alert(result.error);
            }

        }
        setLoading(false);


    };


    /**
* 
* Função para abrir modal do documento
*/
    const openIframeModal = (url) => {
        setIframeUrl(url);
        setShowIframeModal(true);
    };

    const handleFileClick = (item) => {
        if (item.type === 'imagem' || item.type === 'pdf') {
            openIframeModal(item.url);
        } else {
            window.open(item.url, '_blank');
        }
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
    return (
        <>  {id == '0' ? (
            <> <CRow>
                <CCol>

                    <CCard>
                        <CCardHeader>
                        </CCardHeader>

                        <CCardBody>
                            <CRow className="File-row justify-content-left ">
                                {listFolders.map((item) => (
                                    <CCol md="3" key={item.id} className="justify-content-left align-itens-left  text-center">
                                        <Link to={`/ListFolders/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className="file-item ">
                                                <img
                                                    src={item.thumb ? item.thumb : item.icon}
                                                    width={200}
                                                    height={250}
                                                    alt={item.title}
                                                    className="img-fluid rounded-circle"
                                                    style={{ width: '200px', height: '200px' }} />
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
            </CRow></>
        ) : (
            <>
                <CCard>

                    <IframeModal iframeUrl={iframeUrl} onClose={() => setShowIframeModal(false)} className="modal-lg w-100" style={{ height: '500px' }} />
                    <CCardBody>
                        <CCardHeader>
                            <CButtonGroup>
                                {id == '0' ? (
                                    <></>
                                ) : (
                                    <CButton color="success" to={folder.parent_id ? `/ListFolders/${folder.parent_id}` : '/ListFolders/0'}>{folder.parent_id ? '< Voltar Pasta Anterior' : 'Voltar Para Listagem'}</CButton>
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
                            <CCol md="6">
                             
                            </CCol>
                            <CCol md="12" className="mb-5">
                                <CFormGroup >
                                    <div dangerouslySetInnerHTML={{ __html: folder.content }} />
                                </CFormGroup>
                            </CCol>
                        </CRow>


                        <div className="row ">
                            {listFolders.map((item) => (
                                <div className="col-lg-2 justify-content-left align-itens-left  text-center">
                                <Link to={`/ListFolders/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="file-item ">
                                            <img
                                                src={item.thumb ? item.thumb : item.icon}
                                                width={200}
                                                height={250}
                                                alt={item.title}
                                                className="img-fluid rounded-circle"
                                                style={{ width: '200px', height: '200px' }} />
                                            <h5 className="flex-fill m-0 p-0">{item.title}</h5>
                                            <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {listFiles.map((item) => (
                                <div className="col-lg-2 justify-content-left align-itens-left  text-center">
                                    <div className="file-item " onClick={() => handleFileClick(item)} style={{ cursor: "pointer" }} >
                                        <img
                                            src={item.thumb ? item.thumb : item.icon}
                                            width={200}
                                            height={250}
                                            alt={item.title}
                                            className="img-fluid rounded-circle"
                                            style={{ width: '200px', height: '200px' }} />
                                        <h5 className="flex-fill m-0 p-0">{item.title}</h5>
                                        <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CCardBody>
                </CCard>
            </>)}
        </>
    );
};

export default Folder;
