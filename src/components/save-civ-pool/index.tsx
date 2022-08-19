import { FC, MouseEvent } from 'react';

import './save-civ-pool.scss';

export interface ISaveCivPoolProps {}

export const SaveCivPool: FC<ISaveCivPoolProps> = (props) => {
  const handleSaveCivPool = (e: MouseEvent<HTMLAnchorElement>) => {
    const url = window.location.href;
    /* istanbul ignore next */
    navigator.clipboard.writeText(url).catch((e) => console.log(e));
  };

  return (
    <div className='save-civ-pool-button-container'>
      <a
        className='button save-civ-pool-button'
        onClick={(e) => handleSaveCivPool(e)}
      >
        Save current civ pool
      </a>
      <p className='save-civ-pool-tip'>
        Clicking save copies the url to the clipboard
      </p>
    </div>
  );
};
