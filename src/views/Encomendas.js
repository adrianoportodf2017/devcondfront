import React, { useState, useEffect } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CListGroup,
    CListGroupItem,
    CBadge
} from '@coreui/react';
import useApi from '../services/api';
import { cibAtom, cilArrowCircleLeft, cilFolder, cilPencil, cilPlus, cilSave, cilTrash } from "@coreui/icons";

const Portaria = () => {
    const [porteiros, setPorteiros] = useState([]); // Exemplo de dados de porteiros
    const [acessos, setAcessos] = useState([]); // Exemplo de lista de acessos
    const [encomendas, setEncomendas] = useState([]); // Exemplo de lista de encomendas

    useEffect(() => {
        // Aqui você pode buscar os dados da API
        setPorteiros([
            {
                "nome": "João Silva",
                "foto": "https://via.placeholder.com/150",
                "contato": "(11) 98765-4321"
            },
            {
                "nome": "Maria Oliveira",
                "foto": "https://via.placeholder.com/150",
                "contato": "(21) 91234-5678"
            },
            {
                "nome": "Carlos Sousa",
                "foto": "https://via.placeholder.com/150",
                "contato": "(31) 99876-5432"
            }
        ]);
        setAcessos([
            {
                "data": "2024-09-13 10:30",
                "nome": "Pedro Santos",
                "tipo": "Visitante",
                "local": "Bloco A",
                "status": "Liberado"
            },
            {
                "data": "2024-09-13 11:00",
                "nome": "Ana Lima",
                "tipo": "Entrega",
                "local": "Bloco B",
                "status": "Aguardando"
            },
            {
                "data": "2024-09-13 11:15",
                "nome": "Roberto Costa",
                "tipo": "Morador",
                "local": "Bloco C",
                "status": "Liberado"
            }
        ]);
        setEncomendas([
            {
                "data": "2024-09-12 15:00",
                "remetente": "Amazon",
                "destinatario": "Ricardo Lopes",
                "unidade": "101 - Bloco A",
                "status": false
            },
            {
                "data": "2024-09-12 16:30",
                "remetente": "Correios",
                "destinatario": "Fernanda Souza",
                "unidade": "305 - Bloco B",
                "status": true
            },
            {
                "data": "2024-09-12 17:45",
                "remetente": "Mercado Livre",
                "destinatario": "Lucas Almeida",
                "unidade": "202 - Bloco C",
                "status": false
            }
        ]);
    }, []);

    return (
        <>
        {/* Título da página */}
        <CRow className="mb-3">
          <CCol>
            <h2>Portaria</h2>
          </CCol>
        </CRow>
    
        {/* Card principal para Porteiros */}
        <CRow className="mb-4">
          <CCol xs="12">
            <CCard>
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <span>Porteiros</span>
                <CButton color="primary" size="sm">
                  + Adicionar Porteiro
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  {porteiros.map((porteiro, index) => (
                    <CCol xs="12" sm="6" md="4" key={index} className="p-2">
                      <CCard className="shadow-sm h-100">
                        <CCardBody className="d-flex justify-content-between align-items-center">
                          {/* Informações do porteiro */}
                          <div>
                            <h5>{porteiro.nome}</h5>
                            <CButton
                              color="info"
                              size="sm"
                              onClick={() => alert(`Contato: ${porteiro.contato}`)}
                            >
                              Ver Contato
                            </CButton>
                          </div>
                          {/* Imagem do porteiro */}
                          <img
                            src={porteiro.foto}
                            alt={porteiro.nome}
                            className="img-thumbnail"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>
                  ))}
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
    
        {/* Cards de Acessos do Dia e Encomendas */}
        <CRow className="mb-4">
          {/* Card de Acessos do Dia */}
          <CCol xs="12" sm="6" lg="6">
            <CCard className="shadow-sm h-100">
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <span>Acessos do dia</span>
              </CCardHeader>
              <CCardBody>
                <CListGroup flush>
                  {acessos.map((acesso, index) => (
                    <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Data:</strong> {acesso.data} <br />
                        <strong>Nome:</strong> {acesso.nome} <br />
                        <strong>Tipo:</strong> {acesso.tipo} <br />
                        <strong>Local:</strong> {acesso.local}
                      </div>
                      {/* Badge de Status */}
                      <CBadge color={acesso.status === 'Autorizado' ? 'success' : 'danger'}>
                        {acesso.status}
                      </CBadge>
                    </CListGroupItem>
                  ))}
                </CListGroup>
    
                {/* Botão para acessar a página com todos os acessos */}
                <CButton color="primary" block onClick={() => window.location.href = '/todos-acessos'}>
                  Ver todos os acessos
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
    
          {/* Card de Encomendas */}
          <CCol xs="12" sm="6" lg="6">
            <CCard className="shadow-sm h-100">
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <span>Encomendas</span>
              </CCardHeader>
              <CCardBody>
                <CListGroup flush>
                  {encomendas.map((encomenda, index) => (
                    <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Data:</strong> {encomenda.data} <br />
                        <strong>Remetente:</strong> {encomenda.remetente} <br />
                        <strong>Destinatário:</strong> {encomenda.destinatario} <br />
                        <strong>Unidade:</strong> {encomenda.unidade}
                      </div>
                      {/* Badge de Status */}
                      <CBadge color={encomenda.status ? 'success' : 'warning'}>
                        {encomenda.status ? 'Entregue' : 'Pendente'}
                      </CBadge>
                    </CListGroupItem>
                  ))}
                </CListGroup>
    
                {/* Botão para acessar a página com todas as encomendas */}
                <CButton color="primary" block onClick={() => window.location.href = '/todas-encomendas'}>
                  Ver todas as encomendas
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
};

export default Portaria;
