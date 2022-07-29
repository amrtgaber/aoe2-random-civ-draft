import { FC } from 'react';

import './pick-civ-result.scss';

export interface IPickCivResultProps {
}

const PickCivResult: FC <IPickCivResultProps> = props => {
  return (
    <div className='pick-civ-result'>
      Civ result will be rendered here
    </div>
  );
}

export default PickCivResult;
