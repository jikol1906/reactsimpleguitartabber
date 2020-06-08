import INote from '../Models/INotes';

type Actions =
  | { type: 'ADD'; note: INote; currentFretboard: number }
  | { type: 'REMOVE'; x: number; y: number; currentFretboard: number }
  | { type: 'NEW_FRETBOARD' }
  | { type: 'REMOVE_FRETBOARD' }
  | { type: 'CLEAR'; numOfFretboards: number };

function findNote(state: INote[], note: INote): INote | undefined {
  return state.find((n) => n.x === note.x && n.y === note.y);
}

function removeNote(state: INote[], x: number, y: number): INote[] {
  return state.filter((n) => !(n.x === x && n.y === y));
}

export default (state: INote[][], action: Actions): INote[][] => {
  switch (action.type) {
    case 'ADD':
      return state.map((arr, i) =>
        i === action.currentFretboard ? [...arr, action.note] : arr
      );
    case 'NEW_FRETBOARD':
      return [...state, []];
    case 'REMOVE_FRETBOARD':
      return state.length > 1 ? state.slice(0, state.length - 1) : state;
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
