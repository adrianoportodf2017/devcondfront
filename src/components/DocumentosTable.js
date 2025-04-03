import React, { useState, useEffect } from 'react';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CAlert
} from '@coreui/react';
import { Eye, Trash2, Search, Download, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const fields = [
  { 
    label: 'Título', 
    key: 'title',
    _style: { width: '30%' } 
  },
  { 
    label: 'Categoria', 
    key: 'category_name',
    _style: { width: '20%' } 
  },
  { 
    label: 'Data', 
    key: 'created_at',
    _style: { width: '20%' } 
  },
  { 
    label: 'Caminho', 
    key: 'filename',
    _style: { width: '20%' } 
  },
  { 
    label: 'Ações', 
    key: 'actions', 
    _style: { width: '10%' }, 
    sorter: false, 
    filter: false 
  }
];

const DocumentosTable = ({ list, loading, onEdit, onRemove, onDownload }) => {
    const [filteredList, setFilteredList] = useState(list);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);
   
    useEffect(() => {
      const filtered = list.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return (
          item.title?.toLowerCase().includes(searchLower) ||
          item.category_name?.toLowerCase().includes(searchLower) ||
          item.created_at?.toLowerCase().includes(searchLower) ||
          item.filename?.toLowerCase().includes(searchLower)
        );
      }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setFilteredList(filtered);
      setShowNoResults(filtered.length === 0 && searchTerm !== '');
    }, [list, searchTerm]);
   
    const groupedDocuments = filteredList.reduce((acc, item) => {
      const category = item.category_name || 'Sem Categoria';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
   
    return (
      <>
        <CInputGroup className="mb-3">
          <CInputGroupPrepend>
            <CInputGroupText>
              <Search size={16} />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput
            placeholder="Buscar por título, categoria, data ou caminho..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </CInputGroup>
   
        {showNoResults && (
          <CAlert color="warning" className="d-flex align-items-center">
            <Search size={20} className="me-2" />
            Nenhum resultado encontrado para "{searchTerm}"
          </CAlert>
        )}
   
        {Object.entries(groupedDocuments).map(([category, documents]) => (
          <div key={category} className="mb-4">
            <h3 className="mb-3">{category}</h3>
            <CDataTable
              items={documents}
              fields={fields}
              loading={loading}
              hover
              striped
              pagination
              itemsPerPage={5}
              scopedSlots={{
                actions: (item, index) => (
                  <td>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <CButton color="success" size="sm" onClick={() => onDownload(index)}>
                        <Download size={16} />
                        <span className="d-none d-sm-inline">Baixar</span>
                      </CButton>
                      <CButton color="primary" size="sm" onClick={() => onEdit(index)}>
                        <Edit size={16} />
                        <span className="d-none d-sm-inline">Editar</span>
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => onRemove(index)}>
                        <Trash2 size={16} />
                        <span className="d-none d-sm-inline">Excluir</span>
                      </CButton>
                    </div>
                  </td>
                )
              }}
            />
          </div>
        ))}
      </>
    );
   };

export default DocumentosTable;