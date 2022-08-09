import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchCivs, FetchStatus, selectCivs } from './civs-slice';

import './civ-draft.scss';
import { Civ } from './civ';

export interface ICivDraftProps {}

const CivDraft: FC<ICivDraftProps> = (props) => {
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
            <div key={civ.id}>
              <Civ civ={civ}></Civ>
            </div>
          ))}
    </div>
  );
};

export default CivDraft;
