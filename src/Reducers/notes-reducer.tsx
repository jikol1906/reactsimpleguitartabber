import INote from '../Models/INotes';

type Actions = { type: 'ADD'; note: INote } | { type: 'REMOVE' };

export default (state: INote[], action: Actions): INote[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.note];
    default:
      return state;
  }
};
