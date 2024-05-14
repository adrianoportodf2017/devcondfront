import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import geditorConfig from "./api_utils/geditor_config";
import PageSection from "./components/PageSection";
import { getAssetsFromLocalStorage, getFromLocalStorage, getByPageById } from "./api_utils/storageUtils";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const [pageData, setPageData] = useState(null);

  const { pageId } = useParams();

  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;

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
    <div className="App">
      <div
        id="navbar"
        className="sidenav d-flex flex-column overflow-scroll position-fixed"
      >
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h3 logo">Code Dexterous</span>
          </div>
        </nav>
        <Sidebar />
      </div>
      <div
        className="main-content position-relative w-85 start-15"
        id="main-content"
      >
        <TopNav />
        <div id="editor"></div>
      </div>
    </div>
  );
};

export default Editor;
