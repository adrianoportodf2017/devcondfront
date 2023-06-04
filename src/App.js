import React, { Component, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login'));

class App extends Component { 
  render() {

  return (

    <BrowserRouter>
        <Suspense fallback={loading}>
        <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route path="*" name="Home" element={<DefaultLayout />} />
           </Routes>
      </Suspense>
    </BrowserRouter>
   )
  }
}

export default App
