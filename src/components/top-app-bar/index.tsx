import { FC } from 'react';

export interface ITopAppBarProps {
}

const TopAppBar: FC <ITopAppBarProps> = props => {
  return (
    <div className='top-app-bar'>
      <a className='logo' href='/'>
        Aoe2 Pick Civ Randomizer
      </a>
    </div>
  );
}

export default TopAppBar;
