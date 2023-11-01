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

    // modal para criar nova pasta dentro de outra pasta
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');


    // modal para criar nova arquivo dentro de uma pasta
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showModalFile, setShowModalFile] = useState(false);
    const [modalFileTitleField, setModalFileTitleField] = useState('');
    const [modalFileField, setModalFileField] = useState('');



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
            setTitle(result.title);
            setStatus(result.status);
            setContent(result.content);
            //  setThumb(result.thumb);
            setListFolders(result.children);
            setListFiles(result.midias);
        } else {
            alert(result.error);
        }
    };


    const handleEdit = () => {
        setIsEditing(true);
    };





    ///Função para criar nova pasta
    const handleAddFileButton = () => {
        setModalId('');
        setModalFileTitleField('');
        setModalFileField('');
        setShowModalFile(true);
    };
    ///Função para fechar modal de adicionar novo arquivo

    const handleCloseModalFile = () => {
        setShowModalFile(false)
    };

    ///função para enviar dados para api back end e salvar  arquuvi banco de dados

    const handleAddFile = async () => {
        if (modalFileField) {
          setModalLoading(true);
          const data = {
            title: modalFileTitleField,
            file: modalFileField,
            id: id
          };
      
          try {
            await api.addFiles(data, (percentCompleted) => {
              setUploadProgress(percentCompleted);
            });
      
            setModalLoading(false);
            setShowModalFile(false);
            getFolder();
          } catch (error) {
            setModalLoading(false);
            alert('Erro ao criar a pasta. Verifique a conexão com a API.' + error);
          }
        } else {
          setModalLoading(false);
          alert('Preencha os campos para continuar');
        }
      };

    ///Função para criar nova pasta
    const handleAddButton = () => {
        setModalId('');
        setModalTitleField('');
        setModalStatusField('1');
        setModalThumbField('');
        setModalContentField('');
        setShowModal(true);
    };
    ///Função para fechar modal de adicionar nova da pasta

    const handleCloseModal = () => {
        setShowModal(false)
    };
    ///função para enviar dados para api back end e salvar banco de dados

    const handleAddFolder = async () => {

        if (modalTitleField) {
            setModalLoading(true);
            let result;
            let data = {
                status: modalStatusField,
                title: modalTitleField,
                content: modalContentField,
                parent_id: id
            };

            if (modalThumbField) {
                data.thumb = modalThumbField;
            };

            // Chame a API para criar a nova pasta
            try {
                console.log(data);
                const result = await api.addFolder(data);

                if (result.error === '' || result.error === undefined) {
                    setModalLoading(false);
                    setShowModal(false);
                    getFolder();

                } else {
                    alert(result.error)
                }
            } catch (error) {
                setModalLoading(false);

                alert('Erro ao criar a pasta. Verifique a conexão com a API.' + error);
            }
        } else {
            alert('Preencha os campos para continuar')
        }

    };

    const handleDelButton = () => {
        // setIsEditing(true);
    };




    const handleSave = async () => {
        if (title) {
            // Construa o objeto de dados a ser enviado à API
            const data = {
                id: id,
                title,
                status,
                content,
                thumb
            };

            // Chame a API para criar a nova pasta
            try {
                console.log(data);
                const result = await api.updateFolder(data);

                if (result.error === '' || result.error === undefined) {
                    //console.log(result.list.id);
                    //  history.push(`/Folders/${result.list.id}`);
                    // Você pode adicionar redirecionamento ou outras ações aqui após o sucesso
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
        setLoading(true);
        const dataStatus = status === '1' ? '0' : '1'; // Troca o status entre 1 e 0
        setStatus(dataStatus);
        setLoading(false);
    }
    ///função para mudar status na hora de adicionar nova pasta
    const handleModalSwitchClick = () => {
        setModalStatusField(modalStatusField == '1' ? '0' : '1');
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
                    <CCardHeader>
                        <CButtonGroup>
                            <CButton color="success" to={folder.parent_id ? folder.parent_id : '/dashboard'}>{folder.parent_id ? '< Voltar Pasta Anterior' : 'Voltar Para Home'}</CButton>
                            {isEditing ? (
                                <CButton color="success" onClick={handleSave}>Salvar</CButton>
                            ) : (
                                <CButton color="primary" onClick={handleEdit}>Editar</CButton>
                            )}
                            <CButton color="danger" onClick={handleEdit}>Excluir Pasta</CButton>
                        </CButtonGroup>

                    </CCardHeader>

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
                                {isEditing ? (
                                    <div >
                                        <CLabel htmlFor="thumb">Imagem</CLabel>
                                        <img src={folder.thumb} width={300} className="m-3 rounded img-rounded" />
                                        <CInput
                                            type="file"
                                            id='modal_Thumb'
                                            name="Thumb"
                                            placeholder="Escolha uma Imagem"
                                            onChange={(e) => setThumb(e.target.files[0])}
                                            accept="image/*" // Defina o atributo accept para aceitar apenas imagens

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
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: folder.content }} />
                                )}

                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CCardFooter>
                        {isEditing ? (
                            <CButton color="success" onClick={handleSave}>Salvar</CButton>
                        ) : (
                            <></>
                        )}
                    </CCardFooter>

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
                            <CRow className="File-row justify-content-left ">
                                {listFolders.map((item) => (
                                    <CCol md="3" key={item.id} className="justify-content-left align-itens-left  text-center">
                                        <Link to={`/Folders/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

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

                                        <CButtonGroup className="mb-2">
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
                                onClick={handleAddFileButton}
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

            <CModal show={showModal} onClose={handleCloseModal}>
                <CModalHeader closeButton>Nova Pasta </CModalHeader>
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
                        <CLabel htmlFor="modal_Thumb">Imagem</CLabel>
                        <CInput
                            type="file"
                            id='modal_Thumb'
                            name="Thumb"
                            placeholder="Escolha uma Imagem"
                            onChange={(e) => setModalThumbField(e.target.files[0])}
                            accept="image/*" // Defina o atributo accept para aceitar apenas imagens

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
                    <CButton disabled={modalLoading} onClick={handleAddFolder} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
                    <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>



                </CModalFooter>
            </CModal>
            <CModal show={showModalFile} onClose={handleCloseModalFile}>
                <CModalHeader closeButton>Adicionar Arquivos</CModalHeader>
                <CModalBody>
                    <CFormGroup>
                        <CLabel htmlFor="modal_title">Titulo</CLabel>
                        <CInput
                            type="text"
                            id='modal_title'
                            name="title"
                            value={modalFileTitleField}
                            onChange={(e) => setModalFileTitleField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_file">Selecione os Arquivos</CLabel>
                        <CInput
                            type="file"
                            id='modal_Thumb'
                            name="file"
                            placeholder="Escolha um ou mais Arquivos"
                            onChange={(e) => setModalFileField([...e.target.files])}
                            multiple
                            accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                        />
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
                </CModalBody>
                <CModalFooter className="mt-5">
                    <CButton disabled={modalLoading} onClick={handleAddFile} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
                    <CButton disabled={modalLoading} onClick={handleCloseModalFile} color="secondary">Cancelar</CButton>
                </CModalFooter>
            </CModal>

        </>
    );
};

export default Folder;
