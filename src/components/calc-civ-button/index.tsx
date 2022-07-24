import { FC } from 'react';

import './calc-civ-button.scss';

export interface ICalcCivButtonProps {
}

const CalcCivButton: FC <ICalcCivButtonProps> = props => {
  return (
    <div className='calc-civ-button'>
      <a className='button' href='/'>
        Select Random Civ
      </a>
    </div>
  );
}

export default CalcCivButton;
