import React, { useState } from 'react';
import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CFormGroup, CLabel, CInput, CSwitch, CButton
} from '@coreui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useApi from '../services/api';

const AddFolderModal = ({ showModal, handleCloseModal, getFolder, parentId }) => {
    const api = useApi();
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('1');

    const handleAddFolder = async () => {
        if (modalTitleField) {
            setModalLoading(true);
            const data = {
                status: modalStatusField,
                title: modalTitleField,
                content: modalContentField,
                parent_id: parentId
            };
            if (modalThumbField) data.thumb = modalThumbField;

            try {
                const result = await api.addFolder(data);
                if (result.error === '' || result.error === undefined) {
                    setModalLoading(false);
                    handleCloseModal();
                    getFolder();
                } else {
                    setModalLoading(false);
                    alert(result.error);
                }
            } catch (error) {
                setModalLoading(false);
                alert('Erro ao criar a pasta. Verifique a conexão com a API.' + error);
            }
        } else {
            alert('Preencha os campos para continuar');
        }
    };

    const handleModalSwitchClick = () => {
        setModalStatusField(modalStatusField === '1' ? '0' : '1');
    };

    return (
        <CModal show={showModal} onClose={handleCloseModal}>
            <CModalHeader closeButton>Nova Pasta </CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel htmlFor="modal_status">Ativo</CLabel><br />
                    <CSwitch
                        color="success"
                        checked={modalStatusField === '1'}
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
                        onChange={(e) => setModalThumbField(e.target.files[0])}
                        accept="image/*"
                    />
                </CFormGroup>
                <CFormGroup className="mb-5">
                    <CLabel htmlFor="modal_Content">Descrição</CLabel>
                    <ReactQuill
                        style={{ height: '300px' }}
                        theme="snow"
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
    );
};

export default AddFolderModal;
