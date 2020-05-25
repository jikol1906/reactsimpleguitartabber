import React, { useState, useEffect, useMemo, useReducer } from 'react';
import Fretboard from './Wrapper/Fretboard';
import './App.css';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import Note from './Note/Note';

let current = 2;
let wrapperNum = 0;
const capacity = 37;

// #region typeDefs
export interface Note {
  x: number;
  y: number;
  value: string;
}

type Actions = { type: 'ADD'; note: Note } | { type: 'REMOVE' };

// #endregion

const notesReducer = (state: Note[], action: Actions): Note[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.note];
    case 'REMOVE':
      return [...state];
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [tuning, setTuning] = useState(['E', 'A', 'D', 'G', 'B', 'E']);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [notes, dispatchNotes] = useReducer(notesReducer, []);
  const [errorMessage, setErrorMessage] = useState('null');

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prev) => !prev);
  };

  // const newTuning = (t) => {
  //   if (!/^[A-G]{6}$/.test(t.join(''))) {
  //     setErrorMessage('Not a valid tuning');
  //   } else {
  //     setTuning([...t]);
  //   }
  // };

  useEffect(() => {
    if (current >= 35) {
      current = 2;
    }

  
    dispatchNotes({ type: 'ADD', note : {x:2,y:4,value:"2"} });
    dispatchNotes({ type: 'ADD', note : {x:3,y:5,value:"2"} });
    dispatchNotes({ type: 'ADD', note : {x:3,y:2,value:"2"} });

    current += 2;
  }, []);

  const addNote = () => {
    current += 2;
  };
  
  return (
    <div className='App'>
      <Toolbar drawerToggleClickHandler={drawerToggleClickHandler} />
      <SideDrawer show={sideDrawerOpen} />
      <Backdrop show={sideDrawerOpen} drawerToggleClickHandler={drawerToggleClickHandler} />
      <main style={{ marginTop: '100px' }}>
        <Fretboard notes={notes} tuning={tuning} />
      </main>
    </div>
  );
};

export default App;
