import { FC } from 'react';
import './pick-civ-container.scss';
import PickCivParameters from './pick-civ-parameters';
import PickCivResultContainer from './pick-civ-result-container';

export interface IPickCivContainerProps {
}

const PickCivContainer: FC <IPickCivContainerProps> = props => {
  return (
    <div className='pick-civ-container'>
      <PickCivResultContainer />
      <PickCivParameters />
    </div>
  );
}

export default PickCivContainer;