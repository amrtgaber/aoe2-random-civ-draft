import { FC, MouseEvent } from 'react';

import { ICiv } from '../../../api/civs/civs-api';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectCivs } from '../../../store/slices/civs-slice';
import { draftCiv } from '../../../store/slices/draft-result-slice';
import { FetchStatus } from '../../../store/fetch-status-service';

import './draft-civ-button.scss';

export const DraftCivButton: FC = () => {
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
    <a className='draft-civ-button' onClick={handleDraftCiv}>
      Draft Civ
    </a>
  );
};
