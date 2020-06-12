import React from 'react';
import './Fretboard.css';
import Note from '../Note/Note';
import INote from '../Models/INotes';
import { Tuning } from './Tuning/Tuning';
import { Notes } from './Notes/Notes';

interface Props {
  tuning: string[];
  notes: INote[];
  noteSelectorPosition: {
    x: number;
    y: number;
    extendDown: number;
    extendRight: number;
  } | null;
}

const Fretboard: React.FC<Props> = ({
  tuning,
  notes,
  noteSelectorPosition,
}) => {
  return (
    <div>
      <div className='wrapper'>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        <div className='string'></div>
        <Tuning tuning={tuning} />
        <Notes notes={notes} />
        {noteSelectorPosition && (
          <div
            style={{
              transform: `translate(${noteSelectorPosition.x}em,${noteSelectorPosition.y}em)`,
              height : noteSelectorPosition.extendDown ? `${noteSelectorPosition.extendDown+1}em` : '1em',
              width : noteSelectorPosition.extendRight ? `${noteSelectorPosition.extendRight+1}em` : '1em'
            }}
            className='fretboard__note-selector'
          ></div>
        )}
      </div>
    </div>
  );
};

export default Fretboard;
