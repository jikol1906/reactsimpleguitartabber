import INote from '../Models/INotes';

type Actions =
  | { type: 'MOVE_DOWN'; numOfFretboards: number }
  | { type: 'MOVE_UP' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' };

interface State {
  x: number;
  y: number;
  currentFretboard: number;
  extendUp: number;
  extendDown: number;
  extendLeft: number;
  extendRight: number;
}

const moveNoteSelectorUp = (state: State): State => {
  if (state.currentFretboard > 0 && state.y === 0) {
    return {
      ...state,
      currentFretboard: state.currentFretboard - 1,
      y: 5,
    };
  }
  return { ...state, y: state.y === 0 ? 0 : state.y - 1 };
};

const moveNoteSelectorDown = (state: State, numOfFretboards: number): State => {
  if (state.currentFretboard < numOfFretboards - 1 && state.y === 5) {
    return {
      ...state,
      currentFretboard: state.currentFretboard + 1,
      y: 0,
    };
  }
  return { ...state, y: state.y === 5 ? 5 : state.y + 1 };
};

const moveNoteSelectorLeft = (state: State): State => ({
  ...state,
  x: state.x === 1 ? 1 : state.x - 1,
});

const moveNoteSelectorRight = (state: State): State => ({
  ...state,
  x: state.x === 36 ? 36 : state.x + 1,
});

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case 'MOVE_DOWN':
      return moveNoteSelectorDown(state, action.numOfFretboards);
    case 'MOVE_UP':
      return moveNoteSelectorUp(state);
    case 'MOVE_LEFT':
      return moveNoteSelectorLeft(state);
    case 'MOVE_RIGHT':
      return moveNoteSelectorRight(state);
    default:
      return state;
  }
};
