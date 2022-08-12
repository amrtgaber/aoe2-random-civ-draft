import { FC, MouseEvent } from 'react';

import { ICiv } from '../../../api/civs-api';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FetchStatus, selectCivs } from '../../civ-draft/civs-slice';
import { draftCiv } from '../civ-draft-result/draft-result-slice';

import './draft-civ-button.scss';

export interface IDraftCivButtonProps {}

export const DraftCivButton: FC<IDraftCivButtonProps> = (props) => {
  const { list: civs, status } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const calculateDraftResult = (): ICiv => {
    const randomIndex = Math.floor(Math.random() * civs.length);
    return civs[randomIndex];
  };

  const handleDraftCiv = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (status === FetchStatus.FULFILLED) {
      dispatch(draftCiv(calculateDraftResult()));
    } else {
      console.log('Please wait for civ draft to load before drafting a civ.');
    }
  };

  return (
    <a
      className='button draft-civ-button'
      onClick={(e) => handleDraftCiv(e)}
      href='/'
    >
      Draft Civ
    </a>
  );
};
