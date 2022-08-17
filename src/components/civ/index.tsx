import { AnimationEvent, FC, MouseEvent, useEffect, useRef } from 'react';
import { ICiv } from '../../api/civs-api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCivToPool, removeCivFromPool } from '../../store/civs-slice';
import { selectDraftResult } from '../../store/draft-result-slice';

import './civ.scss';

export interface ICivProps {
  civ: ICiv;
  isDrafted: boolean;
  isInPool: boolean;
}

export const Civ: FC<ICivProps> = (props) => {
  const { civ, isDrafted, isInPool } = props;
  const name = civ.civName;
  const imageUrl = `/assets/images/units-animated/${name.toLowerCase()}.apng`;
  const techTreeImageUrl = `/assets/images/game-images/tech-tree-icons/menu_techtree_${name.toLowerCase()}.png`;
  const { draftCount } = useAppSelector(selectDraftResult);

  const dispatch = useAppDispatch();

  const getClassNames = (): string => {
    let classNames = '';

    if (isDrafted) {
      classNames += 'drafted highlight-drafted';
    } else {
      classNames += 'poolable';
    }

    if (isInPool) {
      classNames += ' in-pool';
    }

    return classNames;
  };

  const mainContent = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    const el = event.target as HTMLDivElement;
    el.classList.remove('highlight-drafted');
  };

  const handleToggleInPool = (
    event: MouseEvent<HTMLDivElement | HTMLAnchorElement>
  ) => {
    const el = event.target as HTMLDivElement | HTMLAnchorElement;

    if (isDrafted || el.tagName === 'A') {
      return;
    }

    if (isInPool) {
      el.classList.remove('in-pool');
      dispatch(removeCivFromPool(civ));
    } else {
      el.classList.add('in-pool');
      dispatch(addCivToPool(civ));
    }
  };

  useEffect(() => {
    if (isDrafted && mainContent.current) {
      mainContent.current.classList.add('highlight-drafted');
    }
  }, [draftCount]);

  return (
    <div className='civ-container'>
      <div
        ref={mainContent}
        className={`civ-main-content ${getClassNames()}`}
        onClick={(e) => handleToggleInPool(e)}
        onAnimationEnd={(e) => handleAnimationEnd(e)}
      >
        <a
          className='civ-tech-tree'
          href={`https://aoe2techtree.net/#${name}`}
          target='_blank'
          rel='noreferrer'
        >
          <img src={techTreeImageUrl} alt={`${name} tech tree`} />
        </a>
        <img className='civ-image' src={imageUrl} alt={`${name} unique unit`} />
        <span className='civ-name'>{name}</span>
      </div>
    </div>
  );
};
