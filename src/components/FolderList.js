import React from 'react';
import { Link } from 'react-router-dom';
import { CCol, CButtonGroup, CButton } from '@coreui/react';

const FolderList = ({ listFolders, handleDelFolder }) => {
    return listFolders.map((item) => (
        <CCol md="2" key={item.id} className="text-center">
            <Link to={`/Folders/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="file-item">
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
                <CButton color="danger" onClick={() => handleDelFolder(item.id)}>Excluir</CButton>
            </CButtonGroup>
        </CCol>
    ));
};

export default FolderList;
