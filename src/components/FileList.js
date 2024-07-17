import React from 'react';
import { CCol, CButtonGroup, CButton } from '@coreui/react';

const FileList = ({ listFiles, handleFileClick, handleDelFile }) => {
    return listFiles.map((item) => (
        <CCol md="2" key={item.id}>
            <div className="file-item" onClick={() => handleFileClick(item)} style={{ cursor: "pointer" }}>
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
            <CButtonGroup>
                <CButton color="info">Editar</CButton>
                <CButton color="danger" onClick={() => handleDelFile(item.id)}>Excluir</CButton>
            </CButtonGroup>
        </CCol>
    ));
};

export default FileList;
