import React, { useState, useRef, useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody, 
  CModalFooter,
  CFormGroup,
  CLabel,
  CInput,
  CAlert,
  CSpinner
} from '@coreui/react';
import { Editor } from '@tinymce/tinymce-react';
import useApi from './../services/api';

const EmailComposerModal = ({ showModal, onClose }) => {


  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  const [loading, setLoading] = useState(false);
    const api = useApi();
  
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    attachments: []
  });
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateEmails = (emails) => {
    if (!emails) return true;
    return emails.split(',')
      .map(email => email.trim())
      .every(email => isValidEmail(email));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    if (totalSize > 10 * 1024 * 1024) { // 10MB limit
      setError('O tamanho total dos anexos não pode exceder 10MB');
      return;
    }

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!validateEmails(formData.to)) {
      setError('Por favor, insira um email de destinatário válido');
      return;
    }
    if (!validateEmails(formData.cc)) {
      setError('Por favor, insira um email de CC válido');
      return;
    }
    if (!validateEmails(formData.bcc)) {
      setError('Por favor, insira um email de BCC válido');
      return;
    }
    if (!formData.subject) {
      setError('O assunto é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const emailData = new FormData();
      emailData.append('to', formData.to);
      emailData.append('cc', formData.cc);
      emailData.append('bcc', formData.bcc);
      emailData.append('subject', formData.subject);
      emailData.append('content', formData.content);
      formData.attachments.forEach(file => {
        emailData.append('attachments', file);
      });
      let result;
      result =  await api.sendEmail(emailData);
      if (!result.error) {
      //handleClose();
      alert('Email enviado com sucesso!');}
      else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setError('Falha ao enviar email. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

 const handleClose = () => {
  setFormData({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    attachments: []
  });
  setError('');
  setShow(false);
  onClose?.(); // Chama a função onClose passada via prop
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <>
      
      <CModal 
        show={show} 
        onClose={handleClose}
        size="lg"
        className="text-dark"
        backdrop="static"
        keyboard={false}
      >
        <CModalHeader closeButton>
          <h5 className="mb-0">Escrever Email</h5>
        </CModalHeader>
        
        <CModalBody>
          {error && (
            <CAlert color="danger" className="mb-4">
              {error}
            </CAlert>
          )}

          <CFormGroup>
            <CLabel htmlFor="email-to">Para</CLabel>
            <CInput
              id="email-to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="destinatario@example.com"
              disabled={loading}
              onKeyPress={handleKeyPress}
            />
            <small className="text-muted">
              Separe vários emails com vírgulas
            </small>
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="email-cc">CC</CLabel>
            <CInput
              id="email-cc"
              name="cc"
              value={formData.cc}
              onChange={handleInputChange}
              placeholder="cc@example.com"
              disabled={loading}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="email-bcc">BCC</CLabel>
            <CInput
              id="email-bcc"
              name="bcc"
              value={formData.bcc}
              onChange={handleInputChange}
              placeholder="bcc@example.com"
              disabled={loading}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="email-subject">Assunto</CLabel>
            <CInput
              id="email-subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Digite o assunto"
              disabled={loading}
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel>Mensagem</CLabel>
            <Editor
              apiKey='78akxhh4c49danhm1ktjxcrcm1dg174db9mqdrpam1a5ocm6'
              value={formData.content}
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

          <CFormGroup>
            <CLabel>Anexos</CLabel>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="d-none"
              />
              <CButton
                color="secondary"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                Adicionar Anexos
              </CButton>
              
              {formData.attachments.length > 0 && (
                <div className="mt-3">
                  {formData.attachments.map((file, index) => (
                    <div 
                      key={index} 
                      className="d-flex justify-content-between align-items-center p-2 mb-2 bg-light rounded"
                    >
                      <span className="text-truncate">{file.name}</span>
                      <CButton
                        color="link"
                        className="text-danger"
                        onClick={() => removeAttachment(index)}
                        disabled={loading}
                      >
                        Remover
                      </CButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CFormGroup>
        </CModalBody>
        
        <CModalFooter>
          <CButton 
            color="secondary" 
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar  
          </CButton>
          <CButton
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span>
                <CSpinner size="sm" className="me-2" />
                Enviando...
              </span>
            ) : 'Enviar Email'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EmailComposerModal;