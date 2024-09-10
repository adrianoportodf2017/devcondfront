import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faExclamationTriangle, faUsers, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Bar, Line } from 'react-chartjs-2'; // Biblioteca Chart.js
import 'chart.js/auto'; // Necessário para Chart.js funcionar corretamente
import useApi from '../services/api';
import './../scss/_custom.scss';

const Dashboard = () => {
  const api = useApi();
  const [accessStats, setAccessStats] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [lastOnlineUsers, setLastOnlineUsers] = useState([]);
  const [mostVisitedPages, setMostVisitedPages] = useState([]); // Novo estado para as páginas mais visitadas

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
      const accessData = await api.getAccessStats();
      const onlineUsersData = await api.getLastOnlineUsers();
        setAccessStats(accessData);
      setUserCount(accessData.totalUsers || 0);
      setWarningCount(accessData.totalWarnings || 0);
      setMostVisitedPages(accessData.mostVisitedPages || []); // Definindo as páginas mais visitadas
      setLastOnlineUsers(onlineUsersData.list || []);
  }

  // Configurações para o gráfico de acessos
  const accessChartData = {
    labels: accessStats.dates || [],
    datasets: [
      {
        label: 'Acessos Diários',
        data: accessStats.counts || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Configurações para o gráfico das páginas mais visitadas
  const pagesChartData = {
    labels: mostVisitedPages.map(page => page.url), // URLs das páginas
    datasets: [
      {
        label: 'Páginas Mais Visitadas',
        data: mostVisitedPages.map(page => page.visit_count), // Quantidade de visitas
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <>
      <h1 className="h2">Área do Condomínio</h1>
      <div className="row my-4">
        {/* Avisos */}
        <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
          <div className="card">
            <h5 className="card-header">Avisos</h5>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faExclamationTriangle} width={40} className="me-3" />
                {warningCount} Avisos
              </h5>
              <p className="card-text">Acesso aos últimos avisos e notificações</p>
              <Link to='/wall'>
                <p className="card-text text-success">Clique AQUI</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Ocorrências */}
        <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
          <div className="card">
            <h5 className="card-header">Ocorrências</h5>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faBell} width={30} className="me-3" />
              </h5>
              <p className="card-text">Registro de Ocorrências</p>
              <Link to='/ocorrencias'>
                <p className="card-text text-success">Clique AQUI</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Quantidade de Usuários */}
        <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
          <div className="card">
            <h5 className="card-header">Usuários</h5>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faUsers} width={30} className="me-3" />
                {userCount} Usuários
              </h5>
              <p className="card-text">Total de usuários cadastrados</p>
              <Link to='/users'>
                <p className="card-text text-success">Clique AQUI</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Últimos Usuários Online */}
        <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
          <div className="card">
            <h5 className="card-header">Últimos Usuários Online</h5>
            <div className="card-body">
              <ul className="list-unstyled">
                {lastOnlineUsers.map(user => (
                  <li key={user.id}>
                    <FontAwesomeIcon icon={faClock} width={20} className="me-2" />
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row my-4">
        {/* Gráfico de Acessos */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card">
            <h5 className="card-header">Estatísticas de Acessos</h5>
            <div className="card-body">
              <Bar data={accessChartData} />
            </div>
          </div>
        </div>

        {/* Gráfico de Páginas Mais Visitadas */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card">
            <h5 className="card-header">Páginas Mais Visitadas</h5>
            <div className="card-body">
              <Bar data={pagesChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
