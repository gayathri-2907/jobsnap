import React, { useState } from 'react';
import './Styles/Subscribe.css';
import { successNotification, errorNotification } from '../../Services/NotificationService';
import labels from '../../Labels/LandingPageLabel.json'

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [errorShown, setErrorShown] = useState(false);

  const handleSubscribe = () => {
    if (email && validateEmail(email)) {
      successNotification(labels.subscribeLabels.successMessage);
      setEmail('');
      setErrorShown(false); 
    } else {
      if (!errorShown) {
        errorNotification(labels.subscribeLabels.errorMessage);
        setErrorShown(true);  
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorShown(false);  
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="subscribe-outer-container d-flex align-items-center justify-content-around">
      <div className="text-center fw-bold fs-2 p-3">
       {labels.subscribeLabels.neverMiss}<br/> {labels.subscribeLabels.any} <span className="text-warning"> {labels.subscribeLabels.jobNews} </span>
      </div>
      <div className='d-flex bg-white p-2 gap-2 square rounded-2'>
        <input
          className='subscribe-input opacity-75'
          placeholder={labels.subscribeLabels.subscribePlaceholder}
          value={email}
          onChange={handleEmailChange}
        />
        <button className='subscribe-btn w-50' onClick={handleSubscribe}>{labels.subscribeLabels.subscribe}</button>
      </div>
    </div>
  );
}
