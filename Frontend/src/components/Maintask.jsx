import React, { useState } from 'react';
import './Maintask.css';
import Showdata from './Showdata';
import Mydata from './Mydata';
import Addtodos from './Addtodos';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Maintask() {
  const [active, setActive] = useState('Showdata'); // Default active component
  const { user } = useUser();

  // Define a function to handle button click and set the active component
  const handleButtonClick = (componentName) => {
    if (!user && (componentName === 'Mydata' || componentName === 'Addtodos')) {
      toast.warning('Please login first', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setActive(componentName);
    }
  };

  return (
    <div className="main">
      <div className="left">
        <h1>NOTES</h1>
        <hr />
        <button
          className={`todoss ${active === 'Showdata' ? 'active-button' : ''}`}
          onClick={() => handleButtonClick('Showdata')}
        >
          Show Notes
        </button>
        <br />

        <button
          className={`todoss ${active === 'Mydata' ? 'active-button' : ''}`}
          onClick={() => handleButtonClick('Mydata')}
        >
          My Notes
        </button>
        <br />

        <button
          className={`todoss ${active === 'Addtodos' ? 'active-button' : ''}`}
          onClick={() => handleButtonClick('Addtodos')}
        >
          Add Notes
        </button>
        <br />
      </div>
      <div className="right">
        {active === 'Showdata' && <Showdata />}
        {active === 'Mydata' && <Mydata />}
        {active === 'Addtodos' && <Addtodos />}
      </div>
    </div>
  );
}
