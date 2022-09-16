import { FC, MouseEvent } from 'react';

import './save-civ-pool.scss';

export const SaveCivPool: FC = () => {
  const handleSaveCivPool = (e: MouseEvent<HTMLAnchorElement>) => {
    const url = window.location.href;
    /* istanbul ignore next */
    navigator.clipboard.writeText(url).catch(console.error);
  };

  return (
    <div className='save-civ-pool-button-container'>
      <a className='save-civ-pool-button' onClick={handleSaveCivPool}>
        Save current civ pool
      </a>
      <div className='save-civ-pool-tip'>
        Clicking save copies the url to the clipboard
      </div>
    </div>
  );
};
