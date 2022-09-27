import { AnimationEvent, FC, MouseEvent, useEffect, useRef } from 'react';

import { ICiv } from '../../api/civs/civs-api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCivToPool, removeCivFromPool } from '../../store/slices/civs-slice';
import { selectDraftResult } from '../../store/slices/draft-result-slice';

import './civ.scss';

export interface ICivProps {
  civ: ICiv;
  isDrafted: boolean;
  isDraftable: boolean;
  isInPool: boolean;
}

export const Civ: FC<ICivProps> = (props) => {
  const { civ, isDrafted, isDraftable, isInPool } = props;
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

    if (isDrafted || !isDraftable || el instanceof HTMLImageElement) {
      return;
    }

    if (isInPool) {
      dispatch(removeCivFromPool(civ));
    } else {
      dispatch(addCivToPool(civ));
    }
  };

  const getClassNames = (): string => {
    const classNames = [];

    if (isDrafted) {
      classNames.push('drafted', 'highlight-drafted');
    } else {
      classNames.push('poolable');
    }

    if (isDraftable) {
      classNames.push('draftable');
    }

    if (isInPool) {
      classNames.push('in-pool');
    }

    return classNames.join(' ');
  };

  const unitImageUrl = `/assets/images/units-animated/${name.toLowerCase()}.apng`;
  const techTreeImageUrl = `/assets/images/tech-tree/tech-tree-icons/menu_techtree_${name.toLowerCase()}.png`;

  return (
    <div className={`civ-container ${isDrafted ? 'drafted-container' : ''}`}>
      <div
        ref={civEl}
        className={`civ-main-content ${getClassNames()}`}
        onClick={handleToggleInPool}
        onAnimationEnd={handleAnimationEnd}
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
