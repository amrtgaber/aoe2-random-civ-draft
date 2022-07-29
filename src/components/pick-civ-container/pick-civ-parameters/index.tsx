import { FC } from 'react';

import './pick-civ-parameters.scss';

export interface IPickCivParametersProps {
}

const PickCivParameters: FC <IPickCivParametersProps> = props => {
  return (
    <div className='pick-civ-parameters'>
      Civ selection parameters will be rendered here
    </div>
  );
}

export default PickCivParameters;
