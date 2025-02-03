import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CAlert,
  CImg
} from '@coreui/react';
import { Editor } from '@tinymce/tinymce-react';
import useApi from '../../services/api';
import LoadingSpinner from './../../components/LoadingSpinner';

const CompanySettings = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState({
    company_name: '',
    company_slogan: '',
    cnpj: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    logo: '',
    website: '',
    // New catalog request fields
    catalog_user: '',
    catalog_mobile: '',
    catalog_country: '',
    catalog_company: '',
    catalog_email: '',
    wechat_qr: '',
    whatsapp_qr: '',
    linkedin_qr: '',
    wechat_link: '',
    whatsapp_link: '',
    linkedin_link: '',

    mainImage: null,
    footerText: '',
    footerLogo: null,

    menuText: '',
    menuImage: null
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const result = await api.getCompanySettings();
    setLoading(false);
    if (result.error === '') {
      setSettings(result.settings);
    } else {
      setError(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    const result = await api.updateCompanySettings(settings);
    setLoading(false);
    
    if (result.error === '') {
      setSuccess('Configurações salvas com sucesso!');
    } else {
      setError(result.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // Adicione a função handleEditorChange:
const handleEditorChange = (content) => {
  setSettings(prev => ({
    ...prev,
    menuText: content
  }));
};

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Original Company Settings Card */}
      <CRow className="mb-4">
        <CCol>
          <CCard>
            <CCardHeader>
              <h2>Configurações da Empresa</h2>
            </CCardHeader>
            <CCardBody>
            <CRow>
                <CCol md="3">
                  <CFormGroup>
                    <CLabel>Nome da Empresa</CLabel>
                    <CInput
                      type="text"
                      name="company_name"
                      value={settings?.company_name ?? ''}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="3">
                  <CFormGroup>
                    <CLabel>Slogan da  Empresa</CLabel>
                    <CInput
                      type="text"
                      name="company_slogan"
                      value={settings?.company_slogan}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel>CNPJ</CLabel>
                    <CInput
                      type="text"
                      name="cnpj"
                      value={settings?.cnpj}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              {/* Contact Information */}
              <CRow>
                <CCol md="4">
                  <CFormGroup>
                    <CLabel>Telefone</CLabel>
                    <CInput
                      type="text"
                      name="phone"
                      value={settings?.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="4">
                  <CFormGroup>
                    <CLabel>Email</CLabel>
                    <CInput
                      type="email"
                      name="email"
                      value={settings?.email}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="4">
                  <CFormGroup>
                    <CLabel>Website</CLabel>
                    <CInput
                      type="url"
                      name="website"
                      value={settings?.website}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              {/* Address Information */}
              <CFormGroup>
                <CLabel>Endereço</CLabel>
                <CInput
                  type="text"
                  name="address"
                  value={settings?.address}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </CFormGroup>

              <CRow>
                <CCol md="4">
                  <CFormGroup>
                    <CLabel>Cidade</CLabel>
                    <CInput
                      type="text"
                      name="city"
                      value={settings?.city}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="4">
                  <CFormGroup>
                    <CLabel>Estado</CLabel>
                    <CInput
                      type="text"
                      name="state"
                      value={settings?.state}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </CFormGroup>
                </CCol>
                <CCol md="4">
                  <CFormGroup>
                    <CLabel>CEP</CLabel>
                    <CInput
                      type="text"
                      name="zip_code"
                      value={settings?.zip_code}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mt-4">
  <CCol>
    <CCard>
      <CCardHeader>
        <h2>Configurações do Menu Principal</h2>
      </CCardHeader>
      <CCardBody>
        <CFormGroup>
          <CLabel>Texto do Menu</CLabel>
          <Editor
            apiKey='78akxhh4c49danhm1ktjxcrcm1dg174db9mqdrpam1a5ocm6'
            value={settings.menuText}
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: true,
              plugins: [
                'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | table | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              branding: false,
              promotion: false
            }}
          />
        </CFormGroup>

        <CFormGroup className="mt-4">
          <CLabel>Imagem do Menu</CLabel>
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
                      menuImage: reader.result
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="d-none"
              id="menu-image-upload"
            />
            <CButton
              color="secondary"
              onClick={() => document.getElementById('menu-image-upload').click()}
            >
              Escolher Imagem do Menu
            </CButton>
            {settings.menuImage && (
              <div className="mt-2">
                <img
                  src={settings.menuImage}
                  alt="Menu Image Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </div>
            )}
          </div>
        </CFormGroup>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
        {/* New Catalog Request Card */}
        <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h2>Configurações do Catálogo</h2>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol md="4">
                    <CFormGroup>
                      <CLabel>Usuário</CLabel>
                      <CInput
                        type="text"
                        name="catalog_user"
                        value={settings?.catalog_user}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol md="4">
                    <CFormGroup>
                      <CLabel>Celular</CLabel>
                      <CInput
                        type="text"
                        name="catalog_mobile"
                        value={settings?.catalog_mobile}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol md="4">
                    <CFormGroup>
                      <CLabel>País</CLabel>
                      <CInput
                        type="text"
                        name="catalog_country"
                        value={settings?.catalog_country}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel>Empresa</CLabel>
                      <CInput
                        type="text"
                        name="catalog_company"
                        value={settings?.catalog_company}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel>Email</CLabel>
                      <CInput
                        type="email"
                        name="catalog_email"
                        value={settings?.catalog_email}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>

                {/* Social Media Links and QR Codes */}
                <CRow>
                  <CCol md="4">
                    <CFormGroup>
                      <CLabel>WeChat Link</CLabel>
                      <CInput
                        type="text"
                        name="wechat_link"
                        value={settings?.wechat_link}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                      <CLabel className="mt-2">QR Code WeChat</CLabel>
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
                                  wechat_qr: reader.result
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="d-none"
                          id="wechat-qr-upload"
                        />
                        <CButton
                          color="secondary"
                          onClick={() => document.getElementById('wechat-qr-upload').click()}
                        >
                          Escolher QR Code WeChat
                        </CButton>
                        {settings?.wechat_qr && (
                          <div className="mt-2">
                            <img
                              src={settings.wechat_qr}
                              alt="WeChat QR Preview"
                              style={{ maxHeight: '100px' }}
                            />
                          </div>
                        )}
                      </div>
                    </CFormGroup>
                  </CCol>
                  <CCol md="4">
                    <CFormGroup>
                      <CLabel>WhatsApp Link</CLabel>
                      <CInput
                        type="text"
                        name="whatsapp_link"
                        value={settings?.whatsapp_link}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                      <CLabel className="mt-2">QR Code WhatsApp</CLabel>
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
                                  whatsapp_qr: reader.result
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="d-none"
                          id="whatsapp-qr-upload"
                        />
                        <CButton
                          color="secondary"
                          onClick={() => document.getElementById('whatsapp-qr-upload').click()}
                        >
                          Escolher QR Code WhatsApp
                        </CButton>
                        {settings?.whatsapp_qr && (
                          <div className="mt-2">
                            <img
                              src={settings.whatsapp_qr}
                              alt="WhatsApp QR Preview"
                              style={{ maxHeight: '100px' }}
                            />
                          </div>
                        )}
                      </div>
                    </CFormGroup>
                  </CCol>
                  <CCol md="4">
                    <CFormGroup>
                      <CLabel>LinkedIn Link</CLabel>
                      <CInput
                        type="text"
                        name="linkedin_link"
                        value={settings?.linkedin_link}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                      <CLabel className="mt-2">QR Code LinkedIn</CLabel>
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
                                  linkedin_qr: reader.result
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="d-none"
                          id="linkedin-qr-upload"
                        />
                        <CButton
                          color="secondary"
                          onClick={() => document.getElementById('linkedin-qr-upload').click()}
                        >
                          Escolher QR Code LinkedIn
                        </CButton>
                        {settings?.linkedin_qr && (
                          <div className="mt-2">
                            <img
                              src={settings.linkedin_qr}
                              alt="LinkedIn QR Preview"
                              style={{ maxHeight: '100px' }}
                            />
                          </div>
                        )}
                      </div>
                    </CFormGroup>
                  </CCol>
                </CRow>

                <CRow className="mt-4">
  <CCol>
    <CCard>
      <CCardHeader>
        <h2>Imagem Principal</h2>
      </CCardHeader>
      <CCardBody>
        <CFormGroup>
          <CLabel>Imagem da Tela Inicial</CLabel>
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
                      mainImage: reader.result
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="d-none"
              id="main-image-upload"
            />
            <CButton
              color="secondary"
              onClick={() => document.getElementById('main-image-upload').click()}
            >
              Escolher Imagem Principal
            </CButton>
            {settings.mainImage && (
              <div className="mt-2">
                <img
                  src={settings.mainImage}
                  alt="Main Image Preview"
                  style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
              </div>
            )}
          </div>
        </CFormGroup>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

<CRow className="mt-4">
  <CCol>
    <CCard>
      <CCardHeader>
        <h2>Configurações do Rodapé</h2>
      </CCardHeader>
      <CCardBody>
        <CFormGroup>
          <CLabel>Texto do Rodapé</CLabel>
          <CInput
            type="textarea"
            rows="3"
            name="footerText"
            value={settings.footerText}
            onChange={handleInputChange}
            placeholder="Digite o texto que aparecerá no rodapé"
          />
        </CFormGroup>

        <CFormGroup>
          <CLabel>Logo do Rodapé</CLabel>
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
                      footerLogo: reader.result
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="d-none"
              id="footer-logo-upload"
            />
            <CButton
              color="secondary"
              onClick={() => document.getElementById('footer-logo-upload').click()}
            >
              Escolher Logo do Rodapé
            </CButton>
            {settings.footerLogo && (
              <div className="mt-2">
                <img
                  src={settings.footerLogo}
                  alt="Footer Logo Preview"
                  style={{ maxHeight: '100px' }}
                />
              </div>
            )}
          </div>
        </CFormGroup>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

                {error && <CAlert color="danger">{error}</CAlert>}
                {success && <CAlert color="success">{success}</CAlert>}

                <CButton
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar Configurações'}
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default CompanySettings;