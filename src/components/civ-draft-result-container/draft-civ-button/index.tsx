import { FC, MouseEvent } from 'react';

import { ICiv } from '../../../api/civs-api';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectCivs } from '../../../store/civs-slice';
import { draftCiv } from '../../../store/draft-result-slice';
import { FetchStatus } from '../../../store/shared-store-utils';

import './draft-civ-button.scss';

export interface IDraftCivButtonProps {}

export const DraftCivButton: FC<IDraftCivButtonProps> = (props) => {
  const { allCivs, civPool, civsStatus } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const calculateDraftResult = (): ICiv => {
    const pool = civPool.length > 0 ? civPool : allCivs;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  const handleDraftCiv = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (civsStatus === FetchStatus.FULFILLED) {
      const draftResult = calculateDraftResult();
      dispatch(draftCiv(draftResult));
    }
  };

  return (
    <a className='button draft-civ-button' onClick={(e) => handleDraftCiv(e)}>
      Draft Civ
    </a>
  );
};
