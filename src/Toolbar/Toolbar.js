import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

export default function Toolbar({clearNotes,addNote,drawerToggleClickHandler}) {
  return (
    <header className='toolbar'>
      <nav className='toolbar__navigation'>
        <div className='toolbar__toggle-button'>
          <DrawerToggleButton click={drawerToggleClickHandler} />
        </div>
        <div className='toolbar__logo'>
          <a href='/'>Simple Guitar Tabber</a>
        </div>
        <div className='spacer' />
        <div className='toolbar_navigation_items'>
          <ul>
            <li>
              <select name='cars' id='cars'>
                <option value='arp'>Arpeggio</option>
                <option value='note'>Note</option>
                <option value='chord'>Chord</option>
              </select>
            </li>
            <li>
              <input className='toolbar__note-input' />
            </li>
            <li>
              <input className='toolbar__note-input' />
            </li>
            <li>
              <input className='toolbar__note-input' />
            </li>
            <li>
              <input className='toolbar__note-input' />
            </li>
            <li>
              <input className='toolbar__note-input' />
            </li>
            <li>
              <button>Insert</button>
            </li>
            <li>
              <button onClick={clearNotes}>Reset</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
