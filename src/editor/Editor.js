import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import GjsEditor from '@grapesjs/react';
import grapesjs from 'grapesjs';
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
import grapesjsTailwind from 'grapesjs-tailwind';
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
  const [mainMenu, setMainMenu] = useState('');
  const [restrictedArea, setRestrictedArea] = useState('');
  const [publicArea, setPublicArea] = useState('');
  const [result, setResult] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const { pageId } = useParams();
  const history = useHistory();
  const api = useApi();

  const onEditor = async (editor) => {
    console.log('Editor loaded', { editor });
    
    setEditor(editor);

    try {
      const result = await api.getPageById(pageId);
      if (result.error === '' || result.error === undefined) {
        const content = result.list && result.list.content ? JSON.parse(result.list.content) : {};
        setModalStatusField(result.list.status);
        setModalTitleField(result.list.title);
        setModalThumbField(result.list.thumb);
        setModalTagsField(result.list && result.list.tags ? result.list.tags : []);
        setMainMenu(result.list.main_menu);
        setRestrictedArea(result.list.restricted_area);
        setPublicArea(result.list.public_area);
        editor.setComponents(content.html);
        editor.setStyle(content.css);
        setHtmlCode(content.html);  // Atualizar estado do HTML
        setCssCode(content.css);    // Atualizar estado do CSS
        setResult(result.list); // Atualize o estado com os dados da página

        // Remove a estrutura do body automaticamente inserida
        const wrapper = editor.getWrapper();
        const body = wrapper.find('body')[0];
        if (body) {
          wrapper.remove(body);
        }

        console.log(content);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Error loading page data:', error);
    }
  };


  const handleSaveCode = () => {
    if (editor) {
      editor.setComponents(htmlCode);
      editor.setStyle(cssCode);
      setShowCodeModal(false);
      alert('Código salvo com sucesso!');
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
        mainMenu: mainMenu,
        restrictedArea: restrictedArea,
        publicArea: publicArea,
      };
      try {
        const response = await api.updatePageById(pageId, newData);
        console.log('Save response:', response);
        alert('Salvo Com Sucesso!');
        setShowModal(false);
        // Handle response as needed
      } catch (error) {
        alert(error);
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
    setMainMenu(mainMenu == '1' ? '0' : '1');
  }
  const handleModalSwitchClickRestrict = () => {
    setRestrictedArea(restrictedArea == '1' ? '0' : '1');
  }
  const handleModalSwitchClickPublic = () => {
    setPublicArea(publicArea == '1' ? '0' : '1');
  }
  const handleModalSwitchThumbClick = () => {
    setModalStatusThumbField(modalStatusThumbField == '1' ? '0' : '1');
  }

  const gjsOptions = {
    height: '100vh',
    protectedCss: '', // Desativa a inserção automática de estilos padrão, incluindo body
    wrapperIsBody: false, // Evita que o wrapper seja tratado como <body>

  };

  return (
    <div>
      {result && <PageDetails data={result} />} {/* Renderizar o componente PageDetails apenas se result não for null */}
      <CButton color="secondary" to="/paginas">
        <CIcon icon={cilArrowCircleLeft} className="small-icon" />&nbsp;Voltar
      </CButton>
      <CButton color="secondary" onClick={handleSave}>
        <CIcon icon="cil-save" className="small-icon" /> Salvar Página
      </CButton>
      <CButton color="secondary" onClick={handleEditButton}>
        <CIcon icon="cil-settings" className="small-icon" /> Abrir Configurações da Página
      </CButton>
      <CButton color="secondary" onClick={() => setShowCodeModal(true)}>
        <CIcon icon="cil-code" className="small-icon" /> Editar Código
      </CButton>



      <GjsEditor

        grapesjs={grapesjs}
        options={gjsOptions}
        plugins={[
          grapesjsBasicBlocks,
          //grapesjsPresetWebpage,
          grapesjsPluginCkeditor,
          grapesjsTuiImageEditor,
          grapesjsPluginForms,
          grapesjsCustomCode,
          grapesjsTooltip,
          grapesjsBlocksFlexbox,
          grapesjsNavbar,
          grapesjsComponentCountdown,
          grapesjsStyleGradient,
          grapesjsTailwind,
          Parser,
          ReactComponents,
          BaseReactComponent,
          grapesjsTabs
        ]}  

         
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
              checked={mainMenu == '0' ? '' : 'true'}
              onChange={handleModalSwitchClickMenu}
            />

          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="restricted_area">Aparecer na Área Restrita</CLabel><br />
            <CSwitch
              color="success"
              id="restricted_area"
              name="restricted_area"
              checked={restrictedArea == '0' ? '' : 'true'}
              onChange={handleModalSwitchClickRestrict}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="public_area">Aparecer na Área Pública</CLabel><br />
            <CSwitch
              color="success"
              id="public_area"
              name="public_area"
              checked={publicArea == '0' ? '' : 'true'}
              onChange={handleModalSwitchClickPublic}
            />
          </CFormGroup>


        </CModalBody>
        <CModalFooter className="mt-5">
          <CButton disabled={modalLoading} onClick={handleSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
          <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>
        </CModalFooter>
      </CModal>


      <CModal show={showCodeModal} onClose={() => setShowCodeModal(false)} size="xl">
        <CModalHeader>Editar Código HTML/CSS</CModalHeader>

        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="html_code">HTML</CLabel>
            <CInput
              type="textarea"
              id="html_code"
              rows="10"
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="text-dark"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="css_code">CSS</CLabel>
            <CInput
              type="textarea"
              id="css_code"
              rows="10"
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
            />
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSaveCode}>
            Salvar Código
          </CButton>
          <CButton color="secondary" onClick={() => setShowCodeModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>

    </div>
  );
}