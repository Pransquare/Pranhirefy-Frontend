import React from 'react';
import '../App.css'
const HeaderComponent = () => {
  return (
    <header className="bg text-white p-3 shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ">
          <img
            src="/images/pransquare-logo.png"
            alt="Pransquare Logo" className='logo'
            style={{ height: '40px' , width: '160px'}}
          />
          
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
