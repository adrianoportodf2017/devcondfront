import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CSwitch,
  CSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane
} from '@coreui/react';
import useApi from '../../services/api';
import { Sun, Moon, Palette, Layout, Image } from 'lucide-react';
import './appearance.scss';
import LoadingSpinner from './../../components/LoadingSpinner';
import ColorInputs from './../../components/ColorInputs';


const defaultThemeColors = {
  white: '#fff',
  gray100: '#ebedef',
  gray200: '#d8dbe0',
  gray300: '#c4c9d0',
  gray400: '#b1b7c1',
  gray500: '#9da5b1',
  gray600: '#8a93a2',
  gray700: '#768192',
  gray800: '#636f83',
  gray900: '#4f5d73',
  black: '#000015',

  // Cores do sistema
  primary: '#321fdb',
  secondary: '#9da5b1',
  success: '#2eb85c',
  info: '#39f',
  warning: '#f9b115',
  danger: '#e55353',
  light: '#ebedef',
  dark: '#636f83',

  // Cores específicas
  bodyBg: '#fff',
  bodyColor: '#3c4b64',
  sidebarBg: '#3c4b64',
  sidebarColor: '#fff',
  headerBg: '#fff',
  headerColor: '#3c4b64',
  footerBg: '#fff',
  footerColor: '#3c4b64',
  borderColor: '#d8dbe0'
};

const AppearanceSettings = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Configurações gerais
    theme: 'light',
    sidebarStyle: 'light',
    menuCompact: false,
    headerFixed: true,
    customLogo: null,

    // Cores do tema
    ...defaultThemeColors,

    // Cores específicas da aplicação
    visitedBoothColor: '#ffd700',
    observedBoothColor: '#32cd32'
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const result = await api.getAppearanceSettings();
    if (!result.error) {
      setSettings({ ...settings, ...result.settings });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.updateAppearanceSettings(settings);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h2>Aparência do Sistema</h2>
        
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit}>
            <CFormGroup>
                    <CLabel>Logo do Sistema</CLabel>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setSettings(prev => ({
                                ...prev,
                                customLogo: reader.result
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="d-none"
                        id="logo-upload"
                      />
                      <CButton
                        color="secondary"
                        onClick={() => document.getElementById('logo-upload').click()}
                      >
                        Escolher Logo
                      </CButton>
                      {settings.customLogo && (
                        <div className="mt-2">
                          <img
                            src={settings.customLogo}
                            alt="Logo Preview"
                            style={{ maxHeight: '50px' }}
                          />
                        </div>
                      )}
                    </div>
                  </CFormGroup>
                   <CFormGroup>
                    <CLabel>Tema</CLabel>
                    <div className="d-flex align-items-center mb-3">
                      <CButton
                        color={settings.theme === 'light' ? 'primary' : 'secondary'}
                        className="mr-2"
                        onClick={() => handleInputChange({ target: { name: 'theme', value: 'light' } })}
                      >
                        <Sun className="mr-2" />
                        Claro
                      </CButton>
                      <CButton
                        color={settings.theme === 'dark' ? 'primary' : 'secondary'}
                        onClick={() => handleInputChange({ target: { name: 'theme', value: 'dark' } })}
                      >
                        <Moon className="mr-2" />
                        Escuro
                      </CButton>
                    </div>

                    <CFormGroup>
                      <CLabel>Estilo do Menu Lateral</CLabel>
                      <CSelect
                        name="sidebarStyle"
                        value={settings.sidebarStyle}
                        onChange={handleInputChange}
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                      </CSelect>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel className="d-block">Opções de Layout</CLabel>
                      <div className="mt-2">
                        <CSwitch
                          className="mr-1"
                          color="primary"
                          name="menuCompact"
                          checked={settings.menuCompact}
                          onChange={handleInputChange}
                        />
                        <span className="ml-2">Menu Compacto</span>
                      </div>
                      <div className="mt-2">
                        <CSwitch
                          className="mr-1"
                          color="primary"
                          name="headerFixed"
                          checked={settings.headerFixed}
                          onChange={handleInputChange}
                        />
                        <span className="ml-2">Cabeçalho Fixo</span>
                      </div>
                    </CFormGroup>
                  </CFormGroup>
 
                   <ColorInputs
                      settings={settings}
                      handleInputChange={handleInputChange}
                    />                 

                 
 
              
  
              <div className="d-flex justify-content-end mt-4">
                <CButton
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar Configurações'}
                </CButton>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AppearanceSettings;