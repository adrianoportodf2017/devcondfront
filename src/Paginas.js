import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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
    CInputCheckbox,
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

import useApi from './services/api'



const Noticias = () => {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [pages, setList] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalThumbField, setModalThumbField] = useState('');
    const [modalContentField, setModalContentField] = useState('');
    const [modalStatusField, setModalStatusField] = useState('');
    const [modalStatusThumbField, setModalStatusThumbField] = useState('');


    const [category, setCategory] = useState([]);
    const [modalCategoryField, setModalCategoryField] = useState('')


    const [name, setName] = useState("");
    const [isValid, setIsValid] = useState(true);
    const dispatch = useDispatch();
  
 
  
    const handleSubmit = async () => {
      if (!name) {
        setIsValid(false);
        return;
      }
      let result;
      let data = {
          status: '1',
          title: name,
          content: name

      };

      result = await api.addNew(data);

      if (result.error === '' || result.error === undefined) {
        getList();
    } else {
        alert(result.error); }
    };

    useEffect(() => {
        getList();

    }, []);



    const getList = async () => {
        const result = await api.getNews();
        const category = await api.getCategories('noticias');
        console.log(result);
        if (result.error === '' || result.error === undefined) {
            setList(result.list);
            if (category) { setCategory(category.list); }

        } else {
            alert(result.error)
        }
    };

    

  
    return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          <form id="create-page">
            <div className="modal-header">
              <h5 className="modal-title" id="addPageModalLabel">
                Create Page
              </h5>
            </div>
            <div className="modal-body">
              <div className="col-auto">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    isValid ? "" : "is-invalid"
                  }`}
                  id="name"
                  name="name"
                  placeholder="Name of Page"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 my-2">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {pages
                ? pages.map((page) => (
                    <tr key={page.id}>
                      <td>{page.id}</td>
                      <td>{page.title}</td>
                      <td>{page.slug}</td>
                      <td>
                        <Link to={`/editor/${page.id}`}>Edit</Link>
                      </td>
                    </tr>
                  ))
                : "No Page"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Noticias;    



