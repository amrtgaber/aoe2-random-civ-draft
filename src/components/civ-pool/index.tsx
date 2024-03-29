import { FC, ReactElement, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCivs,
  selectCivs,
  setCivPool,
} from '../../store/slices/civs-slice';
import {
  isFulfilled,
  isInit,
  isLoading,
} from '../../store/fetch-status-service';
import { ICiv } from '../../api/civs/civs-api';
import { Civ, ICivProps } from '../civ';
import { Loading } from '../loading';

import './civ-pool.scss';

export const CivPool: FC = () => {
  const { allCivs, civPool, civsStatus } = useAppSelector(selectCivs);
  const civPoolCount = civPool.length > 0 ? civPool.length : allCivs.length;
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const civPoolQueryParams: string[] = searchParams.get('civPool')
    ? searchParams.get('civPool')!.split(',')
    : [];

  useEffect(() => {
    initCivPool();
  }, [civsStatus]);

  const initCivPool = () => {
    if (isInit(civsStatus)) {
      dispatch(fetchCivs());
    }

    if (isFulfilled(civsStatus)) {
      const newCivPool = allCivs.filter((civ) =>
        civPoolQueryParams.includes(civ.civName)
      );
      dispatch(setCivPool(newCivPool));
    }
  };

  useEffect(() => {
    updateCivPoolQueryParams();
  }, [civPool]);

  const updateCivPoolQueryParams = () => {
    if (isFulfilled(civsStatus)) {
      const newCivPool = civPool.map((civ) => civ.civName);

      newCivPool.length > 0
        ? setSearchParams({ civPool: newCivPool.join(',') }, { replace: true })
        : setSearchParams({});
    }
  };

  const isInPool = (civ: ICiv): boolean => {
    return civPool.some((civInPool) => civInPool.civName === civ.civName);
  };

  const renderCivs = (): ReactElement<ICivProps>[] => {
    return allCivs.map((civ) => (
      <Civ
        key={civ.id}
        civ={civ}
        isDrafted={false}
        isDraftable={true}
        isInPool={isInPool(civ)}
      />
    ));
  };

  return (
    <>
      <h2 className='civ-pool-title'>Draft Pool</h2>
      <p className='civ-pool-tip'>
        Click a civ to add or remove it from the draft pool
      </p>
      <p className='civ-pool-tip'>
        <span className='civ-pool-count'>{civPoolCount}</span> civ
        {civPoolCount !== 1 && 's'} in current draft pool
      </p>
      {isLoading(civsStatus) ? (
        <Loading componentName='Civ Pool' />
      ) : (
        <div className='civ-pool'>{renderCivs()}</div>
      )}
    </>
  );
};
