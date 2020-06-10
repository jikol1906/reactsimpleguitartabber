import React from 'react';
import './Modal.css';

interface Props {
    show:boolean,
    handlers:{name:string,handler:() => any | void}[]
}

export const Modal: React.FC<Props> = ({ children,show, handlers }) => {
  return (
    <div className={show ? 'modal show' : 'modal'}>
      <div className='modal__content'>
        {children}
      </div>
      <div className='modal__button-container'>
        {handlers.map(({name,handler}) => 
            <button key={name} onClick={handler}>{name}</button>
        )}
      </div>    
    </div>
  );
};
