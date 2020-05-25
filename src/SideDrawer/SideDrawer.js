import React from 'react';
import './SideDrawer.css';

function SideDrawer({ show }) {
  let sideDrawerClasses = show ? 'side-drawer open' : 'side-drawer';

  return (
    <nav className={sideDrawerClasses}>
      <ul>
        <li>
          <a href='/'>Products</a>
        </li>
        <li>
          <a href='/'>Users</a>
        </li>
      </ul>
    </nav>
  );
}

export default SideDrawer;
