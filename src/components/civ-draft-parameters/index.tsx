import { FC } from 'react';

import './civ-draft-parameters.scss';

export interface ICivDraftParametersProps {}

const CivDraftParameters: FC<ICivDraftParametersProps> = (props) => {
  return (
    <div className="civ-draft-parameters">
      Civ draft parameters will be rendered here
    </div>
  );
};

export default CivDraftParameters;
