import React from 'react';
import './Fretboard.css';
import Note from '../Note/Note';
import { Note as noteType } from '../App';

interface Props {
  tuning:string[],
  notes:noteType[]
}

const Fretboard : React.FC<Props> = ({tuning,notes}) => {
  return (
    <div>
      <div id='0' className='wrapper'>
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
      </div>
    </div>
  );
}

export default Fretboard;
