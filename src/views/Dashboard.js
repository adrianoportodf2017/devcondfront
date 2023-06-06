import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CCardImage,
  CButtonGroup,
  CCard,
  CCardTitle,
  CCardText,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Dashboard = () => {
  return (
    <>
     <CCard style={{ width: '18rem' }}>
  <img  src="https://agenciatecnet.com.br/wp-content/uploads/2021/07/ad05440f-group-60.png" />
  <CCardBody>
    <CCardTitle>Em Desenvolvimento</CCardTitle>
    <CCardText>
      Em breve novidades...
    </CCardText>
    <CButton href="#">Agência TecNet</CButton>
  </CCardBody>
</CCard>
    </>
  )
}

export default Dashboard
