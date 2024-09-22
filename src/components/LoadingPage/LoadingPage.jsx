import React from 'react';
import './LoadingPage.css'; 

const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <h2>Yükleniyor...</h2>
      <p>Uçuş bilgileri alınıyor, lütfen bekleyin.</p>
    </div>
  );
}

export default LoadingPage;
