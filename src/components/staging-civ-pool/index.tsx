import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addCivsToPool,
  removeCivsFromPool,
  selectCivs,
  setCivPool,
} from '../../store/civs-slice';
import { isLoading } from '../../store/shared-store-utils';
import { selectDraftParameters } from '../../store/draft-parameters-slice';
import { ICiv } from '../../api/civs/civs-api';
import { Loading } from '../loading';
import { Civ } from '../civ';

import './staging-civ-pool.scss';

export const StagingCivPool: FC = () => {
  const { allCivs, civsStatus } = useAppSelector(selectCivs);
  const { filteredCivPool } = useAppSelector(selectDraftParameters);
  const dispatch = useAppDispatch();

  const handleAddToMainCivPool = () => {
    dispatch(addCivsToPool(filteredCivPool));
  };

  const handleReplaceMainCivPool = () => {
    dispatch(setCivPool(filteredCivPool));
  };

  const handleSubtractFromMainCivPool = () => {
    dispatch(removeCivsFromPool(filteredCivPool));
  };

  const isInPool = (civ: ICiv): boolean => {
    return filteredCivPool.some((civInPool) => civInPool.id === civ.id);
  };

  return (
    <div className='staging-civ-pool-container'>
      <h3 className='staging-civ-pool-title'>Civ pool preview</h3>
      <div className='buttons-container'>
        <a
          className='add-to-main-civ-pool-button'
          onClick={handleAddToMainCivPool}
        >
          Add to pool
        </a>
        <a
          className='replace-main-civ-pool-button'
          onClick={handleReplaceMainCivPool}
        >
          Replace pool
        </a>
        <a
          className='subtract-from-main-civ-pool-button'
          onClick={handleSubtractFromMainCivPool}
        >
          Subtract from pool
        </a>
      </div>
      <div
        className={`staging-civ-pool ${
          isLoading(civsStatus) ? 'draft-loading' : 'draft-loaded'
        }`}
      >
        {isLoading(civsStatus) ? (
          <Loading componentName='Staging Civ Pool' />
        ) : (
          allCivs.map((civ) => (
            <Civ
              key={civ.id}
              civ={civ}
              isDrafted={false}
              isDraftable={false}
              isInPool={isInPool(civ)}
            />
          ))
        )}
      </div>
    </div>
  );
};
