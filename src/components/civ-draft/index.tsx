import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCivs,
  FetchStatus,
  selectCivs,
  updateCivPool,
} from '../../store/civs-slice';
import { ICiv } from '../../api/civs-api';
import { Civ } from '../civ';

import './civ-draft.scss';
import { Separator } from '../separator';

export interface ICivDraftProps {}

export const CivDraft: FC<ICivDraftProps> = (props) => {
  const { allCivs, civPool, status } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const civPoolFromParams: string[] = searchParams.get('civPool')
    ? searchParams.get('civPool')!.split(',')
    : [];

  const isInPool = (civ: ICiv): boolean => {
    return !!civPool.find((civInPool) => civInPool.civName === civ.civName);
  };

  useEffect(() => {
    if (status === FetchStatus.FULFILLED) {
      const newCivPool = civPool.map((civ) => civ.civName);
      setSearchParams({ civPool: newCivPool.join(',') }, { replace: true });
    }
  }, [civPool]);

  useEffect(() => {
    if (status === FetchStatus.INIT) {
      dispatch(fetchCivs()).catch((error) => console.log(error));
    }

    if (status === FetchStatus.FULFILLED) {
      const newCivPool = allCivs.filter((civ) =>
        civPoolFromParams.includes(civ.civName)
      );
      dispatch(updateCivPool(newCivPool));
    }
  }, [status]);

  return (
    <>
      <Separator />
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
