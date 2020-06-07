import React from 'react';
import './NavbarButton.css';

interface Props {
  click: () => void;
}

export const NavbarButton: React.FC<Props> = ({ click, children }) => {
  return (
    <button className='navbar_button' onClick={click}>
      {children}
    </button>
  );
};
