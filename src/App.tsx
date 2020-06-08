import React, { useState, useEffect, useMemo, useReducer, useCallback } from 'react';
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
    y: 0,
    fretboardNumber: 0,
  });
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [numOfFretboards, setNumOfFretboard] = useState(2);
  const [notes, dispatchNotes] = useReducer(notesReducer, []);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prev) => !prev);
  };

  const addNote = useCallback((value:string) => {
    
  const removeNote = useCallback(() => {
    dispatchNotes({ type: 'REMOVE', x, y });
  }, [x, y]);

  const clearNotes = useCallback(() => {
    dispatchNotes({type:'CLEAR'});
  },[])

  const addFretBord = useCallback(() => {
    setNumOfFretboard((prev) => prev + 1);
  }, []);

  const removeFretBoard = useCallback(() => {
    setNumOfFretboard((prev) => prev === 1 ? 1: prev - 1);
  }, []);

  useEffect(() => {
    const arrowKeyPressed = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setNoteSelector((prev) => ({
            ...prev,
            y: prev.y === 0 ? 0 : prev.y - 1,
          }));
          break;
        case 'ArrowLeft':
          setNoteSelector((prev) => ({
            ...prev,
            x: prev.x === 1 ? 1 : prev.x - 1,
          }));
          break;
        case 'ArrowDown':
          setNoteSelector((prev) => ({
            ...prev,
            y: prev.y === 5 ? 5 : prev.y + 1,
          }));
          break;
        case 'ArrowRight':
          setNoteSelector((prev) => ({
            ...prev,
            x: prev.x === 36 ? 36 : prev.x + 1,
          }));
          break;
        case 'Backspace':
          removeNote();
          break;
        default:
         if(/[0-9]/.test(e.key)) {
          addNote(e.key)
         }
      }
    };
    const preventScrolling = (e: KeyboardEvent) => {
      // space and arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', arrowKeyPressed);
    window.addEventListener('keydown', preventScrolling, false);
    

    return () => {
      document.removeEventListener('keydown', arrowKeyPressed);
      window.removeEventListener('keydown', preventScrolling);
    };
  }, [addNote, currentFretboard, numOfFretboards, removeNote]);

  const fretboards = useMemo(() => {
    const fretboards: JSX.Element[] = [];

    for (let i = 0; i < numOfFretboards; i++) {
      fretboards.push(
        <Fretboard
          noteSelectorPosition={currentFretboard === i ? { x, y } : null}
          key={i}
          id={i}
          tuning={tuning}
          notes={notes}
        />
      );
    }

    return fretboards;
  }, [numOfFretboards, tuning, notes, x, y,currentFretboard]);

  return (
    <div className='App'>
      <Toolbar
        clearNotes={clearNotes}
        addFretBoard={addFretBord}
        removeFretBoard={removeFretBoard}
        addNote={addNote}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <SideDrawer show={sideDrawerOpen} />
      {sideDrawerOpen && <Backdrop
        drawerToggleClickHandler={drawerToggleClickHandler}
      />}
      <main style={{ marginTop: '100px' }}>
        <Fretboard
          noteSelectorPosition={{ x, y }}
          tuning={tuning}
          notes={notes}
          id={0}
        />
      </main>
    </div>
  );
};

export default App;
