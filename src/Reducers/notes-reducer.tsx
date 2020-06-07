import INote from '../Models/INotes';

type Actions =
  | { type: 'ADD'; note: INote }
  | { type: 'REMOVE'; x: number; y: number };


export default (state: INote[], action: Actions): INote[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.note];
    case 'REMOVE':
      return state.filter(n => !(n.x === action.x && n.y === action.y));
    default:
      return state;
  }
};
