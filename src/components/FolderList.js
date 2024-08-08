import React from 'react';
import { Link } from 'react-router-dom';
import { CCol, CButton } from '@coreui/react';
import './FolderList.css'; // Certifique-se de criar e importar o arquivo CSS

const getFolderIconClass = (folderType) => {
    switch (folderType) {
        case 'type1':
            return 'fas fa-folder-open'; // Substitua por classes de ícone conforme necessário
        case 'type2':
            return 'fas fa-folder'; // Substitua por classes de ícone conforme necessário
        default:
            return 'fas fa-folder';
    }
};

const FolderList = ({ listFolders, handleDelFolder }) => {
    return listFolders.map((item) => (
        <div md="3" key={item.id} className="text-center col-md-3">
            <div className="file-item">
                <Link to={`/Folders/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <i className={`${getFolderIconClass(item.type)} fa-4x`} style={{ width: '100%', height: 'auto' }}></i>
                    <h5 className="flex-fill m-0 p-0">{item.title}</h5>
                    <p>Última modificação: {new Date(item.updated_at).toLocaleDateString('pt-BR')}</p>
                </Link>               
            </div>
        </div>
    ));
};

export default FolderList;
