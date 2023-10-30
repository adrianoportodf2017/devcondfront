import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const api = useApi();
    const { id } = useParams();


    // Inicialize os estados para coletar os dados
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('1'); // Defina o valor padrão desejado
    const [content, setContent] = useState('');
    const [thumb, setThumb] = useState(null); // Use null para o input type="file"

    const handleSave = async () => {
        if (title) {
            // Construa o objeto de dados a ser enviado à API
            const data = {
                id : id,
                title,
                status,
                content,
                thumb
            };

            // Chame a API para criar a nova pasta
            try {
                console.log(data);
                const result = await api.addFolder(data);

                if (result.error === '' || result.error === undefined) {
                    //console.log(result.list.id);
                    history.push(`/Folders/${result.list.id}`);
                    // Você pode adicionar redirecionamento ou outras ações aqui após o sucesso
                } else {
                    alert(result.error);
                }
            } catch (error) {
                alert('Erro ao criar a pasta. Verifique a conexão com a API.');
            }
        } else {
            alert('Preencha os campos para continuar.');
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
            {/* Seu código existente aqui */}
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol md="1">
                            <CFormGroup>
                                <CLabel htmlFor="status">Status</CLabel><br />
                                <CSwitch
                                    id="status"
                                    color="success"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </CFormGroup>
                        </CCol>
                        <CCol md="12">
                            <CFormGroup>
                                <CLabel htmlFor="title">Titulo</CLabel>
                                <CInput
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </CFormGroup>
                        </CCol>
                        <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="thumb">Imagem</CLabel>
                <div >
                  <CInput
                    type="file"
                    id='modal_Thumb'
                    name="Thumb"
                    placeholder="Escolha uma Imagem"
                    onChange={(e) => setThumb(e.target.files[0])}
                  />
                </div>
              </CFormGroup>
            </CCol>
                        <CCol md="12" className="mb-5">
                            
                            <CFormGroup>
                                <CLabel htmlFor="modal_Content">Descrição</CLabel>
                                <ReactQuill
                                    style={{ height: '300px' }}
                                    theme="snow"
                                    value={content}
                                    onChange={(value) => setContent(value)}
                                />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-5">
                        <CCol md="6">
                            <CButton color="success" onClick={handleSave}>Salvar</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    );
};


export default Folder;
