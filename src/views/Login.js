import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useApi from '../services/api';
import { useHistory } from 'react-router-dom';
import LoadSpinner from './../components/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [appearanceSettings, setAppearanceSettings] = useState(null);
  const [companySettings, setCompanySettings] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const api = useApi();
  const history = useHistory();
  const location = useLocation();
  const { resetSuccess } = location.state || {};

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [appearanceResult, companyResult] = await Promise.all([
          api.getAppearanceSettings(),
          api.getCompanySettings()
        ]);

        if (!appearanceResult.error) {
          setAppearanceSettings(appearanceResult.settings);
        }
        
        if (!companyResult.error) {
          setCompanySettings(companyResult.settings);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setPageLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      const result = await api.login(email, password);
      setLoading(false);

      if (result.error === '') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user.id);
        localStorage.setItem('userName', result.user.name);
        localStorage.setItem('userEmail', result.user.email);
        history.push('/');
      } else {
        setError(result.error);
        setSuccess('');
      }
    } else {
      setError('Digite seus dados');
      setSuccess('');
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    const result = await api.recoveryPassword(resetEmail);
    
    if (result.error === false) {
      setModalOpen(false);
      setSuccess(result.message);
      setError('');
    } else {
      setModalOpen(false);
      setError(result.message);
      setSuccess('');
    }
    setLoading(false);
  };

  if (pageLoading) {
    return <LoadSpinner />;
  }

  const getThemeStyles = () => {
    const { theme, primaryColor, buttonColor, grayColor } = appearanceSettings || {};
    
    return {
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
      color: theme === 'dark' ? '#ffffff' : '#1e293b',
      buttonBackground: `linear-gradient(135deg, ${primaryColor} 0%, ${buttonColor} 100%)`,
      inputBackground: theme === 'dark' ? '#2d2d2d' : '#f8fafc',
      inputColor: theme === 'dark' ? '#ffffff' : '#1e293b',
      cardBackground: theme === 'dark' ? '#363636' : 'white',
      grayText: grayColor || '#64748b'
    };
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="login-container">
      <div className="login-card">
        <img 
          src={appearanceSettings?.customLogo || "/homelogo.png"}
          alt="Logo" 
          className="logo"
        />
        
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {resetSuccess && <div className="alert alert-success">{resetSuccess}</div>}

          <div className="input-group">
            <div className="icon-wrapper">
              <i className="fas fa-envelope"></i>
            </div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <div className="icon-wrapper">
              <i className="fas fa-lock"></i>
            </div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>

          <div className="reset-password">
            <span onClick={() => setModalOpen(true)}>
              Esqueceu a senha?
            </span>
          </div>
        </form>

        <div className="footer">
          <p>{companySettings?.company_name || ' '}</p>
          <p> {companySettings?.cnpj || ' '}</p>
          {companySettings?.address && <p>{companySettings.address}</p>}
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Recuperar Senha</h3>
            <p>Informe seu endereço de e-mail para receber instruções de recuperação de senha.</p>
            
            <div className="input-group">
              <div className="icon-wrapper">
                <i className="fas fa-envelope"></i>
              </div>
              <input
                type="email"
                placeholder="E-mail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                onClick={handleResetPassword}
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Recuperar Senha'}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${themeStyles.background};
          padding: 20px;
          color: ${themeStyles.color};
        }

        .login-card {
          background: ${themeStyles.cardBackground};
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 500px;
          text-align: center;
        }

        .logo {
          max-width: 200px;
          margin-bottom: 40px;
        }

        .login-form {
          margin: 20px 0;
        }

        .alert {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .alert-error {
          background-color: ${appearanceSettings?.accentColor || '#fee2e2'};
          color: #ffffff;
        }

        .alert-success {
          background-color: #dcfce7;
          color: #16a34a;
        }

        .input-group {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          background: ${themeStyles.inputBackground};
          border-radius: 12px;
          padding: 5px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .input-group:focus-within {
          border-color: ${appearanceSettings?.primaryColor || '#1e3a8a'};
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${appearanceSettings?.primaryColor || '#1e3a8a'};
        }

        input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px;
          font-size: 16px;
          color: ${themeStyles.inputColor};
          outline: none;
        }

        input::placeholder {
          color: ${themeStyles.grayText};
        }

        .submit-button {
          width: 100%;
          padding: 16px;
          background: ${themeStyles.buttonBackground};
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${appearanceSettings?.primaryColor}33;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .reset-password {
          margin-top: 20px;
        }

        .reset-password span {
          color: ${appearanceSettings?.primaryColor || '#2563eb'};
          cursor: pointer;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .reset-password span:hover {
          color: ${appearanceSettings?.buttonColor || '#1e3a8a'};
          text-decoration: underline;
        }

        .footer {
          margin-top: 40px;
          color: ${themeStyles.grayText};
          font-size: 14px;
        }

        .footer p {
          margin: 5px 0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: ${themeStyles.cardBackground};
          padding: 30px;
          border-radius: 20px;
          width: 90%;
          max-width: 400px;
          color: ${themeStyles.color};
        }

        .modal-content h3 {
          margin: 0 0 20px;
          color: ${themeStyles.color};
        }

        .modal-content p {
          color: ${themeStyles.grayText};
          margin-bottom: 20px;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 30px;
        }

        .cancel-button {
          flex: 1;
          padding: 16px;
          background: ${themeStyles.inputBackground};
          color: ${themeStyles.grayText};
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-button:hover {
          background: ${appearanceSettings?.grayColor}33;
        }

        @media (max-width: 640px) {
          .login-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;