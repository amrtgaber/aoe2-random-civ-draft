import { FC } from 'react';

import { useAppSelector } from '../../../hooks';
import { DraftResultStatus, selectDraftResult } from './draft-result-slice';

import './civ-draft-result.scss';

export interface ICivDraftResultProps {}

export const CivDraftResult: FC<ICivDraftResultProps> = (props) => {
  const { civ, status } = useAppSelector(selectDraftResult);

  return (
    <div className='civ-draft-result'>
      {status === DraftResultStatus.INIT
        ? `Click Draft Civ to draft a civ`
        : civ?.civName}
    </div>
  );
};
