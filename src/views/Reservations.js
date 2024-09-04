import React, { useState, useEffect } from "react";
import moment from 'moment';
import { cibAtom, cilArrowCircleLeft, cilFolder, cilPencil, cilPlus, cilSave, cilTrash } from "@coreui/icons";

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
  CSelect,

} from '@coreui/react';
import CIcon from "@coreui/icons-react";

import useApi from '../services/api'



const Reservation = () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [modalUnitList, setModalUnitList] = useState([]);
  const [modalAreaList, setModalAreaList] = useState([]);
  const [modalAreaId, setModalAreaId] = useState(0);
  const [modalUnitId, setModalUnitId] = useState(0);
  const [modalDateField, setModalDateField] = useState(moment().format('YYYY-MM-DD'));
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalId, setModalId] = useState('');
  const [modalStartTime, setModalStartTime] = useState('');
  const [modalEndTime, setModalEndTime] = useState('');


  const fields = [
    { label: 'Unidade', key: 'name_unit', sorter: false },
    { label: 'Área', key: 'name_area', sorter: false },
    { label: 'Data da reserva', key: 'date_reservation' },
    { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }

  ]

  useEffect(() => {
    getList();
    getUnitList();
    getAreaList();
  }, []);



  const getList = async () => {
    setLoading(true);
    const result = await api.getReservations();
    console.log(result);
    setLoading(false);

    if (result.error === '' || result.error === undefined) {
      setList(result.list);
    } else {
      alert(result.error)
    }

  }
  const getUnitList = async () => {
    const result = await api.getUnits();
    if (result.error === '' | result.error === undefined) {
      setModalUnitList(result.list)
    }
  }
  const getAreaList = async () => {
    const result = await api.getAreas();
    if (result.error === '' | result.error === undefined) {
      setModalAreaList(result.list)
    }
  }

  const handleAddButton = () => {
    setModalId('');
    setModalUnitId(modalUnitList[0]['id'])
    setModalAreaId(modalAreaList[0]['id'])
    setModalStartTime('08:00');
    setModalEndTime('12:00');
    setModalDateField('');
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }


  const handleModalSave = async () => {

    if (modalUnitId && modalAreaId && modalDateField) {
      setModalLoading(true);
      let result;
      let data = {
        unit_id: modalUnitId,
        area_id: modalAreaId,
        reservation_date: modalDateField,
        start_time: modalStartTime,
        end_time: modalEndTime,      };

      if (modalId === '') {
        result = await api.addReservation(data)
      } else {
        result = await api.updateReservation(modalId, data);
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
    let index = list.findIndex(v => v.id === id)
    setModalId(list[index]['id']);
    setModalUnitId(list[index]['unit_id'])
    setModalAreaId(list[index]['area_id'])
    setModalDateField(list[index]['reservation_date']);
    setShowModal(true);

  }

  const handleDelButton = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const result = await api.removeReservation(id);
      if (result.error === '' || result.erro === undefined) {
        getList();
      } else {
        alert(result.error)
      }
    }
  }

  const formatDate = (option, date) => {
    let [initialDate, initialTime] = modalDateField.split(' ')

    let [onlyDate, hour] = date.split(' ');
    let [year, month, day] = onlyDate.split('-');
    let dateFormated2 = `${year}-${month}-${day}`

    switch (option) {
      case 'Date':
        return dateFormated2;
      case 'time':
        return hour;
      case 'onlyDate':

        return `${date} ${initialTime}:00 `
      case 'onlyTime':

        return `${initialDate} ${date}:00`;
      default: alert('Erro inesperado')
    }

  }

 
  const startHour = modalDateField == moment().format('YYYY-MM-DD') ? moment().format('H') : 8;
  const endHour = 23; // Hora de término desejada
  
  const hours = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    hours.push(`${formattedHour}:00`);
  }

  const hoursEndTime = () => {     
    const startHourEndtime = parseInt(modalStartTime.slice(0, 2)) + 1;
    const endHourEndTime = 23; // Hora de término desejada

      const hourEndtime = modalStartTime;
      const hourssEndTime = [];
      for (let hour = startHourEndtime; hour <= endHourEndTime; hour++) {
        const formattedHour = hour.toString().padStart(2, "0");
        hourssEndTime.push(`${formattedHour}:00`);
      }
      return hourssEndTime
  }

  return (
    <>
      <CRow>
        <CCol>
          <h2>Reservas</h2>

          <CCard>
            <CCardHeader>
              <CButton
                onClick={handleAddButton}
                color="light"
                disabled={modalUnitList.length === 0 || modalAreaList === 0}
              >               
                <CIcon icon={cilPlus}  className="small-icon"/> Nova Reserva
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
                  'reservation_date': (item) => (
                    <td>
                      {item.reservation_date_formatted}
                    </td>
                  ),
                  'actions': (item, index) => (
                    <td>
                      <CButtonGroup>
                        <CButton
                          color="light"
                          onClick={() => handleEditButton(item.id)}
                          disabled={modalUnitList.length === 0 || modalAreaList === 0}>
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

      <CModal show={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>{modalId !== '' ? 'Editar' : 'Nova'} Reserva </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal_unit">Unidade</CLabel>
            <CSelect
              id='modal_unit'
              custom
              onChange={e => setModalUnitId(e.target.value)}
              value={modalUnitId}
            >
              {modalUnitList.map((item, index) => (
                <option key={index}
                  value={item.id} >
                  {item.name}
                </option>
              ))}

            </CSelect>
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal_area">Área</CLabel>
            <CSelect
              id='modal_area'
              custom
              onChange={e => {
                setModalAreaId(e.target.value);
                const selectedArea = modalAreaList.find(area => area.id === e.target.value);
                if (selectedArea) {
                  setModalStartTime(selectedArea.start_time);
                  setModalEndTime(selectedArea.end_time);
                }
              }}
              value={modalAreaId}
            >
              {modalAreaList.map((item, index) => (
                <option
                  key={index}
                  value={item.id}>
                  {item.title}
                </option>
              ))

              }
            </CSelect>
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal-date">Data da reserva</CLabel>
            <CInput
              type="date"
              id="modal_date"
              value={formatDate('Date', modalDateField)}
              onChange={e => setModalDateField(e.target.value)}
              disabled={modalLoading}
              min={moment().format('YYYY-MM-DD')}

            />


          </CFormGroup>
          <CFormGroup>
  <CLabel htmlFor="modal-start-time">Hora de início da reserva</CLabel>
   <CSelect
    id="modal_start_time"
    custom
    value={modalStartTime}
    onChange={e => setModalStartTime(e.target.value)}
    disabled={modalLoading}
  >
    {hours.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </CSelect>
</CFormGroup>
<CFormGroup>
  <CLabel htmlFor="modal-end-time">Hora de término da reserva</CLabel>
  <CSelect
    id="modal_end_time"
    custom
    value={modalEndTime}
    onChange={e => setModalEndTime(e.target.value)}
    disabled={modalLoading}
  >
    {hoursEndTime().map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </CSelect>
</CFormGroup>


        </CModalBody>
        <CModalFooter>
          <CButton disabled={modalLoading} onClick={handleModalSave} color="primary">{modalLoading ? 'Carregando' : 'Salvar'}</CButton>
          <CButton disabled={modalLoading} onClick={handleCloseModal} color="secondary">Cancelar</CButton>



        </CModalFooter>
      </CModal>
    </>
  )


};
export default Reservation;