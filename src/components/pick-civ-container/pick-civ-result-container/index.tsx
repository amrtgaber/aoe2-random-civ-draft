import { FC } from 'react';
import PickCivButton from './pick-civ-button';
import PickCivResult from './pick-civ-result';

import './pick-civ-result-container.scss';

export interface IPickCivResultContainerProps {
}

const PickCivResultContainer: FC <IPickCivResultContainerProps> = props => {
  return (
    <div className='pick-civ-result-container'>
      <PickCivButton />
      <PickCivResult />
    </div>
  );
}

export default PickCivResultContainer;
