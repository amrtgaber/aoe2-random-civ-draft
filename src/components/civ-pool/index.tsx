import { FC, ReactElement, useEffect } from 'react';

import { ICiv } from '../../api/civs/civs-api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isFulfilled,
  isInit,
  isLoading,
} from '../../store/fetch-status-service';
import {
  fetchCivs,
  selectCivs,
  setCivPool,
} from '../../store/slices/civs-slice';
import { Civ, ICivProps } from '../civ';
import { Loading } from '../loading';

import { selectDrafts } from '../../store/slices/drafts-slice';
import './civ-pool.scss';

export const CivPool: FC = () => {
  const { allCivs, civPool, civsStatus } = useAppSelector(selectCivs);
  const { draft } = useAppSelector(selectDrafts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initCivPool();
  }, [civsStatus, draft]);

  const initCivPool = () => {
    if (isInit(civsStatus)) {
      dispatch(fetchCivs());
    }

    if (isFulfilled(civsStatus) && draft) {
      const newCivPool = allCivs.filter((civ) =>
        draft.civs.some(
          (civInDraft: ICiv) => civInDraft.civName === civ.civName,
        ),
      );
      dispatch(setCivPool(newCivPool));
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

  return isLoading(civsStatus) ? (
    <Loading componentName='Civ Pool' />
  ) : (
    <div className='civ-pool'>{renderCivs()}</div>
  );
};
