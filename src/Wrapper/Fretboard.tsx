import React from 'react';
import './Fretboard.css';
import Note from '../Note/Note';
import INote from '../Models/INotes';

interface Props {
  id: number;
  tuning: string[];
  notes: INote[];
  noteSelectorPosition?: { x: number; y: number } | null;
}

const Fretboard: React.FC<Props> = ({
  id,
  tuning,
  notes,
  noteSelectorPosition,
}) => {
  return (
    <div>
      <div id={id.toString()} className='wrapper'>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        {tuning.map((t, i) => (
          <Note key={i} x={0} y={i} val={t} />
        ))}
        {notes.map(({ x, y, value }) => (
          <Note key={`${x}${y}`} x={x} y={y} val={value} />
        ))}
        {noteSelectorPosition && (
          <div
            style={{
              transform: `translate(${noteSelectorPosition.x}em,${noteSelectorPosition.y}em)`,
            }}
            className='fretboard__note-selector'
          ></div>
        )}
      </div>
    </div>
  );
};

export default Fretboard;
