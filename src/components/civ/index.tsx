import { AnimationEvent, FC, MouseEvent, useEffect, useRef } from 'react';
import { ICiv } from '../../api/civs-api';

import './civ.scss';

export interface ICivProps {
  civ: ICiv;
  isDrafted: boolean;
}

export const Civ: FC<ICivProps> = (props) => {
  const name = props.civ.civName;
  const imageUrl = `/assets/images/units-animated/${name.toLowerCase()}.apng`;
  const classNames = props.isDrafted ? 'drafted highlight-drafted' : 'poolable';

  const mainContent = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    console.log('animation end event');
    const el = event.target as HTMLDivElement;
    el.classList.remove('highlight-drafted');
  };

  const handleToggleInPool = (event: MouseEvent<HTMLDivElement>) => {
    if (props.isDrafted) return;

    const el = event.target as HTMLDivElement;
    el.classList.toggle('in-pool');
  };

  useEffect(() => {
    if (props.isDrafted && mainContent.current) {
      mainContent.current.classList.add('highlight-drafted');
    }
  }, [props.civ]);

  return (
    <div className='civ-container'>
      <div
        ref={mainContent}
        className={`civ-main-content ${classNames}`}
        onClick={(e) => handleToggleInPool(e)}
        onAnimationEnd={(e) => handleAnimationEnd(e)}
      >
        <a
          className='civ-tech-tree'
          href={`https://aoe2techtree.net/#${name}`}
          target='_blank'
          rel='noreferrer'
        >
          📜
        </a>
        <img className='civ-image' src={imageUrl} alt={`${name} unique unit`} />
        <span className='civ-name'>{name}</span>
      </div>
    </div>
  );
};
