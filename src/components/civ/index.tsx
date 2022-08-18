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

  const civEl = useRef<HTMLDivElement>(null);

  const { draftCount } = useAppSelector(selectDraftResult);
  const dispatch = useAppDispatch();

  useEffect(() => {
    animateDraftResult();
  }, [draftCount]);

  const animateDraftResult = () => {
    if (isDrafted && civEl.current) {
      civEl.current.classList.add('highlight-drafted');
    }
  };

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    const el = event.target as HTMLDivElement;
    el.classList.remove('highlight-drafted');
  };

  const handleToggleInPool = (
    event: MouseEvent<HTMLDivElement | HTMLImageElement>
  ) => {
    const el = event.target as HTMLDivElement | HTMLImageElement;

    if (isDrafted || el instanceof HTMLImageElement) {
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

  const unitImageUrl = `/assets/images/units-animated/${name.toLowerCase()}.apng`;
  const techTreeImageUrl = `/assets/images/game-images/tech-tree-icons/menu_techtree_${name.toLowerCase()}.png`;

  return (
    <div className={`civ-container ${isDrafted ? 'drafted-container' : ''}`}>
      <div
        ref={civEl}
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
          <img src={techTreeImageUrl} alt={`${name} emblem`} />
        </a>
        <img
          className='civ-unit-image'
          src={unitImageUrl}
          alt={`${name} unique unit`}
        />
        <span className='civ-name'>{name}</span>
      </div>
    </div>
  );
};
