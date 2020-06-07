import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { NavbarButton } from '../UI/NavbarButton';

interface Props {
  drawerToggleClickHandler:() => void,
  addNote:(value:string) =>void,
  clearNotes:() => void
}

const Toolbar: React.FC<Props> = ({clearNotes,addNote,drawerToggleClickHandler}) => {
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
              <NavbarButton click={() => {}}>New Fretboard</NavbarButton>
            </li>
            <li>
              <NavbarButton click={clearNotes}>Reset</NavbarButton>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Toolbar
