import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import { htmlEditButton } from 'quill-html-edit-button';
import 'react-quill/dist/quill.snow.css';

import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CFormGroup,
    CInput,
    CSwitch,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,
    CLabel,
} from '@coreui/react';
import CIcon from "@coreui/icons-react";

import useApi from '../services/api'

const Beneficios = () => {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalNameField, setModalNameField] = useState('');
    const [modalEmailField, setModalEmailField] = useState('');
    const [modalPhoneField, setModalPhoneField] = useState('');
    const [modalDescriptionField, setModalDescriptionField] = useState('');
    const [modalAdressField, setModalAdressField] = useState('');
    const [modalCityField, setModalCityField] = useState('');
    const [modalStateField, setModalStateField] = useState('');
    const [modalZipCodeField, setModalZipCodeField] = useState('');
    const [modalWebSiteField, setModalWebSiteField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');

    const fields = [
        { label: 'Ativo', key: 'status', sorter: false, filter: false },
        { label: 'Capa', key: 'thumb', sorter: false, filter: false },
        { label: 'Título', key: 'name' },
        { label: 'Descrição', key: 'description' },
        { label: 'Relatório', key: 'total_ratings', sorter: false, filter: false },
        { label: 'Data da publicação', key: 'created_at' },
        { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
    ]

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        const result = await api.getBenefits();
        console.log(result);
        setLoading(false);

        if (result && result.error === '' || result.error === undefined) {
            setList(result.list);
        } else {
            if (result){
                alert(result.error)
            }
            alert('erro');
           
        }
    };

    const handleAddButton = () => {
        setModalId('');
        setModalNameField('');
        setModalEmailField('');
        setModalPhoneField('');
        setModalDescriptionField('');
        setModalAdressField('');
        setModalCityField('');
        setModalStateField('');
        setModalZipCodeField('');
        setModalWebSiteField('');
        setModalThumbField('');
        setModalStatusField('');

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const handleModalSave = async () => {
        if (modalNameField) {
            setModalLoading(true);
            let result;
            let data = {
                status: modalStatusField,
                name: modalNameField,
                description: modalDescriptionField,
                email: modalEmailField,
                phone: modalPhoneField,
                address: modalAdressField,
                city: modalCityField,
                state: modalStateField,
                zipCode: modalZipCodeField,
                website: modalWebSiteField
            };

            if (modalThumbField) {
                data.thumb = modalThumbField;
            }

            if (modalId === '') {
                result = await api.addBenefit(data)
            } else {
                result = await api.updateBenefit(modalId, data);
            }

            setModalLoading(false)
            if (result.error === '' || result.error === undefined) {
                setShowModal(false);
                getList();
            } else {
                alert(result.error)
            }
        } else {
            alert('Preencha os campos para continuar')
        }
    };

    const handleEditButton = (id) => {
        let index = list.findIndex(v => v.id == id)
        setModalId(list[index]['id']);
        setModalStatusField(list[index]['status']);
        setModalThumbField('');
        setModalNameField(list[index]['name']);
        setModalEmailField(list[index]['email']);
        setModalPhoneField(list[index]['phone']);
        setModalDescriptionField(list[index]['description']);
        setModalAdressField(list[index]['address']);
        setModalCityField(list[index]['city']);
        setModalStateField(list[index]['state']);
        setModalZipCodeField(list[index]['zipCode']);
        setModalWebSiteField(list[index]['website']);
        setShowModal(true);
    }

    const handleDelButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.removeBenefit(id);
            if (result.error === '' || result.erro === undefined) {
                getList();
            } else {
                alert(result.error)
            }
        }
    }

    const handleSwitchClick = async (item) => {
        setLoading(true);
        const dataStatus = item.status == '1' ? '0' : '1'; // Troca o status entre 1 e 0
        const result = await api.updateBenefitStatus(item.id, { 'status': dataStatus }); // Envie o novo status para a API
        setLoading(false);
        if (result.error === '' || result.error === undefined) {
            getList();
        } else {
            alert(result.error);
        }
    }

    const handleModalSwitchClick = () => {
        setModalStatusField(modalStatusField == '1' ? '0' : '1');
    }
  

    Quill.register('modules/htmlEditButton', htmlEditButton);

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
        ],
        htmlEditButton: {
            debug: true,
            msg: "Edit the content in HTML format",
            okText: "Ok",
            cancelText: "Cancel",
            buttonHTML: "&lt;&gt;",
            buttonTitle: "Show HTML source",
            syntax: false,
            prependSelector: 'div#myelement',
            editorModules: {}
        }
    };

    return (
        <>
            <CRow>
                <CCol>
                    <h2>Benefícios </h2>
                    <CCard>
                        <CCardHeader>
                            <CButton
                                onClick={handleAddButton}
                                color="primary"
                            >
                                <CIcon icon="cil-check" className="small-icon" /> Novo Benefício
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={list}
                                fields={fields}
                                loading={loading}
                                noItemsViewSlot=''
                                columnFilter
                                sorter
                                hover
                                striped
                                border
                                pagination
                                itemsPerPage={10}
                                scopedSlots={{
                                    'status': (item) => (
                                        <td>
                                            <CSwitch
                                                color="success"
                                                checked={item.status == '1' ? 'true' : ''}
                                                onChange={() => handleSwitchClick(item)} />
                                        </td>
                                    ),
                                    'thumb': (item) => (
                                        <td>
                                            <img src={item.thumb} width={100} />
                                        </td>
                                    ),
                                    'name': (item) => (
                                        <td>
                                            {item.name}
                                        </td>
                                    ),
                                    'description': (item) => (
                                        <td>
                                         {item.description  == null ? item.description = ' ' : item.description.replace(/<[^>]*>/g, '').substring(0, 30)}
                                        {item.description.length > 30 ? '...' : ''}
                                        </td>
                                    ),
                                    'total_ratings': (item) => (
                                        <td>
                                            <tr>Curtidas: {item.total_ratings}</tr>
                                        </td>
                                    ),
                                    'created_at': (item) => (
                                        <td>
                                            {new Date(item.created_at).toLocaleDateString('pt-BR')}
                                        </td>
                                    ),
                                    'actions': (item, index) => (
                                        <td>
                                            <CButtonGroup>
                                                <CButton color="info" onClick={() => handleEditButton(item.id)} >
                                                    Editar
                                                </CButton>
                                                <CButton color="danger" onClick={() => handleDelButton(item.id)}>Excluir</CButton>
                                            </CButtonGroup>
                                        </td>
                                    )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal show={showModal} onClose={handleCloseModal} size="lg" closeOnBackdrop={false}>
                <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Novo'} Benefício </CModalHeader>
                <CModalBody>
                    <CFormGroup>
                        <CLabel htmlFor="modal_status">Ativo</CLabel><br />
                        <CSwitch
                            color="success"
                            checked={modalStatusField == '0' ? '' : 'true'}
                            onChange={handleModalSwitchClick}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_title">Nome</CLabel>
                        <CInput
                            type="text"
                            id='modal_name'
                            name="name"
                            value={modalNameField}
                            onChange={(e) => setModalNameField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_email">Email</CLabel>
                        <CInput
                            type="email"
                            id='modal_email'
                            name="email"
                            value={modalEmailField}
                            onChange={(e) => setModalEmailField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_phone">Telefone</CLabel>
                        <CInput
                            type="text"
                            id='modal_phone'
                            name="phone"
                            value={modalPhoneField}
                            onChange={(e) => setModalPhoneField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_adress">Endereço</CLabel>
                        <CInput
                            type="text"
                            id='modal_adress'
                            name="adress"
                            value={modalAdressField}
                            onChange={(e) => setModalAdressField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_city">Cidade</CLabel>
                        <CInput
                            type="text"
                            id='modal_city'
                            name="city"
                            value={modalCityField}
                            onChange={(e) => setModalCityField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_state">Estado</CLabel>
                        <CInput
                            type="text"
                            id='modal_state'
                            name="state"
                            value={modalStateField}
                            onChange={(e) => setModalStateField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_zipCode">CEP</CLabel>
                        <CInput
                            type="text"
                            id='modal_zipCode'
                            name="zipCode"
                            value={modalZipCodeField}
                            onChange={(e) => setModalZipCodeField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_website">Website</CLabel>
                        <CInput
                            type="text"
                            id='modal_website'
                            name="website"
                            value={modalWebSiteField}
                            onChange={(e) => setModalWebSiteField(e.target.value)}
                        />
                    </CFormGroup>

                    <CFormGroup>
                        <CLabel htmlFor="modal_Thumb">Capa</CLabel>
                        <CInput
                            type="file"
                            id='modal_Thumb'
                            name="Thumb"
                            placeholder="Escolha uma Imagem"
                            onChange={(e) => setModalThumbField(e.target.files[0])}
                        />
                    </CFormGroup>

                    <CFormGroup className="mb-5">
                        <CLabel htmlFor="modal_Content">Descrição</CLabel>
                        <ReactQuill
                            style={{ height: '300px' }}
                            theme="snow"
                            modules={modules}
                            value={modalDescriptionField}
                            onChange={(description) => setModalDescriptionField(description)}
                        />
                    </CFormGroup>
                </CModalBody>
                <CModalFooter className="mt-5">
                    <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
                    <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>

                </CModalFooter>
            </CModal>
        </>
    )


};
export default Beneficios;
