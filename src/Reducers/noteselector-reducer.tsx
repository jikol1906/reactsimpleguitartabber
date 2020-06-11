import INote from '../Models/INotes';

type Actions =
  | { type: 'MOVE_DOWN'; numOfFretboards: number }
  | { type: 'MOVE_UP' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'EXTEND_DOWN' }
  | { type: 'EXTEND_UP' }
  | { type: 'EXTEND_LEFT' }
  | { type: 'EXTEND_RIGHT' }
  | { type: 'CLEAR_EXTEND' };

interface State {
  x: number;
  y: number;
  currentFretboard: number;
  extendDown: number;
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

const extendNoteSelectorDown = (state: State) : State => {
    return { ...state, extendDown: state.extendDown + 1 }
}

const extendNoteSelectorRight = (state: State) : State => {
    return { ...state, extendRight: state.extendRight + 1 }
}



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
    case 'EXTEND_DOWN':
      return extendNoteSelectorDown(state);
    case 'EXTEND_UP':
      return extendNoteSelectorDown(moveNoteSelectorUp(state));
    case 'EXTEND_LEFT':
      return extendNoteSelectorRight(moveNoteSelectorLeft(state))
    case 'EXTEND_RIGHT':
      return extendNoteSelectorRight(state);    
    case 'CLEAR_EXTEND':
      return {
        ...state,
        extendRight: 0,
        extendDown: 0,
      };
    default:
      return state;
  }
};
