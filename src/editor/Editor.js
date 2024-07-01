import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import GjsEditor from '@grapesjs/react';
import './style.css';
import useApi from '../services/api';
import PageDetails from '../components/PageDetails'; // Importar o componente com a capitalização correta
import grapesjsBasicBlocks from 'grapesjs-blocks-basic';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import grapesjsPluginCkeditor from 'grapesjs-plugin-ckeditor';
import grapesjsPluginForms from 'grapesjs-plugin-forms';
import grapesjsCustomCode from 'grapesjs-custom-code';
import grapesjsTooltip from 'grapesjs-tooltip';
import grapesjsTuiImageEditor from 'grapesjs-tui-image-editor';
import grapesjsBlocksFlexbox from 'grapesjs-blocks-flexbox';
import grapesjsNavbar from 'grapesjs-navbar';
import grapesjsComponentCountdown from 'grapesjs-component-countdown';
import grapesjsStyleGradient from 'grapesjs-style-gradient';
import grapesjsTabs from 'grapesjs-tabs';
import CIcon from '@coreui/icons-react'; // Importar o componente CIcon
import BaseReactComponent from "./components/grapesjs-core/base-react-component";
import ReactComponents from "./components/grapesjs-core/react-components";
import Parser from "grapesjs-parser-postcss";


import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CLink,
  CSwitch,
} from '@coreui/react';
import { cibAtom, cilArrowCircleLeft } from "@coreui/icons";

export default function App() {
  const [editor, setEditor] = useState(null);
  const [modalLoading, setModalLoading] = useState('');
  const [showModal, setShowModal] = useState('');
  const [modalStatusField, setModalStatusField] = useState('');
  const [modalTitleField, setModalTitleField] = useState('');
  const [modalTagsField, setModalTagsField] = useState(''); // Novo estado para as tags
  const [loading, setLoading] = useState('');
  const [getList, setGetlist] = useState('');
  const [modalStatusThumbField, setModalStatusThumbField] = useState('');
  const [modalThumbField, setModalThumbField] = useState('');
  const [mainMenu, setMainMenu] = useState(false);
  const [restrictedArea, setRestrictedArea] = useState(false);
  const [publicArea, setPublicArea] = useState(false);
  const [result, setResult] = useState(false);

  const { pageId } = useParams();
  const history = useHistory();
  const api = useApi();

  const onEditor = async (editor) => {
    console.log('Editor loaded', { editor });
    setEditor(editor);

    // Open the blocks panel when the editor loads
    editor.Panels.getButton('views', 'open-blocks').set('active', true);

    try {
      const result = await api.getPageById(pageId);
      if (result.error === '' || result.error === undefined) {
        const content = JSON.parse(result.list.content);
        setModalStatusField(result.list.status);
        setModalTitleField(result.list.title);
        setModalThumbField(result.list.thumb);
        setModalTagsField(result.list.tags); // Configurar as tags
        editor.setComponents(content.html);
        editor.setStyle(content.css);
        setResult(result.list); // Atualize o estado com os dados da página

        console.log(content);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error loading page data:', error);
    }
  };

  const handleSave = async () => {
    if (editor) {
      const html = editor.getHtml();
      const css = editor.getCss();
      const newData = {
        html,
        css,
        status: modalStatusField,
        title: modalTitleField,
        thumb: modalThumbField,
        tags: modalTagsField, // Adicione as tags aqui
        mainMenu: mainMenu ? '1' : '0',
        restrictedArea: restrictedArea ? '1' : '0',
        publicArea: publicArea ? '1' : '0',
      };
      try {
        const response = await api.updatePageById(pageId, newData);
        console.log('Save response:', response);
        alert('Salvo Com Sucesso!');
        setShowModal(false);
        // Handle response as needed
      } catch (error) {
        console.error('Save error:', error);
      }
    }
  };

  const handleEditButton = (id) => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false)
  };

  const handleModalSwitchClick = () => {
    setModalStatusField(modalStatusField == '1' ? '0' : '1');
  }
  const handleModalSwitchClickMenu = () => {
    setMainMenu(!mainMenu);
  }
  const handleModalSwitchClickRestrict = () => {
    setRestrictedArea(!restrictedArea);
  }
  const handleModalSwitchClickPublic = () => {
    setPublicArea(!publicArea);
  }
  const handleModalSwitchThumbClick = () => {
    setModalStatusThumbField(modalStatusThumbField == '1' ? '0' : '1');
  }

  const gjsOptions = {
    height: '100vh',
  };

  return (
    <div>
      {result && <PageDetails data={result} />} {/* Renderizar o componente PageDetails apenas se result não for null */}
      <CButton color="secondary" to="/paginas">
              <CIcon icon={cilArrowCircleLeft}   className="small-icon"/>&nbsp;Voltar
            </CButton>
      <CButton color="secondary" onClick={handleSave}>
        <CIcon icon="cil-save" className="small-icon" /> Salvar Página
      </CButton>
      <CButton color="secondary" onClick={handleEditButton}>
        <CIcon icon="cil-settings" className="small-icon" /> Abrir Configurações da Página
      </CButton>
     


      <GjsEditor
        grapesjs={"https://unpkg.com/grapesjs"}
        grapesjsCss="style.css"

        options={gjsOptions}
        plugins={[
          grapesjsBasicBlocks,
          grapesjsPresetWebpage,
          grapesjsPluginCkeditor,
          grapesjsTuiImageEditor,
          grapesjsPluginForms,
          grapesjsCustomCode,
          grapesjsTooltip,
          grapesjsBlocksFlexbox,
          grapesjsNavbar,
          grapesjsComponentCountdown,
          grapesjsStyleGradient,
          Parser,
          ReactComponents,          
          BaseReactComponent,
          grapesjsTabs
        ]}
        canvasCss= {".gjs-plh-image {width:auto;height:auto;}"}


        onEditor={onEditor}
      />

      <CModal show={showModal} onClose={handleCloseModal} size="lg">
        <CModalHeader>Editar Página </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal_status">Ativo</CLabel><br />
            <CSwitch
              color="success"
              checked={modalStatusField == '0' ? '' : 'true'}
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
            <CLabel htmlFor="modal_Thumb">Capa</CLabel>
            <CInput
              type="file"
              id='modal_Thumb'
              name="Thumb"
              placeholder="Escolha uma Imagem"
              onChange={(e) => setModalThumbField(e.target.files[0])}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="tags">Nuvem de Tags</CLabel>
            <CInput
              type="text"
              id="tags"
              name="tags"
              value={modalTagsField}
              onChange={(e) => setModalTagsField(e.target.value)}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="main_menu">Aparecer no Menu Principal</CLabel><br />
            <CSwitch
              color="success"
              id="main_menu"
              name="main_menu"
              checked={mainMenu}
              onChange={handleModalSwitchClickMenu}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="restricted_area">Aparecer na Área Restrita</CLabel><br />
            <CSwitch
              color="success"
              id="restricted_area"
              name="restricted_area"
              checked={restrictedArea}
              onChange={handleModalSwitchClickRestrict}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="public_area">Aparecer na Área Pública</CLabel><br />
            <CSwitch
              color="success"
              id="public_area"
              name="public_area"
              checked={publicArea}
              onChange={handleModalSwitchClickPublic}
            />
          </CFormGroup>
        </CModalBody>
        <CModalFooter className="mt-5">
          <CButton disabled={modalLoading} onClick={handleSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
          <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
