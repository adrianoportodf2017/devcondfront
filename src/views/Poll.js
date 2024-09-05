import React, { useState, useEffect } from "react";
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
} from '@coreui/react';
import CIcon from "@coreui/icons-react";
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons';
import useApi from '../services/api';

const Enquetes = () => {
    const api = useApi();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalOptionsField, setModalOptionsField] = useState([]);
    const [modalStatusField, setModalStatusField] = useState('1');
    const [modalLoading, setModalLoading] = useState(false);

    const fields = [
        { label: 'Ativo', key: 'status', sorter: false, filter: false },
        { label: 'Título', key: 'title' },
        { label: 'Descrição', key: 'content', sorter: false, filter: false },
        { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
    ];

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        const result = await api.getPolls();
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
        setModalContentField('');
        setModalOptionsField(['']);
        setModalStatusField('1');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleModalSave = async () => {
        if (modalTitleField && modalOptionsField.length > 0) {
            setModalLoading(true);
            let result;
            let data = {
                title: modalTitleField,
                content: modalContentField,
                options: JSON.stringify(modalOptionsField),  // Serializando para JSON
                status: modalStatusField
            };

            if (modalId === '') {
                result = await api.addPoll(data);
            } else {
                result = await api.updatePoll(modalId, data);
            }

            setModalLoading(false);
            if (result.error === '' || result.error === undefined) {
                setShowModal(false);
                getList();
            } else {
                alert(result.error);
            }
        } else {
            alert('Preencha os campos para continuar');
        }
    };

    const handleEditButton = (id) => {
        let index = list.findIndex(v => v.id == id);
        setModalId(list[index]['id']);
        setModalTitleField(list[index]['title']);
        setModalContentField(list[index]['content']);
        setModalOptionsField(list[index]['options']);
        setModalStatusField(list[index]['status']);
        setShowModal(true);
    };

    const handleDelButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.removePoll(id);
            if (result.error === '' || result.error === undefined) {
                getList();
            } else {
                alert(result.error);
            }
        }
    };

    const handleSwitchClick = async (item) => {
        setLoading(true);
        const dataStatus = item.status == '1' ? '0' : '1';
        const result = await api.updatePollStatus(item.id, { 'status': dataStatus });
        setLoading(false);
        if (result.error === '' || result.error === undefined) {
            getList();
        } else {
            alert(result.error);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...modalOptionsField];
        if (newOptions[index]) {
            newOptions[index].title = value;
        }
        setModalOptionsField(newOptions);
    };

    const addOptionField = () => {
        setModalOptionsField([...modalOptionsField, { title: '' }]);
    };

    const removeOptionField = (index) => {
        const newOptions = modalOptionsField.filter((_, i) => i !== index);
        setModalOptionsField(newOptions);
    };
  // Encontre o número máximo de respostas
 // Encontre o número máximo de respostas
 const maxAnswers = modalOptionsField.length > 0 
 ? Math.max(...modalOptionsField.map(option => Array.isArray(option.answers) ? option.answers.length : 0))
 : 1;
  // Função para calcular a largura da barra de progresso
// Função para calcular a largura da barra de progresso
const calculateProgressWidth = (answers) => {
    // Garantir que maxAnswers não seja zero para evitar divisão por zero
    if (maxAnswers === 0) return '0%';

    // Calcular a largura da barra de progresso
    const percentage = (Array.isArray(answers) ? answers.length : 0) / maxAnswers * 100;

    // Retornar a largura como uma string com a unidade '%'
    return `${percentage}%`;
};
    

    return (
        <>
            <CRow>
                <CCol>
                    <h2>Enquetes</h2>
                    <CCard>
                        <CCardHeader>
                            <CButton onClick={handleAddButton} color="light" border="true">
                                <CIcon icon={cilPlus} className="small-icon" />
                                Nova Enquete
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
                                                checked={item.status == '1' ? true : false}
                                                onChange={() => handleSwitchClick(item)} />
                                        </td>
                                    ),
                                    'content': (item) => (
                                        <td>
                                            {item.content}
                                        </td>
                                    ),
                                    'actions': (item) => (
                                        <td>
                                            <CButtonGroup>
                                                <CButton color="light" onClick={() => handleEditButton(item.id)}>
                                                    <CIcon icon={cilPencil} className="small-icon" />
                                                    Editar
                                                </CButton>
                                                <CButton color="light" onClick={() => handleDelButton(item.id)}>
                                                    <CIcon icon={cilTrash} className="small-icon" />
                                                    Excluir
                                                </CButton>
                                            </CButtonGroup>
                                        </td>
                                    )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal show={showModal} onClose={handleCloseModal} size="lg">
                <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Nova'} Enquete</CModalHeader>
                <CModalBody>
                <CFormGroup>
                        <CSwitch
                            color="success"
                            checked={modalStatusField == '1' ? true : false}
                            onChange={() => setModalStatusField(modalStatusField == '1' ? '0' : '1')}
                        />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="modal_title">Título</CLabel>
                        <CInput
                            type="text"
                            id="modal_title"
                            value={modalTitleField}
                            onChange={(e) => setModalTitleField(e.target.value)}
                        />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Opções</CLabel>
                        {modalOptionsField && modalOptionsField.map((option, index) => (
                            <div key={index} className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                    <CInput
                                        type="text"
                                        value={option.title}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                    />
                                    <CButton
                                        color="danger"
                                        className="ml-2"
                                        onClick={() => removeOptionField(index)}
                                    >
                                        Remover
                                    </CButton>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="mr-2" style={{ width: '200px', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
                                        <div
                                            style={{
                                                width: calculateProgressWidth(option.answers),
                                                backgroundColor: '#007bff',
                                                height: '20px'
                                            }}
                                        />
                                    </div>
                                    <span className="ml-2">{(Array.isArray(option.answers) ? option.answers.length : 0)} respostas</span>
                                </div>
                            </div>
                        ))}
                        <CButton color="primary" onClick={addOptionField}>
                            Adicionar Opção
                        </CButton>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="modal_title">Descrição</CLabel>
                        <CInput
                            type="text"
                            id="modal_content"
                            value={modalContentField}
                            onChange={(e) => setModalContentField(e.target.value)}
                        />
                    </CFormGroup>
                  
                </CModalBody>
                <CModalFooter>
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

export default Enquetes;
