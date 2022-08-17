import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCivs, FetchStatus, selectCivs } from './civs-slice';
import {
  addAllCivs,
  selectCivPool,
} from '../civ-draft-parameters/civ-pool-slice';
import { Civ } from '../civ';

import './civ-draft.scss';
import { ICiv } from '../../api/civs-api';

export interface ICivDraftProps {}

export const CivDraft: FC<ICivDraftProps> = (props) => {
  const { list: civs, status } = useAppSelector(selectCivs);
  const { pool } = useAppSelector(selectCivPool);
  const dispatch = useAppDispatch();

  const isInPool = (civ: ICiv): boolean => {
    return !!pool.find((civInPool) => civInPool.civName === civ.civName);
  };

  useEffect(() => {
    if (status === FetchStatus.INIT) {
      dispatch(fetchCivs()).catch((error) => console.log(error));
    }

    if (status === FetchStatus.FULFILLED) {
      dispatch(addAllCivs);
    }
  }, [status]);

  return (
    <>
      <h2 className='civ-draft-title'>Civ Pool</h2>
      <p className='civ-draft-tip'>
        Click a civ to add or remove it from the selection pool
      </p>
      <div className='civ-draft'>
        {status === FetchStatus.LOADING
          ? 'loading...'
          : civs.map((civ) => (
              <Civ
                key={civ.id}
                civ={civ}
                isDrafted={false}
                isInPool={isInPool(civ)}
              ></Civ>
            ))}
      </div>
    </>
  );
};
