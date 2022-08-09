import { FC } from 'react';

import './top-app-bar.scss';

export interface ITopAppBarProps {}

export const TopAppBar: FC<ITopAppBarProps> = (props) => {
  return (
    <div className='top-app-bar'>
      <a className='logo' href='/'>
        AoE<span className='numeral'>II</span> Random Civ Draft
      </a>
    </div>
  );
};
