import { FC } from 'react';

import './pick-civ-button.scss';

export interface IPickCivButtonProps {
}

const PickCivButton: FC <IPickCivButtonProps> = props => {
  return (
    <a className='button pick-civ-button' href='/'>
      Select Random Civ
    </a>
  );
}

export default PickCivButton;
