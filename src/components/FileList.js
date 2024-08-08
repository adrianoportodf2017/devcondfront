import React from 'react';
import { CCol, CButton } from '@coreui/react';
import './FileList.css'; // Certifique-se de criar e importar o arquivo CSS

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

const FileList = ({ listFiles, handleFileClick, handleDelFile }) => {
    return listFiles.map((item) => (
        <CCol md="3" key={item.id}>
            <div className="file-item" >
                <div onClick={() => handleFileClick(item)}>
                <i className={`${getFileIconClass(item.type)} fa-4x`} style={{ width: '100%', height: 'auto' }}></i>
                <h5 className="flex-fill m-0 p-0">{item.title}</h5>
                </div>
                <CButton color="" className="delete-button" onClick={() => handleDelFile(item.id)}>
                    <i className="fas fa-trash fa-2x text-danger"></i>
                </CButton>
                <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
            </div>
        </CCol>
    ));
};

export default FileList;
