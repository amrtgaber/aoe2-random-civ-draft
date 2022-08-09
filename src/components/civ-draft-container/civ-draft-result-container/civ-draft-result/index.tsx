import { FC } from 'react';

import './civ-draft-result.scss';

export interface ICivDraftResultProps {}

export const CivDraftResult: FC<ICivDraftResultProps> = (props) => {
  return (
    <div className='civ-draft-result'>
      Civ draft result will be rendered here
    </div>
  );
};
