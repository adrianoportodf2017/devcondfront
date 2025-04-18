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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CTextarea,
  CInput,
  CInputFile,
  CSelect
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibAtom, cilArrowCircleLeft, cilFolder, cilPencil, cilPlus, cilSave, cilTrash, cilCloudDownload } from "@coreui/icons";
import { Eye, Trash2, Search, Download, Edit } from 'lucide-react';
import DocumentosTable from './../components/DocumentosTable';
import useApi from '../services/api';

export default () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalTitleField, setModalTitleField] = useState('');
  const [modalFileField, setModalFileField] = useState('');
  const [modalId, setModalId] = useState('');
  const [modalCategoryId, setModalCategoryId] = useState(''); // New state for category

  const fields = [
    { label: 'Título', key: 'title' },
    { label: 'Categoria', key: 'category_name' },
    { label: 'Data', key: 'created_at' },
    { label: 'Caminho', key: 'filename' },
    { label: 'Ações', key: 'actions', _style: { width: '1px' } }
  ];

  useEffect(() => {
    getList();
    getCategory();
  }, []);

  const getList = async () => {
    setLoading(true);
    const result = await api.getDocuments();
    setLoading(false);
    if (result.error === '') {
      setList(result.list);
    } else {
      alert(result.error);
    }
  }
  const getCategory = async () => {
    const result = await api.getDocumentsCategory();
    if (result.error === '') {
      setListCategory(result.list);
    } else {
      alert(result.error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleEditButton = (index) => {
    setModalId(list[index]['id']);
    setModalTitleField(list[index]['title']);
    setModalFileField(list[index]['fileurl']);
    setModalCategoryId(list[index]['category_id']); // Set category when editing
    setShowModal(true);
  }

  const handleRemoveButton = async (index) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const result = await api.removeDocument(list[index]['id']);
      if (result.error === '') {
        getList();
      } else {
        alert(result.error);
      }
    }
  }


  const handleDownloadButton = async (index) => {
    window.open(list[index]['filename']);
  }

  const handleNewButton = () => {
    setModalId('');
    setModalTitleField('');
    setModalFileField('');
    setModalCategoryId(''); // Reset category when creating new
    setShowModal(true);
  }

  const handleModalSave = async () => {
    if (modalTitleField && modalCategoryId) { // Added category validation
      setModalLoading(true);
      let result;

      let data = {
        title: modalTitleField,
        category_id: modalCategoryId // Include category_id in the data
      };

      if (modalId === '') {
        if (modalFileField) {
          data.file = modalFileField;
          result = await api.addDocument(data);
        } else {
          alert('Selecione o arquivo');
          setModalLoading(false);
          return;
        }
      } else {
        if (modalFileField) {
          data.file = modalFileField;
        }
        result = await api.updateDocument(modalId, data);
      }

      setModalLoading(false);
      if (result.error === '') {
        setShowModal(false);
        getList();
      } else {
        alert(result.error);
      }
    } else {
      alert('Preencha todos os campos!');
    }
  }

  

  return (
    <>
      <CRow>
        <CCol>
          <h2>Documentos</h2>
          <CCard>
            
            <CCardHeader>
              <CButton onClick={handleNewButton} style={{ display: 'flex', alignItems: 'center' }}>
                <CIcon icon={cilSave} className="small-icon me-2" />Novo Documento
              </CButton>
            </CCardHeader>
            <CCardBody>
            <DocumentosTable
  list={list}
  loading={loading}
  onEdit={handleEditButton}  
  onRemove={handleRemoveButton}
  onDownload={handleDownloadButton}
/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CModal show={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>{modalId === '' ? 'Novo' : 'Editar'} Documento</CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal-title">Título do Documento</CLabel>
            <CInput
              type="text"
              id="modal-title"
              placeholder="Digite um título do documento"
              value={modalTitleField}
              onChange={e => setModalTitleField(e.target.value)}
              disabled={modalLoading}
            />
            <CFormGroup>
            <CLabel htmlFor="modal-category">Categoria</CLabel>
            <CSelect
              id="modal-category"
              value={modalCategoryId}
              onChange={e => setModalCategoryId(e.target.value)}
              disabled={modalLoading}
            >
              <option value="">Selecione uma categoria</option>
              {listCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </CSelect>
          </CFormGroup>
            /** criar o select category id aqui pfv */
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="modal-file">Insira uma Imagem ou PDF</CLabel>
            <CInput
              type="file"
              id="modal-file"
              name="file"
              onChange={e => setModalFileField(e.target.files[0])}
            />
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={handleModalSave}
            disabled={modalLoading}
          >
            {modalLoading ? 'Carregando...' : 'Salvar'}
          </CButton>
          <CButton
            color="secondary"
            onClick={handleCloseModal}
            disabled={modalLoading}
          >Cancelar</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}