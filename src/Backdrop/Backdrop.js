import React, { useEffect, useState, useRef } from 'react';
import './Backdrop.css';

function Backdrop({ show, drawerToggleClickHandler }) {
  const [display, setDisplay] = useState(show);
  useEffect(() => {
    if (show) {
      setDisplay(true);
    } 
  }, [show]);

  return (
    <div  
      onClick={drawerToggleClickHandler}
      className={show ? 'backdrop open' : 'backdrop removed'}
    />
  );
}

export default Backdrop;
