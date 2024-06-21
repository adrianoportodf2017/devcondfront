import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import GjsEditor from '@grapesjs/react';
import './style.css';
import {
  CButton
} from '@coreui/react';
import useApi from '../services/api';

export default function App() {
  const [editor, setEditor] = useState(null);
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
        editor.setComponents(content.html);
        editor.setStyle(content.css);
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
      const newData = { html, css };
      try {
        const response = await api.updatePageById(pageId, newData);
        console.log('Save response:', response);
        // Handle response as needed
      } catch (error) {
        console.error('Save error:', error);
      }
    }
  };

  return (
    <div>
      <CButton color="primary" onClick={handleSave}>Save</CButton>
      <GjsEditor
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={{
          height: '100vh',
          storageManager: false,
        }}
        plugins={[
          {
            id: 'gjs-blocks-basic',
            src: 'https://unpkg.com/grapesjs-blocks-basic',
          },
          {
            id: 'gjs-preset-webpage',
            src: 'https://unpkg.com/grapesjs-preset-webpage',
          },
          {
            id: 'grapesjs-plugin-forms',
            src: 'https://unpkg.com/grapesjs-plugin-forms',
          },
          {
            id: 'grapesjs-custom-code',
            src: 'https://unpkg.com/grapesjs-custom-code',
          },
          {
            id: 'grapesjs-tooltip',
            src: 'https://unpkg.com/grapesjs-tooltip',
          },
          {
            id: 'grapesjs-tui-image-editor',
            src: 'https://unpkg.com/grapesjs-tui-image-editor',
          },
          {
            id: 'grapesjs-blocks-flexbox',
            src: 'https://unpkg.com/grapesjs-blocks-flexbox',
          },
          {
            id: 'grapesjs-navbar',
            src: 'https://unpkg.com/grapesjs-navbar',
          },
          {
            id: 'grapesjs-component-countdown',
            src: 'https://unpkg.com/grapesjs-component-countdown',
          },
          {
            id: 'grapesjs-style-gradient',
            src: 'https://unpkg.com/grapesjs-style-gradient',
          },
          {
            id: 'grapesjs-tabs',
            src: 'https://unpkg.com/grapesjs-tabs',
          },     {
            id: 'grapesjs-blocks-bootstrap5',
            src: 'https://cdn.jsdelivr.net/npm/grapesjs-blocks-bootstrap5',
          },
        ]}
        onEditor={onEditor}
      />
    </div>
  );
}
