import INote from '../Models/INotes';

type Actions =
  | { type: 'ADD'; note: INote }
  | { type: 'REMOVE'; x: number; y: number }
  | { type: 'CLEAR' };

function findNote(state: INote[], note: INote): INote | undefined {
  return state.find((n) => n.x === note.x && n.y === note.y);
}

function removeNote(state: INote[], x: number, y: number): INote[] {
  return state.filter((n) => !(n.x === x && n.y === y));
}

export default (state: INote[], action: Actions): INote[] => {
  switch (action.type) {
    case 'ADD':
      const existingNote = findNote(state, action.note);
      if (existingNote) {
        const noteCopy: INote = { ...existingNote };
        if (noteCopy.value.length >= 2) {
          const updatedState = removeNote(
            state,
            existingNote.x,
            existingNote.y
          );
          return [...updatedState, action.note];
        }
        noteCopy.value += action.note.value;
        return [...state, noteCopy];
      }

      return [...state, action.note];

    case 'REMOVE':
      return removeNote(state, action.x, action.y);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};
