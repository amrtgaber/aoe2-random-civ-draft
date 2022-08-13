import { FC, MouseEvent } from 'react';
import { ICiv } from '../../api/civs-api';

import './civ.scss';

export interface ICivProps {
  civ: ICiv;
  isInteractive: boolean;
}

export const Civ: FC<ICivProps> = (props) => {
  const name = props.civ.civName;
  const classNames = `civ-info ${props.isInteractive ? 'interactive' : ''}`;

  const handleToggleInPool = (event: MouseEvent<HTMLDivElement>) => {
    if (!props.isInteractive) return;

    const el = event.target as HTMLDivElement;
    el.classList.toggle('in-pool');
  };

  return (
    <div className='civ-container'>
      <div className={classNames} onClick={(e) => handleToggleInPool(e)}>
        <img className='civ-image' src='' alt='image' />
        <div className='civ-name'>{name}</div>
      </div>
    </div>
  );
};
