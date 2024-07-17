import React from 'react';
import { CModal, CModalBody, CModalFooter, CButton } from '@coreui/react';

const IframeModal = ({ iframeUrl, onClose }) => {
    return (
        <CModal show={false} onClose={onClose} size="xl">
            <CModalBody>
                <div style={{ width: '100%', height: '800px' }}>
                    <iframe src={iframeUrl} width="100%" height="100%" frameBorder="0"></iframe>
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={onClose} color="secondary">Fechar</CButton>
                <CButton color="primary" onClick={() => window.open(iframeUrl, "_blank")}>Visualizar em Nova Guia</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default IframeModal;
