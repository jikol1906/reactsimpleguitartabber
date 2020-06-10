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

const App: React.FC = () => {
  const [tuning, setTuning] = useState(['E', 'A', 'D', 'G', 'B', 'E']);
  const [
    { x, y, currentFretboard, extendUp, extendDown, extendLeft, extendRight },
    setNoteSelector,
  ] = useState({
    x: 1,
    y: 0,
    currentFretboard: 0,
    extendUp: 0,
    extendDown: 0,
    extendLeft: 0,
    extendRight: 0,
  });
  const [modal, setModal] = useState<{
    show: boolean;
    header: string;
    content: string;
    handlers: { name: string; handler: () => any }[];
  }>({
    show: false,
    header: '',
    content: '',
    handlers: [],
  });
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [numOfFretboards, setNumOfFretboard] = useState(1);
  const [notes, dispatchNotes] = useReducer(notesReducer, [[]]);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prev) => !prev);
  };

  const backDropClickHandler = () => {
    setSideDrawerOpen(false);
    setModal((prev) => ({ ...prev, show: false }));
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
    dispatchNotes({ type: 'REMOVE_NOTE', x, y, currentFretboard });
  }, [x, y, currentFretboard]);

  const clearNotes = useCallback(() => {
    dispatchNotes({ type: 'CLEAR', numOfFretboards });
    setModal((prev) => ({
      ...prev,
      show: false,
    }));
  }, [numOfFretboards]);

  const clearNotesClickHandler = () => {
    setModal({
      show: true,
      header: 'Delete all notes?',
      content: 'This cannnot be undone',
      handlers: [
        { name: 'Yes', handler: clearNotes },
        {
          name: 'No',
          handler: () => setModal((prev) => ({ ...prev, show: false })),
        },
      ],
    });
  };

  const addFretBord = useCallback(() => {
    setNumOfFretboard((prev) => prev + 1);
    dispatchNotes({ type: 'NEW_FRETBOARD' });
  }, []);

  const removeFretBoard = useCallback(() => {
    setNumOfFretboard((prev) => (prev === 1 ? 1 : prev - 1));
    dispatchNotes({ type: 'REMOVE_FRETBOARD' });
  }, []);

  useEffect(() => {
    const moveNoteSelectorUp = () => {
      setNoteSelector((prev) => {
        if (currentFretboard > 0 && prev.y === 0) {
          return {
            ...prev,
            currentFretboard: prev.currentFretboard - 1,
            y: 5,
          };
        }
        return { ...prev, y: prev.y === 0 ? 0 : prev.y - 1 };
      });
    };

    const moveNoteSelectorLeft = () => {
      setNoteSelector((prev) => ({
        ...prev,
        x: prev.x === 1 ? 1 : prev.x - 1,
      }));
    };

    const moveNoteSelectorDown = () => {
      setNoteSelector((prev) => {
        if (currentFretboard < numOfFretboards - 1 && prev.y === 5) {
          return {
            ...prev,
            currentFretboard: prev.currentFretboard + 1,
            y: 0,
          };
        }
        return { ...prev, y: prev.y === 5 ? 5 : prev.y + 1 };
      });
    };

    const moveNoteSelectorRight = () => {
      setNoteSelector((prev) => ({
        ...prev,
        x: prev.x === 36 ? 36 : prev.x + 1,
      }));
    };

    const arrowKeyPressed = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          moveNoteSelectorUp();
          break;
        case 'ArrowLeft':
          moveNoteSelectorLeft();
          break;
        case 'ArrowDown':
          moveNoteSelectorDown();
          break;
        case 'ArrowRight':
          moveNoteSelectorRight();
          break;
        case 'Backspace':
          removeNote();
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
  }, [addNote, currentFretboard, numOfFretboards, removeNote]);

  const fretboards: JSX.Element[] = [];

  for (let i = 0; i < numOfFretboards; i++) {
    fretboards.push(
      <Fretboard
        noteSelectorPosition={currentFretboard === i ? { x, y } : null}
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
        removeFretBoard={removeFretBoard}
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
