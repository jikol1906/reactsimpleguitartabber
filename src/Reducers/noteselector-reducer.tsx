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
  | { type: 'CLEAR_EXTEND' }
  | {
      type: 'COPY_NOTES';
      notes: INote[];
      copyPointX: number;
      copyPointY: number;
    }
  | { type: 'MOVE_TO_FRET'; fretNumber: number };

interface State {
  x: number;
  y: number;
  currentFretboard: number;
  extendDown: number;
  extendRight: number;
  copiedNotes: INote[];
  copyPointX: number;
  copyPointY: number;
}

const moveNoteSelectorUp = (state: State): State => {
  if (state.currentFretboard > 0 && state.y === 0) {
    return {
      ...state,
      currentFretboard: state.currentFretboard - 1,
      y: 5-state.extendDown,
    };
  }
  return { ...state, y: state.y === 0 ? 0 : state.y - 1 };
};

const moveNoteSelectorDown = (state: State, numOfFretboards: number): State => {
  if (
    state.currentFretboard < numOfFretboards - 1 &&
    state.y + state.extendDown === 5
  ) {
    return {
      ...state,
      currentFretboard: state.currentFretboard + 1,
      y: 0,
    };
  }
  return { ...state, y: state.y+state.extendDown === 5 ? state.y : state.y + 1 };
};

const moveNoteSelectorLeft = (state: State): State => ({
  ...state,
  x: state.x === 1 ? 1 : state.x - 1,
});

const moveNoteSelectorRight = (state: State): State => ({
  ...state,
  x: state.x + state.extendRight === 36 ? state.x : state.x + 1,
});

const extendNoteSelectorDown = (state: State): State => {
  const canExtendDown = state.y + state.extendDown + 1 <= 5;
  return {
    ...state,
    extendDown: canExtendDown ? state.extendDown + 1 : state.extendDown,
  };
};

const extendNoteSelectorRight = (state: State): State => {
  const canExtendLeft = state.x + state.extendRight + 1 <= 36;
  return {
    ...state,
    extendRight: canExtendLeft ? state.extendRight + 1 : state.extendRight,
  };
};

const moveToFretboard = (state: State, fretNumber: number) => {
  return { ...state, currentFretboard: fretNumber };
};

const copyNotesInRange = (state: State, notes: INote[]) => {
  return {
    ...state,
    copiedNotes: notes.filter(({ x, y }) => {
      const isInXRange = x >= state.x && x <= state.x + state.extendRight;
      const isInYRange = y >= state.y && y <= state.y + state.extendDown;
      return isInXRange && isInYRange;
    }),
  };
};

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
      return extendNoteSelectorRight(moveNoteSelectorLeft(state));
    case 'EXTEND_RIGHT':
      return extendNoteSelectorRight(state);
    case 'MOVE_TO_FRET':
      return moveToFretboard(state, action.fretNumber);
    case 'CLEAR_EXTEND':
      return {
        ...state,
        extendRight: 0,
        extendDown: 0,
      };
    case 'COPY_NOTES':
      return {
        ...copyNotesInRange(state, action.notes),
        copyPointX: action.copyPointX,
        copyPointY: action.copyPointY,
      };
    default:
      return state;
  }
};
