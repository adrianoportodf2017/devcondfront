import React, { useState } from 'react';
import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CFormGroup, CLabel, CInput, CButton
} from '@coreui/react';
import useApi from '../services/api';

const AddFileModal = ({ showModalFile, handleCloseModalFile, getFolder, parentId }) => {
    const api = useApi();
    const [modalLoading, setModalLoading] = useState(false);
    const [modalFileTitleField, setModalFileTitleField] = useState('');
    const [modalFileField, setModalFileField] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleAddFile = async () => {
        if (modalFileField) {
            setModalLoading(true);
            const data = {
                title: modalFileTitleField,
                file: modalFileField,
                id: parentId
            };

            try {
                await api.addFiles(data, (percentCompleted) => {
                    setUploadProgress(percentCompleted);
                });
                setModalLoading(false);
                handleCloseModalFile();
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

    return (
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
    );
};

export default AddFileModal;