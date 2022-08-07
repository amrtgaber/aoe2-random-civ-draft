import { FC } from 'react';
import DraftCivButton from './draft-civ-button';
import CivDraftResult from './civ-draft-result';

import './civ-draft-result-container.scss';

export interface ICivDraftResultContainerProps {}

const CivDraftResultContainer: FC<ICivDraftResultContainerProps> = (props) => {
  return (
    <div className="civ-draft-result-container">
      <DraftCivButton />
      <CivDraftResult />
    </div>
  );
};

export default CivDraftResultContainer;
