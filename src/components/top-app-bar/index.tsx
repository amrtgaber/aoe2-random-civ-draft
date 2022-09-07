import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { FetchStatus } from '../../store/shared-store-utils';
import { fetchVersion, selectVersion } from '../../store/version-slice';

import './top-app-bar.scss';

export interface ITopAppBarProps {}

export const TopAppBar: FC<ITopAppBarProps> = (props) => {
  const { gameVersion, versionStatus } = useAppSelector(selectVersion);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (versionStatus === FetchStatus.INIT) {
      dispatch(fetchVersion()).catch((error) => console.log(error));
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
        {versionStatus === FetchStatus.FULFILLED && (
          <div className='game-version'>Game version: {gameVersion}</div>
        )}
      </div>
    </div>
  );
};
