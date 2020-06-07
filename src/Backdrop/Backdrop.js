import React from 'react';
import './Backdrop.css';

function Backdrop({ drawerToggleClickHandler }) {
  return (
    <div  
      onClick={drawerToggleClickHandler}
      className="backdrop"
    />
  );
}

export default Backdrop;
