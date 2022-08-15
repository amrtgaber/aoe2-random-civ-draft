import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCivs, FetchStatus, selectCivs } from './civs-slice';
import { Civ } from '../civ';

import './civ-draft.scss';

export interface ICivDraftProps {}

export const CivDraft: FC<ICivDraftProps> = (props) => {
  const { list: civs, status } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === FetchStatus.INIT) {
      dispatch(fetchCivs()).catch((error) => console.log(error));
    }
  });

  return (
    <div className='civ-draft'>
      {status === FetchStatus.LOADING
        ? 'loading...'
        : civs.map((civ) => (
            <Civ key={civ.id} civ={civ} isPoolable={true}></Civ>
          ))}
    </div>
  );
};
