import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

const PageDetails = ({ data }) => {
  return (
    <CRow>
      <CCol md="3">
        <CCard>
          <CCardHeader>
            Visualizações
          </CCardHeader>
          <CCardBody>
            {data.views_count || 'N/A'}
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="3">
        <CCard>
          <CCardHeader>
            Curtidas
          </CCardHeader>
          <CCardBody>
            {data.likes_count || 'N/A'}
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="3">
        <CCard>
          <CCardHeader>
            Nuvem de Tags
          </CCardHeader>
          <CCardBody>
            {data.tags || 'N/A'}
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="3">
        <CCard>
          <CCardHeader>
            Última Atualização
          </CCardHeader>
          <CCardBody>
            {data.updated_at ? new Date(data.updated_at).toLocaleString() : 'N/A'}
          </CCardBody>
        </CCard>
      </CCol>    
    </CRow>
  );
};

export default PageDetails;
