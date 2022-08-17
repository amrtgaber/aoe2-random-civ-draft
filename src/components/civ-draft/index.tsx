import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCivs, FetchStatus, selectCivs } from '../../store/civs-slice';
import { ICiv } from '../../api/civs-api';
import { Civ } from '../civ';

import './civ-draft.scss';

export interface ICivDraftProps {}

export const CivDraft: FC<ICivDraftProps> = (props) => {
  const { allCivs, civPool, status } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const isInPool = (civ: ICiv): boolean => {
    return !!civPool.find((civInPool) => civInPool.civName === civ.civName);
  };

  useEffect(() => {
    if (status === FetchStatus.INIT) {
      dispatch(fetchCivs()).catch((error) => console.log(error));
    }
  }, [status]);

  return (
    <>
      <h2 className='civ-draft-title'>Civ Pool</h2>
      <p className='civ-draft-tip'>
        Click a civ to add or remove it from the civ pool
      </p>
      <div className='civ-draft'>
        {status === FetchStatus.LOADING
          ? 'loading...'
          : allCivs.map((civ) => (
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
