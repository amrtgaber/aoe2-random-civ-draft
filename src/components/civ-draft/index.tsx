import { FC, ReactElement, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCivs, selectCivs, setCivPool } from '../../store/civs-slice';
import { isFulfilled, isInit, isLoading } from '../../store/shared-store-utils';
import { ICiv } from '../../api/civs/civs-api';
import { Civ, ICivProps } from '../civ';
import { Loading } from '../loading';

import './civ-draft.scss';

export const CivDraft: FC = () => {
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
    if (isInit(civsStatus)) {
      /* istanbul ignore next */
      dispatch(fetchCivs()).catch((error) => console.log(error));
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
      <h2 className='civ-draft-title'>Civ Pool</h2>
      <p className='civ-draft-tip'>
        Click a civ to add or remove it from the civ pool
      </p>
      {isLoading(civsStatus) ? (
        <Loading componentName='Civ Pool' />
      ) : (
        <div className='civ-draft'>{renderCivs()}</div>
      )}
    </>
  );
};
