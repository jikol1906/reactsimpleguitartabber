import INote from '../Models/INotes';

type Actions =
  | { type: 'ADD_NOTE'; note: INote; currentFretboard: number }
  | {
      type: 'REMOVE_NOTE';
      x: number;
      y: number;
      currentFretboard: number;
      extendDown: number;
      extendRight: number;
    }
  | { type: 'NEW_FRETBOARD' }
  | { type: 'REMOVE_FRETBOARD' }
  | { type: 'CLEAR' }
  | { type: 'SET', notes: INote[][]};

function removeNoteFromArr(
  state: INote[],
  x: number,
  y: number,
  extendDown: number = 0,
  extendRight: number = 0
): INote[] {
  return state.filter((n) => {
    const isInXRange = n.x >= x && n.x <= x + extendRight;
    const isInYRange = n.y >= y && n.y <= y + extendDown;
    return !(isInXRange && isInYRange);
  });
}

function addNote(state:INote[][], note: INote, currentFretboard:number) {
  return state.map((arr, i) => {
    if (i === currentFretboard) {
      const existingNote = findNote(arr, note); //check if there is already a note at this location
      if (existingNote) {
        const removedExistingNote = removeNoteFromArr(
          arr,
          existingNote.x,
          existingNote.y
        ); //Remove note from state
        const noteCopy = { ...existingNote }; //Copy existing note to not mutate state
        if (noteCopy.value.length < 2) {
          //If length of existing note is only one, append value of newly added note
          noteCopy.value += note.value;
          return [...removedExistingNote, noteCopy];
        }
        return [...removedExistingNote, note];
      }
      return [...arr, note];
    }

    return arr;
  });
}

function findNote(state: INote[], note: INote): INote | undefined {
  return state.find((n) => n.x === note.x && n.y === note.y);
}

export default (state: INote[][], action: Actions): INote[][] => {
  switch (action.type) {
    case 'ADD_NOTE':
      return addNote(state,action.note,action.currentFretboard)
    case 'NEW_FRETBOARD':
      return [...state, []];
    case 'REMOVE_FRETBOARD':
      return state.length > 1 ? state.slice(0, state.length - 1) : state;
    case 'REMOVE_NOTE':
      return state.map((arr, i) =>
        i === action.currentFretboard
          ? removeNoteFromArr(
              arr,
              action.x,
              action.y,
              action.extendDown,
              action.extendRight
            )
          : arr
      );
    case 'CLEAR':
      const numOfFretboards: INote[][] = [];

      for (let i = 0; i < state.length; i++) {
        numOfFretboards.push([]);
      }

      return numOfFretboards;
    case 'SET':
      return action.notes
    default:
      return state;
  }
};
