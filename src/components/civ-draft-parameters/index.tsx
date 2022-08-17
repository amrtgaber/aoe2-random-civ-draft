import { FC } from 'react';

import './civ-draft-parameters.scss';

export interface ICivDraftParametersProps {}

export const CivDraftParameters: FC<ICivDraftParametersProps> = (props) => {
  return (
    <>
      <h2 className='civ-parameters-title'>Civ Pool Settings</h2>
      <div className='civ-draft-parameters'>
        Civ pool settings will be rendered here
      </div>
    </>
  );
};
