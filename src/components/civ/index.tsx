import { FC, MouseEvent } from 'react';
import { ICiv } from '../../api/civs-api';

import './civ.scss';

export interface ICivProps {
  civ: ICiv;
  isPoolable: boolean;
}

export const Civ: FC<ICivProps> = (props) => {
  const name = props.civ.civName;
  const classNames = `civ-info ${props.isPoolable ? 'poolable' : 'drafted'}`;
  const animated = true;
  const imageUrl = animated
    ? `/assets/images/units-animated/${name.toLowerCase()}.apng`
    : `/assets/images/civ-emblems/${name.toLowerCase()}.png`;

  const handleToggleInPool = (event: MouseEvent<HTMLDivElement>) => {
    if (!props.isPoolable) return;

    const el = event.target as HTMLDivElement;
    el.classList.toggle('in-pool');
  };

  return (
    <div className='civ-container'>
      <div className={classNames} onClick={(e) => handleToggleInPool(e)}>
        <a
          className='civ-tech-tree'
          href={`https://aoe2techtree.net/#${name}`}
          target='_blank'
          rel='noreferrer'
        >
          ?
        </a>
        <img className='civ-image' src={imageUrl} alt={`${name} unique unit`} />
        <span className='civ-name'>{name}</span>
      </div>
    </div>
  );
};
