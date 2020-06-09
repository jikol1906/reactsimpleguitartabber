import React from 'react';
import './Modal.css'

interface Props {}

export const Modal: React.FC<Props> = () => {
  return (
    <div className="modal">
        <div className="modal__content">
            <h3>Delete all notes?</h3>
        </div>
        <div className="modal__button-container">
            <button>Yes</button>
            <button>No</button>
        </div>
    </div>
  );
};
