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
import { Separator } from '../separator';

import './civ-draft.scss';

export interface ICivDraftProps {}

export const CivDraft: FC<ICivDraftProps> = (props) => {
  const { allCivs, civPool, status } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const civPoolQueryParams: string[] = searchParams.get('civPool')
    ? searchParams.get('civPool')!.split(',')
    : [];

  useEffect(() => {
    initCivDraft();
  }, [status]);

  const initCivDraft = () => {
    if (status === FetchStatus.INIT) {
      /* istanbul ignore next */
      dispatch(fetchCivs()).catch((error) => console.log(error));
    }

    if (status === FetchStatus.FULFILLED) {
      const newCivPool = allCivs.filter((civ) =>
        civPoolQueryParams.includes(civ.civName)
      );
      dispatch(updateCivPool(newCivPool));
    }
  };

  useEffect(() => {
    updateCivPoolQueryParams();
  }, [civPool]);

  const updateCivPoolQueryParams = () => {
    if (status === FetchStatus.FULFILLED) {
      const newCivPool = civPool.map((civ) => civ.civName);
      setSearchParams({ civPool: newCivPool.join(',') }, { replace: true });
    }
  };

  const isInPool = (civ: ICiv): boolean => {
    return !!civPool.find((civInPool) => civInPool.civName === civ.civName);
  };

  return (
    <>
      <Separator />
      <h2 className='civ-draft-title'>Civ Pool</h2>
      <p className='civ-draft-tip'>
        Click a civ to add or remove it from the civ pool
      </p>
      <div
        className={`civ-draft ${
          status === FetchStatus.LOADING ? 'draft-loading' : 'draft-loaded'
        }`}
      >
        {status === FetchStatus.LOADING ? (
          <>
            <p className='loading-text'>...loading...</p>
            <video className='loading-video' autoPlay loop muted>
              <source
                src='/assets/videos/wonder-collapse/notre-dame-collapse.mp4'
                type='video/mp4'
              />
            </video>
          </>
        ) : (
          allCivs.map((civ) => (
            <Civ
              key={civ.id}
              civ={civ}
              isDrafted={false}
              isInPool={isInPool(civ)}
            ></Civ>
          ))
        )}
      </div>
    </>
  );
};
