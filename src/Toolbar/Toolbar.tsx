import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { NavbarButton } from '../UI/NavbarButton';

interface Props {
  drawerToggleClickHandler:() => void,
  addNote:(value:string) =>void,
  clearNotes:() => void,
  addFretBoard:() => void,
  removeFretBoard:() => void,
}

const Toolbar: React.FC<Props> = ({addFretBoard, removeFretBoard, clearNotes,addNote,drawerToggleClickHandler}) => {
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
              <NavbarButton click={addFretBoard}>New Fretboard</NavbarButton>
            </li>
            <li>
              <NavbarButton click={removeFretBoard}>Remove Fretboard</NavbarButton>
            </li>
            <li>
              <NavbarButton click={clearNotes}>Delete All Notes</NavbarButton>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Toolbar
