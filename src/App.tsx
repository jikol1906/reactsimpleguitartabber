import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import Fretboard from './Wrapper/Fretboard';
import './App.css';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import notesReducer from './Reducers/notes-reducer';
import { Modal } from './UI/Modal/Modal';
import noteselectorReducer from './Reducers/noteselector-reducer';
import { useModal } from './UI/Modal/useModal';

const App: React.FC = () => {
  const [tuning, setTuning] = useState(['E', 'A', 'D', 'G', 'B', 'E']);
  const [
    { x, y, currentFretboard, extendDown, extendRight },
    dispatchNoteselector,
  ] = useReducer(noteselectorReducer, {
    x: 1,
    y: 0,
    currentFretboard: 0,
    extendDown: 0,
    extendRight: 0,
  });
  const { modal, closeModal, openModal } = useModal();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [notes, dispatchNotes] = useReducer(notesReducer, [[]]);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prev) => !prev);
  };

  const backDropClickHandler = () => {
    setSideDrawerOpen(false);
    closeModal();
  };
  
  const addNote = useCallback(
    (value: string) => {
      dispatchNotes({
        type: 'ADD_NOTE',
        note: { x, y, value },
        currentFretboard,
      });
    },
    [x, y, currentFretboard]
  );

  const removeNote = useCallback(() => {
    dispatchNotes({
      type: 'REMOVE_NOTE',
      x,
      y,
      currentFretboard,
      extendDown,
      extendRight,
    });
  }, [x, y, currentFretboard, extendDown, extendRight]);

  const clearNotes = useCallback(() => {
    dispatchNotes({ type: 'CLEAR'});
    closeModal();
  }, [closeModal]);

  const clearNotesClickHandler = () => {
    openModal('Delete all notes?', 'This cannnot be undone', [
      { name: 'Yes', handler: clearNotes },
      {
        name: 'No',
        handler: closeModal,
      },
    ]);
  };

  const addFretBord = useCallback(() => {
    dispatchNotes({ type: 'NEW_FRETBOARD' });
  }, []);

  const removeFretBoard = useCallback(() => {

    const noteSelectorIsAtLastFretboard = currentFretboard === notes.length - 1;
    const isOnlyOneFret = notes.length === 1
    
    if(!isOnlyOneFret && noteSelectorIsAtLastFretboard) {
      dispatchNoteselector({type:'MOVE_TO_FRET',fretNumber : notes.length - 2})
    }

    dispatchNotes({ type: 'REMOVE_FRETBOARD' });

    closeModal();
  }, [closeModal]);

  const removeFretboardClickHandler = useCallback(() => {
    if (notes.length !== 1 && notes[notes.length - 1].length > 0) {
      openModal('Delete fretboard?','Fretboard has notes, delete anyway?',[
        { name: 'Yes', handler: removeFretBoard },
        { name: 'No', handler: closeModal },
      ])
    } else {
      removeFretBoard();
    }
  }, [closeModal, notes, openModal, removeFretBoard]);

  useEffect(() => {
    const arrowKeyPressed = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.shiftKey
            ? dispatchNoteselector({ type: 'EXTEND_UP' })
            : dispatchNoteselector({ type: 'MOVE_UP' });
          break;
        case 'ArrowLeft':
          e.shiftKey
            ? dispatchNoteselector({ type: 'EXTEND_LEFT' })
            : dispatchNoteselector({ type: 'MOVE_LEFT' });
          break;
        case 'ArrowDown':
          e.shiftKey
            ? dispatchNoteselector({ type: 'EXTEND_DOWN' })
            : dispatchNoteselector({ type: 'MOVE_DOWN', numOfFretboards : notes.length });
          break;
        case 'ArrowRight':
          e.shiftKey
            ? dispatchNoteselector({ type: 'EXTEND_RIGHT' })
            : dispatchNoteselector({ type: 'MOVE_RIGHT' });
          break;
        case 'Backspace':
          removeNote();
          break;
        case 'Escape':
          dispatchNoteselector({ type: 'CLEAR_EXTEND' });
          break;
        default:
          if (/[0-9]/.test(e.key)) {
            addNote(e.key);
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
  }, [addNote, currentFretboard, removeNote]);

  const fretboards: JSX.Element[] = [];

  for (let i = 0; i < notes.length; i++) {
    fretboards.push(
      <Fretboard
        click={() => dispatchNoteselector({type:'MOVE_TO_FRET',fretNumber:i})}
        noteSelectorPosition={
          currentFretboard === i ? { x, y, extendDown, extendRight } : null
        }
        key={i}
        tuning={tuning}
        notes={notes[i]}
      />
    );
  }

  return (
    <div className='App'>
      <Modal show={modal.show} handlers={modal.handlers}>
        <h2>{modal.header}</h2>
        <p>{modal.content}</p>
      </Modal>
      <Toolbar
        clearNotes={clearNotesClickHandler}
        addFretBoard={addFretBord}
        removeFretBoard={removeFretboardClickHandler}
        addNote={addNote}
        drawerToggleClickHandler={drawerToggleClickHandler}
      />
      <SideDrawer show={sideDrawerOpen} />
      {(sideDrawerOpen || modal.show) && (
        <Backdrop backDropClickhandler={backDropClickHandler} />
      )}
      <main style={{ marginTop: '100px' }}>{fretboards}</main>
    </div>
  );
};

export default App;
