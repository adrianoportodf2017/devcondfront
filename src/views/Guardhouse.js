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
} from '@coreui/react';
import useApi from '../services/api';

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
            <CRow>
                <CCol>
                    <h2>Portaria</h2>
                </CCol>
            </CRow>

            {/* Card principal com 12 cols */}
            <CRow className="mb-4">
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Porteiros
                            <CButton
                                color="primary"
                                size="sm"
                                className="float-right"
                            >
                                + Adicionar Porteiro
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                {porteiros.map((porteiro, index) => (
                                    <CCol xs="12" sm="6" md="4" key={index} className="p-2">
                                        <div className="box border border-1 p-5 d-flex justify-content-between align-items-center">
                                            {/* Informações do porteiro no lado esquerdo */}
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
                                            {/* Imagem do porteiro no lado direito */}
                                            <img
                                                src={porteiro.foto}
                                                alt={porteiro.nome}
                                                className="img-thumbnail"
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                        </div>
                                    </CCol>
                                ))}
                            </CRow>

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Dois cards menores, cada um com 5 cols */}
            <CRow>
                {/* Card de acessos */}
                <CCol xs="12" sm="5">
                    <CCard>
                        <CCardHeader>Acessos do dia</CCardHeader>
                        <CCardBody>
                            <CListGroup>
                                {acessos.map((acesso, index) => (
                                    <CListGroupItem key={index}>
                                        <strong>Data:</strong> {acesso.data} <br />
                                        <strong>Nome:</strong> {acesso.nome} <br />
                                        <strong>Tipo:</strong> {acesso.tipo} <br />
                                        <strong>Local:</strong> {acesso.local} <br />
                                        <strong>Status:</strong> {acesso.status}
                                    </CListGroupItem>
                                ))}
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                </CCol>

                {/* Card de encomendas */}
                <CCol xs="12" sm="5">
                    <CCard>
                        <CCardHeader>Encomendas</CCardHeader>
                        <CCardBody>
                            <CListGroup>
                                {encomendas.map((encomenda, index) => (
                                    <CListGroupItem key={index}>
                                        <strong>Data:</strong> {encomenda.data} <br />
                                        <strong>Remetente:</strong> {encomenda.remetente} <br />
                                        <strong>Destinatário:</strong> {encomenda.destinatario} <br />
                                        <strong>Unidade:</strong> {encomenda.unidade} <br />
                                        <strong>Status:</strong> {encomenda.status ? 'Entregue' : 'Pendente'}
                                    </CListGroupItem>
                                ))}
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default Portaria;
