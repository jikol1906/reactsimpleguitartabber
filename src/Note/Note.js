import React from 'react';
import './Note.css';

export default ({ x, y, val, isStringName }) => (
  <div style={{ transform: `translate(${x}em,${y}em)` }} className={isStringName ? 'note__wrapper note__string_name' : 'note__wrapper'}>
      <span className='note'>
        {val}
      </span>
  </div>
);
