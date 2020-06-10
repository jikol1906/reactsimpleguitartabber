import React from 'react';
import './Backdrop.css';

function Backdrop({ backDropClickhandler }) {
  return (
    <div  
      onClick={backDropClickhandler}
      className="backdrop"
    />
  );
}

export default Backdrop;
