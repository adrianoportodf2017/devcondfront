import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CRow,
    CSwitch,
} from '@coreui/react';

import useApi from '../services/api';

const Folder = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [folder, setFolder] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [modalStatusField, setModalStatusField] = useState('');

    useEffect(() => {
        getFolder();
    }, [id]);

    const getFolder = async () => {
        setLoading(true);
        const result = await api.getFolderById(id);
        setLoading(false);

        if (result.error === '' || result.error === undefined) {
            setFolder(result);
        } else {
            alert(result.error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
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

    const modules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'], // Formatação de texto
          [{ list: 'ordered' }, { list: 'bullet' }], // Listas ordenadas e não ordenadas
          ['link', 'image'], // Inserção de links e imagens
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
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
                <CCardBody>
                    <CRow>
                        <CCol md="1">
                            <CFormGroup>
                                <CLabel htmlFor="status">Status</CLabel><br/>
                                {isEditing ? (
                                    <CSwitch
                                        id="status"
                                        color="success"
                                        checked={folder.status === '1'} // Use um valor booleano
                                        onChange={handleSwitchClick}
                                    />
                                ) : (
                                    <div>{folder.status === '1' ? 'Active' : 'Inactive'}</div>
                                )}
                            </CFormGroup>
                        </CCol>
                        <CCol md="12">
                            <CFormGroup>
                                <CLabel htmlFor="title">Title</CLabel>
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
                                <CLabel htmlFor="thumb">Thumb</CLabel>
                                {isEditing ? (
                                    <CInput
                                        type="text"
                                        id="thumb"
                                        value={folder.thumb}
                                        onChange={(e) => setFolder({ ...folder, thumb: e.target.value })}
                                    />
                                ) : (
                                    <div>{folder.thumb}</div>
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
        </>
    );
};

export default Folder;
