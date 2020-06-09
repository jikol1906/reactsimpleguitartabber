import React from 'react';
import './SideDrawer.css';

function SideDrawer({ show }) {
  let sideDrawerClasses = show ? 'side-drawer open' : 'side-drawer';

  return (
    <nav className={sideDrawerClasses}>
      <ul>
        <li>
          <a href='/'>New Fretboard</a>
        </li>
        <li>
          <a href='/'>Remove Fretboard</a>
        </li>
        <li>
          <a href='/'>Delete All Notes</a>
        </li>
      </ul>
    </nav>
  );
}

export default SideDrawer;
