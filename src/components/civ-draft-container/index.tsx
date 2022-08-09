import { FC } from 'react';

import { CivDraft } from './civ-draft';
import { CivDraftResultContainer } from './civ-draft-result-container';

import './civ-draft-container.scss';

export interface ICivDraftContainerProps {}

export const CivDraftContainer: FC<ICivDraftContainerProps> = (props) => {
  return (
    <div className='civ-draft-container'>
      <CivDraftResultContainer />
      <CivDraft />
    </div>
  );
};
