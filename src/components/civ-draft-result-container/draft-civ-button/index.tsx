import { FC, MouseEvent } from 'react';

import { ICiv } from '../../../api/civs-api';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FetchStatus, selectCivs } from '../../../store/civs-slice';
import { draftCiv } from '../../../store/draft-result-slice';

import './draft-civ-button.scss';

export interface IDraftCivButtonProps {}

export const DraftCivButton: FC<IDraftCivButtonProps> = (props) => {
  const { allCivs, civPool, status } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const calculateDraftResult = (): ICiv => {
    const pool = civPool.length > 0 ? civPool : allCivs;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  const handleDraftCiv = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (status === FetchStatus.FULFILLED) {
      const draftResult = calculateDraftResult();
      dispatch(draftCiv(draftResult));
    } else {
      console.log('Please wait for civ draft to load before drafting a civ.');
    }
  };

  return (
    <a className='button draft-civ-button' onClick={(e) => handleDraftCiv(e)}>
      Draft Civ
    </a>
  );
};
