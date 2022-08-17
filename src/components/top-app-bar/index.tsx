import { FC } from 'react';

import './top-app-bar.scss';

export interface ITopAppBarProps {}

export const TopAppBar: FC<ITopAppBarProps> = (props) => {
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
      </div>
    </div>
  );
};
