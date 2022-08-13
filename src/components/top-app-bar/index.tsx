import { FC } from 'react';

import './top-app-bar.scss';

export interface ITopAppBarProps {}

export const TopAppBar: FC<ITopAppBarProps> = (props) => {
  return (
    <div className='top-app-bar'>
      <div className='logo-container'>
        <a className='logo' href='/'>
          Age of Empires <span className='numeral'>II</span> Random Civilization
          Draft
        </a>
      </div>
    </div>
  );
};
