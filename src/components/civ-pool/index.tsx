import { FC, ReactElement, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

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
import { draftGet, selectDrafts } from '../../store/slices/drafts-slice';

export const CivPool: FC = () => {
  const { allCivs, civPool, civsStatus } = useAppSelector(selectCivs);
  const { draft } = useAppSelector(selectDrafts);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const draftId: string = searchParams.get('d') ?? '';

  useEffect(() => {
    initCivPool();
  }, [civsStatus, draft]);

  const initCivPool = () => {
    if (isInit(civsStatus)) {
      dispatch(fetchCivs());
    }

    if (draftId && !draft) {
      dispatch(draftGet(draftId));
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
