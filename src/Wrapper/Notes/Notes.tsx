import React from 'react';
import INote from '../../Models/INotes';
import Note from '../../Note/Note';

interface Props {
  notes: INote[];
}

export const Notes: React.FC<Props> = React.memo(({ notes }) => (
  <React.Fragment>
    {notes.map(({ x, y, value }) => (
      <Note isStringName={false} key={`${x}${y}`} x={x} y={y} val={value} />
    ))}
  </React.Fragment>
));

