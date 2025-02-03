import React from 'react';
import {
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
} from '@coreui/react';

const ColorInputs = ({ settings, handleInputChange }) => {
  return (
    <>
      {/* Cores Base */}
      <h4 className="mb-3">Cores Base</h4>
      <CRow>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Branco (White)</CLabel>
            <CInput
              type="color"
              name="white"
              value={settings.white}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Preto (Black)</CLabel>
            <CInput
              type="color"
              name="black"
              value={settings.black}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      <h5 className="mt-4 mb-3">Escalas de Cinza</h5>
      <CRow>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 100</CLabel>
            <CInput
              type="color"
              name="gray100"
              value={settings.gray100}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 200</CLabel>
            <CInput
              type="color"
              name="gray200"
              value={settings.gray200}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 300</CLabel>
            <CInput
              type="color"
              name="gray300"
              value={settings.gray300}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 400</CLabel>
            <CInput
              type="color"
              name="gray400"
              value={settings.gray400}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      <CRow>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 500</CLabel>
            <CInput
              type="color"
              name="gray500"
              value={settings.gray500}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 600</CLabel>
            <CInput
              type="color"
              name="gray600"
              value={settings.gray600}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 700</CLabel>
            <CInput
              type="color"
              name="gray700"
              value={settings.gray700}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 800</CLabel>
            <CInput
              type="color"
              name="gray800"
              value={settings.gray800}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      <CRow className="mb-4">
        <CCol md="3">
          <CFormGroup>
            <CLabel>Cinza 900</CLabel>
            <CInput
              type="color"
              name="gray900"
              value={settings.gray900}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      {/* Cores Principais do Sistema */}
      <h4 className="mb-3">Cores Principais do Sistema</h4>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Primária</CLabel>
            <CInput
              type="color"
              name="primary"
              value={settings.primary}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Secundária</CLabel>
            <CInput
              type="color"
              name="secondary"
              value={settings.secondary}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Sucesso</CLabel>
            <CInput
              type="color"
              name="success"
              value={settings.success}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Informação</CLabel>
            <CInput
              type="color"
              name="info"
              value={settings.info}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Aviso</CLabel>
            <CInput
              type="color"
              name="warning"
              value={settings.warning}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Perigo</CLabel>
            <CInput
              type="color"
              name="danger"
              value={settings.danger}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      <CRow className="mb-4">
        <CCol md="4">
          <CFormGroup>
            <CLabel>Clara</CLabel>
            <CInput
              type="color"
              name="light"
              value={settings.light}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Escura</CLabel>
            <CInput
              type="color"
              name="dark"
              value={settings.dark}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      {/* Cores de Elementos */}
      <h4 className="mb-3">Cores de Elementos</h4>
      <CRow>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Fundo do Corpo (Body)</CLabel>
            <CInput
              type="color"
              name="bodyBg"
              value={settings.bodyBg}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Cor do Texto (Body)</CLabel>
            <CInput
              type="color"
              name="bodyColor"
              value={settings.bodyColor}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="4">
          <CFormGroup>
            <CLabel>Cor da Borda</CLabel>
            <CInput
              type="color"
              name="borderColor"
              value={settings.borderColor}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      {/* Cores da Sidebar */}
      <h4 className="mt-4 mb-3">Cores da Sidebar</h4>
      <CRow>
        <CCol md="6">
          <CFormGroup>
            <CLabel>Fundo da Sidebar</CLabel>
            <CInput
              type="color"
              name="sidebarBg"
              value={settings.sidebarBg}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="6">
          <CFormGroup>
            <CLabel>Cor do Texto da Sidebar</CLabel>
            <CInput
              type="color"
              name="sidebarColor"
              value={settings.sidebarColor}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      {/* Cores do Header */}
      <h4 className="mt-4 mb-3">Cores do Header</h4>
      <CRow>
        <CCol md="6">
          <CFormGroup>
            <CLabel>Fundo do Header</CLabel>
            <CInput
              type="color"
              name="headerBg"
              value={settings.headerBg}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="6">
          <CFormGroup>
            <CLabel>Cor do Texto do Header</CLabel>
            <CInput
              type="color"
              name="headerColor"
              value={settings.headerColor}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
      </CRow>

      {/* Cores do Footer */}
      <h4 className="mt-4 mb-3">Cores do Footer</h4>
      <CRow>
        <CCol md="6">
          <CFormGroup>
            <CLabel>Fundo do Footer</CLabel>
            <CInput
              type="color"
              name="footerBg"
              value={settings.footerBg}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        <CCol md="6">
          <CFormGroup>
            <CLabel>Cor do Texto do Footer</CLabel>
            <CInput
              type="color"
              name="footerColor"
              value={settings.footerColor}
              onChange={handleInputChange}
            />
          </CFormGroup>
        </CCol>
        </CRow>
        <h4 className="mt-4 mb-3">Outras Configurações de Cores</h4>

        <CRow>

   {/* Cores do Footer */}
        <CCol md="6">
                      <CFormGroup>
                        <CLabel>Cor do Estande Visitado</CLabel>
                        <CInput
                          type="color"
                          name="visitedBoothColor"
                          value={settings.visitedBoothColor}
                          onChange={handleInputChange}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol md="6">
                      <CFormGroup>
                        <CLabel>Cor do Estande com Observação</CLabel>
                        <CInput
                          type="color"
                          name="observedBoothColor"
                          value={settings.observedBoothColor}
                          onChange={handleInputChange}
                        />
                      </CFormGroup>
                    </CCol>
      </CRow>
    </>
  );
};

export default ColorInputs;