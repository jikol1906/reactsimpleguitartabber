import INote from '../Models/INotes';

type Actions =
  | { type: 'ADD'; note: INote }
  | { type: 'REMOVE'; x: number; y: number }
  | { type: 'CLEAR'};

function findNote(state: INote[], note: INote): INote | undefined {
  return state.find((n) => n.x === note.x && n.y === note.y);
}

export default (state: INote[], action: Actions): INote[] => {
  switch (action.type) {
    case 'ADD':
      const existingNote = findNote(state,action.note)
      if (existingNote) {
        const noteCopy : INote = {...existingNote}
        if(noteCopy.value.length >= 2) {
          
        }
      }

      return [...state, action.note];

    case 'REMOVE':
      return state.filter(n => !(n.x === action.x && n.y === action.y));
    case 'CLEAR':
      return []
    default:
      return state;
  }
};
