import React, { useState, useEffect } from "react";
import './../scss/_custom.scss'; // Importe o arquivo CSS personalizado aqui
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputMask from 'react-input-mask';

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
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,
    CSwitch,
    CSelect
} from '@coreui/react';
import CIcon from "@coreui/icons-react";

import useApi from '../services/api';

const VideoManagement = () => {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listFiles, setListFiles] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalVideoDurationField, setModalVideoDurationField] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');
    const [modalUrlField, setModalUrlField] = useState('');
    const [modalDateEventField, setModalDateEventField] = useState('');
    const [modalLikesField, setModalLikesField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalMediaFileField, setModalMediaFileField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalPublicAreaField, setModalPublicAreaField] = useState(false);
    const [modalRestrictedAreaField, setModalRestrictedAreaField] = useState(false);
    const [modalSlugField, setModalSlugField] = useState('');
    const [modalTagsField, setModalTagsField] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const fields = [
        { label: 'Thumbnail', key: 'thumb', sorter: false, filter: false },
        { label: 'Título', key: 'title'  },
        { label: 'Status', key: 'status', sorter: false, filter: false },
        { label: 'URL', key: 'url', sorter: false, filter: false },
        { label: 'Data do Evento', key: 'date_event', filter: false },
        { label: 'Duração', key: 'video_duration', sorter: false, filter: false },
        { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
    ];

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        const result = await api.getVideos();
        setLoading(false);

        if (result.error === '' || result.error === undefined) {
            setList(result.list);
        } else {
            alert(result.error);
        }
    };

    const handleAddButton = () => {
        setModalId('');
        setModalTitleField('');
        setModalStatusField('0');
        setModalUrlField('');
        setModalDateEventField('');
        setModalLikesField('');
        setModalThumbField('');
        setModalMediaFileField('');
        setModalContentField('');
        setModalPublicAreaField('');
        setModalRestrictedAreaField('');
        setModalSlugField('');
        setModalTagsField('');

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleModalSave = async () => {
        if (modalTitleField && modalUrlField) {
            setModalLoading(true);
            let result;
            let data = {
                title: modalTitleField,
                status: modalStatusField,
                url: modalUrlField,
                date_event: modalDateEventField,
                likes: modalLikesField,
                thumb: modalThumbField,
                content: modalContentField,
                public_area: modalPublicAreaField,
                restricted_area: modalRestrictedAreaField,
                slug: modalSlugField,
                tags: modalTagsField,
                video_duration: modalVideoDurationField // Inclui o campo de duração do vídeo
            };

            if (modalId === '') {
                result = await api.addVideo(data);
            } else {
                result = await api.updateVideo(modalId, data);
            }

            setModalLoading(false);
            if (result.error === '' || result.error === undefined) {
                getList();
                setShowModal(false);
                alert('Vídeo salvo com sucesso!');
            } else {
                alert(result.error);
            }
        } else {
            alert('Preencha os campos obrigatórios para continuar.');
        }
    };

    const handleEditButton = (id) => {
        let index = list.findIndex(v => v.id === id);
        setModalId(list[index].id);
        setModalTitleField(list[index].title);
        setModalStatusField(list[index].status);
        setModalUrlField(list[index].url);
        setModalDateEventField(list[index].date_event);
        setModalLikesField(list[index].likes);
        setModalThumbField(list[index].thumb);
        setModalContentField(list[index].content);
        setModalPublicAreaField(list[index].public_area);
        setModalRestrictedAreaField(list[index].restricted_area);
        setModalSlugField(list[index].slug);
        setModalTagsField(list[index].tags);
        setModalVideoDurationField(list[index].video_duration); // Atualiza o campo de duração
        setShowModal(true);
    };

    const handleDelButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este vídeo?')) {
            const result = await api.removeVideo(id);
            if (result.error === '' || result.error === undefined) {
                getList();
            } else {
                alert(result.error);
            }
        }
    };

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
            ['clean']
        ]
    };

    return (
        <>
            <CRow>
                <CCol>
                    <h2>Gestão de Vídeos</h2>

                    <CCard>
                        <CCardHeader>
                            <CButton onClick={handleAddButton} color="primary">
                                <CIcon icon="cil-check" className="small-icon" /> Novo Vídeo
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
                                    'thumb': (item) => (
                                        <td>
                                            <img src={item.thumb} width={100} />
                                        </td>
                                    ),
                                    'title': (item) => (
                                        <td>{item.title}</td>
                                    ),
                                    'content': (item) => (
                                        <td>
                                            {item.content ? (
                                                <span>
                                                    {item.content.replace(/<[^>]*>/g, '').substring(0, 30)}
                                                    {item.content.length > 30 ? '...' : ''}
                                                </span>
                                            ) : null}
                                        </td>
                                    ),
                                    'status': (item) => (
                                        <td>
                                            {item.status === '1' ? (
                                                <span className="badge badge-success">Ativo</span>
                                            ) : (
                                                <span className="badge badge-warning text-light">Inativo</span>
                                            )}
                                        </td>
                                    ),
                                    'url': (item) => (
                                        <td>{item.url}</td>
                                    ),
                                    'date_event': (item) => (
                                        <td>{new Date(item.date_event).toLocaleDateString('pt-BR')}</td>
                                    ),
                                    'likes': (item) => (
                                        <td>{item.likes}</td>
                                    ),
                                    'slug': (item) => (
                                        <td>{item.slug}</td>
                                    ),
                                    'tags': (item) => (
                                        <td>{item.tags}</td>
                                    ),
                                    'actions': (item) => (
                                        <td>
                                            <CButtonGroup>
                                                <CButton color="info" onClick={() => handleEditButton(item.id)}>Editar</CButton>
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

            <CModal show={showModal} onClose={handleCloseModal} size="xl">
                <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Novo'} Vídeo</CModalHeader>
                <CModalBody>
                    <div className="row">
                        <div className="col-sm-12">
                            <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">
                                {modalLoading ? 'Carregando' : 'Salvar'}
                            </CButton>
                            <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">
                                Cancelar
                            </CButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <CFormGroup>
                                <CLabel htmlFor="modal-status">Status</CLabel>
                                <CSelect
                                    id="modal-status"
                                    value={modalStatusField}
                                    onChange={(e) => setModalStatusField(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="0">Inativo</option>
                                    <option value="1">Ativo</option>
                                </CSelect>
                            </CFormGroup>
                        </div>
                        <div className="col-sm-6">
                            <CFormGroup>
                                <CLabel htmlFor="modal_date_event">Data do Evento</CLabel>
                                <CInput
                                    type="date"
                                    id="modal_date_event"
                                    name="date_event"
                                    value={modalDateEventField}
                                    onChange={(e) => setModalDateEventField(e.target.value)}
                                />
                            </CFormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <CFormGroup>
                                <CLabel htmlFor="modal_public_area">Área Pública</CLabel>
                                <CSwitch
                                    id="modal_public_area"
                                    name="public_area"
                                    checked={modalPublicAreaField}
                                    onChange={(e) => setModalPublicAreaField(e.target.checked)}
                                    className={'mx-1'}
                                    shape={'pill'}
                                    color={'primary'}
                                />
                            </CFormGroup>
                        </div>
                        <div className="col-sm-6">
                            <CFormGroup>
                                <CLabel htmlFor="modal_restricted_area">Área Restrita</CLabel>
                                <CSwitch
                                    id="modal_restricted_area"
                                    name="restricted_area"
                                    checked={modalRestrictedAreaField}
                                    onChange={(e) => setModalRestrictedAreaField(e.target.checked)}
                                    className={'mx-1'}
                                    shape={'pill'}
                                    color={'primary'}
                                />
                            </CFormGroup>
                        </div>
                        <div className="col-sm-4">
                            <CFormGroup>
                                <CLabel htmlFor="modal_title">Título</CLabel>
                                <CInput
                                    type="text"
                                    id="modal_title"
                                    name="title"
                                    value={modalTitleField}
                                    onChange={(e) => setModalTitleField(e.target.value)}
                                />
                            </CFormGroup>
                        </div>
                        <div className="col-sm-4">
                            <CFormGroup>
                                <CLabel htmlFor="modal_thumb">Thumbnail</CLabel>
                                <CInput
                                    type="file"
                                    id="modal_thumb"
                                    name="thumb"
                                    onChange={(e) => setModalThumbField(e.target.files[0])}
                                />
                            </CFormGroup>
                        </div>
                        <div className="col-sm-2">
                            <CFormGroup>
                                <CLabel htmlFor="modal_video_duration">Duração do Vídeo</CLabel>
                                <CInput
                                    type="time"
                                    step="2"
                                    id="modal_video_duration"
                                    name="video_duration"
                                    value={modalVideoDurationField}
                                    onChange={(e) => setModalVideoDurationField(e.target.value)}
                                    placeholder="Ex: 10:00"
                                />
                            </CFormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <CFormGroup>
                                <CLabel htmlFor="modal_url">URL</CLabel>
                                <CInput
                                    type="text"
                                    id="modal_url"
                                    name="url"
                                    value={modalUrlField}
                                    onChange={(e) => setModalUrlField(e.target.value)}
                                />
                            </CFormGroup>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <CFormGroup>
                                <CLabel htmlFor="modal_likes">Likes</CLabel>
                                <CInput
                                    type="number"
                                    id="modal_likes"
                                    name="likes"
                                    value={modalLikesField}
                                    onChange={(e) => setModalLikesField(e.target.value)}
                                />
                            </CFormGroup>
                        </div>

                    </div>
                    <div className="row">

                        <div className="col-sm-6">
                            <CFormGroup>
                                <CLabel htmlFor="modal_slug">Slug</CLabel>
                                <CInput
                                    type="text"
                                    id="modal_slug"
                                    name="slug"
                                    value={modalSlugField}
                                    onChange={(e) => setModalSlugField(e.target.value)}
                                />
                            </CFormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <CFormGroup>
                                <CLabel htmlFor="modal_tags">Tags</CLabel>
                                <CInput
                                    type="text"
                                    id="modal_tags"
                                    name="tags"
                                    value={modalTagsField}
                                    onChange={(e) => setModalTagsField(e.target.value)}
                                />
                            </CFormGroup>
                        </div>

                    </div>

                    <CFormGroup className="mb-5">
                        <CLabel htmlFor="modal_content">Descrição</CLabel>
                        <ReactQuill
                            style={{ height: '250px' }}
                            theme="snow"
                            modules={modules}
                            value={modalContentField}
                            onChange={(content) => setModalContentField(content)}
                        />
                    </CFormGroup>
                </CModalBody>
                <CModalFooter className="mt-5">
                    <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">
                        {modalLoading ? 'Carregando' : 'Salvar'}
                    </CButton>
                    <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">
                        Cancelar
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default VideoManagement;
