import React from 'react';
import './Note.css'

export default ({x,y,val}) => 
    <span className="note" style={{transform: `translate(${x}em,${y}em)`}}>{val}</span>



