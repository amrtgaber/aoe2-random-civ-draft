import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCivs, selectCivs, updateCivPool } from '../../store/civs-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import { ICiv } from '../../api/civs-api';
import { Civ } from '../civ';
import { Separator } from '../separator';

import './civ-draft.scss';
import { Loading } from '../loading';

export interface ICivDraftProps {}

export const CivDraft: FC<ICivDraftProps> = (props) => {
  const { allCivs, civPool, civsStatus } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const civPoolQueryParams: string[] = searchParams.get('civPool')
    ? searchParams.get('civPool')!.split(',')
    : [];

  useEffect(() => {
    initCivDraft();
  }, [civsStatus]);

  const initCivDraft = () => {
    if (civsStatus === FetchStatus.INIT) {
      /* istanbul ignore next */
      dispatch(fetchCivs()).catch((error) => console.log(error));
    }

    if (civsStatus === FetchStatus.FULFILLED) {
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
    if (civsStatus === FetchStatus.FULFILLED) {
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
          civsStatus === FetchStatus.LOADING ? 'draft-loading' : 'draft-loaded'
        }`}
      >
        {civsStatus === FetchStatus.LOADING ? (
          <Loading componentName='Civ Pool' />
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
