import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { isFulfilled, isInit } from '../../store/fetch-status-service';
import { fetchVersion, selectVersion } from '../../store/slices/version-slice';

import './top-app-bar.scss';

export const TopAppBar: FC = () => {
  const { gameVersion, versionStatus } = useAppSelector(selectVersion);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isInit(versionStatus)) {
      dispatch(fetchVersion());
    }
  }, [versionStatus]);

  return (
    <div className='top-app-bar'>
      <div className='logo-container'>
        <a
          className='logo'
          href='https://www.ageofempires.com/games/aoeiide'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/assets/images/game-images/aoe_logo.png' alt='aoe 2 logo' />
        </a>
        <div className='app-title'>Random Civilization Draft</div>
        {isFulfilled(versionStatus) && (
          <div className='game-version'>Game version: {gameVersion}</div>
        )}
      </div>
    </div>
  );
};
