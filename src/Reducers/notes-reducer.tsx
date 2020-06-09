import INote from '../Models/INotes';

type Actions =
  | { type: 'ADD_NOTE'; note: INote; currentFretboard: number }
  | { type: 'REMOVE_NOTE'; x: number; y: number; currentFretboard: number }
  | { type: 'NEW_FRETBOARD' }
  | { type: 'REMOVE_FRETBOARD' }
  | { type: 'CLEAR'; numOfFretboards: number };

function removeNoteFromArr(state: INote[], x: number, y: number): INote[] {
  return state.filter((n) => !(n.x === x && n.y === y));
}

function findNote(state: INote[], note: INote): INote | undefined {
  return state.find((n) => n.x === note.x && n.y === note.y);
}

export default (state: INote[][], action: Actions): INote[][] => {
  switch (action.type) {
    case 'ADD_NOTE':
      return state.map((arr, i) => {
        if (i === action.currentFretboard) {
          const existingNote = findNote(arr, action.note); //check if there is already a note at this location
          if (existingNote) {
            const removedExistingNote = removeNoteFromArr(arr, existingNote.x, existingNote.y); //Remove note from state
            const noteCopy = {...existingNote} //Copy existing note to not mutate state
            if(noteCopy.value.length < 2) { //If length of existing note is only one, append value of newly added note
              noteCopy.value += action.note.value
              return [...removedExistingNote,noteCopy]
            }
            return [...removedExistingNote,action.note] 
          }
          return [...arr, action.note];
        }

        return arr;
      });
    case 'NEW_FRETBOARD':
      return [...state, []];
    case 'REMOVE_FRETBOARD':
      return state.length > 1 ? state.slice(0, state.length - 1) : state;
    case 'REMOVE_NOTE':
      return state.map((arr, i) =>
        i === action.currentFretboard
          ? removeNoteFromArr(arr, action.x, action.y)
          : arr
      );
    case 'CLEAR':
      const numOfFretboards: INote[][] = [];

      for (let i = 0; i < action.numOfFretboards; i++) {
        numOfFretboards.push([]);
      }

      return numOfFretboards;
    default:
      return state;
  }
};
