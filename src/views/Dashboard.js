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

  useEffect(() => {
    const fetchData = async () => {
      const accessData = await api.getAccessStats();
      const usersData = [];
      const warningsData = [];
      const onlineUsersData = await api.getLastOnlineUsers();
  
      console.log('Access Data:', accessData);
      console.log('Users Data:', usersData);
      console.log('Warnings Data:', warningsData);
      console.log('Online Users Data:', onlineUsersData);
  
      setAccessStats(accessData);
      setUserCount(usersData.totalUsers || 0);
      setWarningCount(warningsData.count || 0);
      setLastOnlineUsers(onlineUsersData.list || []);
    };
  
    fetchData();
  }, [api]);

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

  // Configurações para o gráfico de novos usuários
  const userChartData = {
    labels: ['Usuários'],
    datasets: [
      {
        label: 'Quantidade de Usuários',
        data: [userCount],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
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

        {/* Gráfico de Novos Usuários */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card">
            <h5 className="card-header">Quantidade de Usuários</h5>
            <div className="card-body">
              <Line data={userChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
