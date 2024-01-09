import { FC, MouseEvent } from 'react';

import { useAppDispatch } from '../../hooks';
import { setSnackbarMessage } from '../../store/slices/snackbar-slice';

import './save-civ-pool.scss';

export const SaveCivPool: FC = () => {
  const dispatch = useAppDispatch();

  const handleSaveCivPool = (e: MouseEvent<HTMLAnchorElement>) => {
    const url = window.location.href;
    /* istanbul ignore next */
    navigator.clipboard.writeText(url).catch(console.error);

    dispatch(setSnackbarMessage(`url copied to clipboard`));
  };

  return (
    <div className='save-civ-pool-button-container'>
      <a className='save-civ-pool-button' onClick={handleSaveCivPool}>
        Save current draft pool
      </a>
    </div>
  );
};
