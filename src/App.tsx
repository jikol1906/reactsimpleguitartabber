import React, { useState, useEffect, useMemo, useReducer } from 'react';
import Fretboard from './Wrapper/Fretboard';
import './App.css';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import notesReducer from './Reducers/notes-reducer';
import INote from './Models/INotes';

let current = 2;
let wrapperNum = 0;
const capacity = 37;

const App: React.FC = () => {
  const [tuning, setTuning] = useState(['E', 'A', 'D', 'G', 'B', 'E']);
  const [{ x, y, fretboardNumber }, setNoteSelector] = useState({
    x: 1,
    y: 1,
    fretboardNumber: 0,
  });
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [notes, dispatchNotes] = useReducer(notesReducer, []);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prev) => !prev);
  };

  const addNote = (note: INote) => {
    dispatchNotes({ type: 'ADD', note });
  };

  const keyPressed = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setNoteSelector((prev) => ({ ...prev, y: prev.y - 1 }));
        break;
      case 'ArrowLeft':
        setNoteSelector((prev) => ({ ...prev, x: prev.x - 1 }));
        break;
      case 'ArrowDown':
        setNoteSelector((prev) => ({ ...prev, y: prev.y + 1 }));
        break;
      case 'ArrowRight':
        setNoteSelector((prev) => ({ ...prev, x: prev.x + 1 }));
        break;
    }
  };

  const preventScrolling = (e: KeyboardEvent) => {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPressed);
    window.addEventListener('keydown', preventScrolling, false);

    return () => {
      document.removeEventListener('keydown', keyPressed);
      window.removeEventListener('keydown', preventScrolling);
    };
  }, []);

  return (
    <div className='App'>
      <Toolbar
        addNote={addNote}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <SideDrawer show={sideDrawerOpen} />
      <Backdrop
        show={sideDrawerOpen}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <main style={{ marginTop: '100px' }}>
        <Fretboard noteSelectorPosition={{x,y}} tuning={tuning} notes={notes} id={0} />
      </main>
    </div>
  );
};

export default App;
