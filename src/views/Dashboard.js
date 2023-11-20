import React, { lazy } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faBellSlash, faCalendar, faCalendarAlt, faCartPlus, faExclamationTriangle, faFolder, faFolderOpen, faPhoneAlt, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <>
      <h1 className="h2">Área do Condômino</h1>
            <p></p>
            <div className="row my-4">
              <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="card">
                  <h5 className="card-header">Documentos</h5>
                  <div className="card-body">
                    <h5 className="card-title"> <FontAwesomeIcon icon={faFolderOpen} width={40} className=" me-3" />
                    </h5>
                    <p className="card-text">Acesso a documentos relacionado ao Condomínio</p>
                    <Link to='/ListFolders/0'>
                    <p className="card-text text-success">Clique AQUI</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="card">
                  <h5 className="card-header">Avisos</h5>
                  <div className="card-body">
                    <h5 className="card-title"> <FontAwesomeIcon icon={faExclamationTriangle} width={40} className=" me-3" />
                    </h5>
                    <p className="card-text">Acesso aos últimos avisos e notificações</p>
                    <Link to='/wall'>
                    <p className="card-text text-success">Clique AQUI</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="card">
                  <h5 className="card-header">Ocorrências</h5>
                  <div className="card-body">
                    <h5 className="card-title"> <FontAwesomeIcon icon={faBell} width={30} className=" me-3" />
                    </h5>
                    <p className="card-text">Registro de Ocorrências</p>
                    <Link to='/ocorrencias'>
                    <p className="card-text text-success">Clique AQUI</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="card">
                  <h5 className="card-header">Reservas</h5>
                  <div className="card-body">
                    <h5 className="card-title"> <FontAwesomeIcon icon={faCalendarAlt} width={30} className=" me-3" />
                    </h5>
                    <p className="card-text">Reservas de espaços comuns do Condomínio</p>
                    <Link to='/reservations'>
                    <p className="card-text text-success">Clique AQUI</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                <div className="card">
                  <h5 className="card-header">Ocorrências</h5>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">Status</th>
                            <th scope="col">data</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">17371705</th>
                            <td>Volt Premium Bootstrap 5 Dashboard</td>
                            <td>johndoe@gmail.com</td>
                            <td>€61.11</td>
                            <td>Aug 31 2020</td>
                            <td><a href="#" className="btn btn-sm btn-primary">View</a></td>
                          </tr>
                          <tr>
                            <th scope="row">17370540</th>
                            <td>Pixel Pro Premium Bootstrap UI Kit</td>
                            <td>jacob.monroe@company.com</td>
                            <td>$153.11</td>
                            <td>Aug 28 2020</td>
                            <td><a href="#" className="btn btn-sm btn-primary">View</a></td>
                          </tr>
                          <tr>
                            <th scope="row">17371705</th>
                            <td>Volt Premium Bootstrap 5 Dashboard</td>
                            <td>johndoe@gmail.com</td>
                            <td>€61.11</td>
                            <td>Aug 31 2020</td>
                            <td><a href="#" className="btn btn-sm btn-primary">View</a></td>
                          </tr>
                          <tr>
                            <th scope="row">17370540</th>
                            <td>Pixel Pro Premium Bootstrap UI Kit</td>
                            <td>jacob.monroe@company.com</td>
                            <td>$153.11</td>
                            <td>Aug 28 2020</td>
                            <td><a href="#" className="btn btn-sm btn-primary">View</a></td>
                          </tr>
                          <tr>
                            <th scope="row">17371705</th>
                            <td>Volt Premium Bootstrap 5 Dashboard</td>
                            <td>johndoe@gmail.com</td>
                            <td>€61.11</td>
                            <td>Aug 31 2020</td>
                            <td><a href="#" className="btn btn-sm btn-primary">View</a></td>
                          </tr>
                          <tr>
                            <th scope="row">17370540</th>
                            <td>Pixel Pro Premium Bootstrap UI Kit</td>
                            <td>jacob.monroe@company.com</td>
                            <td>$153.11</td>
                            <td>Aug 28 2020</td>
                            <td><a href="#" className="btn btn-sm btn-primary">View</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <a href="#" className="btn btn-block btn-light">View all</a>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default Dashboard
