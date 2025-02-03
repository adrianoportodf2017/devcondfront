import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div 
      className="bg-white position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ 
        backgroundColor: 'rgb(255, 255, 255)', 
        zIndex: 9999, 
        width: '100%',
        height: '100vh',
      }}
    >
      <div className=" rounded p-4 d-flex flex-column align-items-center">
        <Loader2 
          className="spinner-border mb-2" 
          style={{ 
            width: '3rem', 
            height: '3rem', 
            color: '#0d6efd' 
          }} 
        />
        <div className="text-dark">Carregando...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;