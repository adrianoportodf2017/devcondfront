import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import geditorConfig from "./api_utils/geditor_config";
import PageSection from "./components/PageSection";
import { getAssetsFromLocalStorage, getFromLocalStorage, getByPageById } from "./api_utils/storageUtils";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSwitch,
  CSelect

} from '@coreui/react';
import CIcon from "@coreui/icons-react";
import useApi from './services/api';

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const [pageData, setPageData] = useState(null);

  const { pageId } = useParams();

  const { pageStore } = [];
  const { pages } = [];

  useEffect(() => {
    async function getAllAssets() {
      try {
        const assets = getAssetsFromLocalStorage();
        setAssets(assets);
      } catch (error) {
        setAssets(error.message);
      }
    }

    getAllAssets();
  }, []);

  useEffect(() => {
    // Carregar os dados da página do localStorage
    const loadPageData = () => {
      const data = getByPageById(`${pageId}`);
      console.log(data);
      if (data) {
        setPageData(data);
      }
    };

    loadPageData();
  }, [pageId]);

  useEffect(() => {
    const editor = geditorConfig(assets, pageId, pageData);
    setEditor(editor);
  }, [pageId, assets, pageData]);

  return (
    <>
      <CRow>
        <CCol>
          <h2>Noticias </h2>

          <CCard>
            <CCardHeader>
              <CButton
                color="primary"

              >
                <CIcon name="cil-check" /> Editor de Páginas
              </CButton>
            </CCardHeader>

            <CCardBody>
              <div className="row">
                <div
                  id="navbar"
                  className="col-lg-3 sidenav  overflow-scroll "
                >
                  <nav className="navbar navbar-light">
                    <div className="container-fluid">
                    </div>
                  </nav>
                  <Sidebar />
                </div>
                <div
                  className="col-lg-9 "
                  id="main-content"
                >                  <TopNav />

                  <div id="editor"></div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>

  );
};

export default Editor;
 