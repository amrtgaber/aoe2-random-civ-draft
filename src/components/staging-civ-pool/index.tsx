import { FC, ReactElement } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addCivsToPool,
  removeCivsFromPool,
  selectCivs,
  setCivPool,
} from '../../store/slices/civs-slice';
import { isLoading } from '../../store/fetch-status-service';
import { selectTechTreeFilter } from '../../store/slices/tech-tree-filter-slice';
import { ICiv } from '../../api/civs/civs-api';
import { Loading } from '../loading';
import { Civ, ICivProps } from '../civ';

import './staging-civ-pool.scss';

export const StagingCivPool: FC = () => {
  const { allCivs, civsStatus } = useAppSelector(selectCivs);
  const { filteredCivPool } = useAppSelector(selectTechTreeFilter);
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

  const renderCivs = (): ReactElement<ICivProps>[] => {
    return allCivs.map((civ) => (
      <Civ
        key={civ.id}
        civ={civ}
        isDrafted={false}
        isDraftable={false}
        isInPool={isInPool(civ)}
      />
    ));
  };

  return (
    <div className='staging-civ-pool-container'>
      <div className='staging-civ-pool-header'>
        <h3 className='staging-civ-pool-title'>Matching civs</h3>
        <div className='staging-civ-pool-stats'>
          <span className='matched-civs-number'>{filteredCivPool.length}</span>{' '}
          civs match your selection
        </div>
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
      </div>
      {isLoading(civsStatus) ? (
        <div className='loading-wrapper'>
          <Loading componentName='Staging Civ Pool' />
        </div>
      ) : (
        <div className='staging-civ-pool'>{renderCivs()}</div>
      )}
    </div>
  );
};
