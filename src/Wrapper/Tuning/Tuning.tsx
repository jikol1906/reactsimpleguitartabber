import React from 'react';
import Note from '../../Note/Note';

interface Props {
  tuning: string[];
}

export const Tuning: React.FC<Props> = React.memo(({ tuning }) => {
  return (
    <React.Fragment>
      {tuning.map((t, i) => (
        <Note isStringName={true} key={i} x={0} y={i} val={t} />
      ))}
    </React.Fragment>
  );
});
