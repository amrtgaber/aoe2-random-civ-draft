import { FC } from 'react';

import './civ-list.scss';

export interface ICivListProps {
}

const CivList: FC <ICivListProps> = props => {
  return (
    <div className='civ-list'>
      Civ list will be rendered here
    </div>
  );
}

export default CivList;
