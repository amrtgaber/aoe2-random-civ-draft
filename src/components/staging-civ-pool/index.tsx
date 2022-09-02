import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addCivToPool,
  removeCivFromPool,
  selectCivs,
  updateCivPool,
} from '../../store/civs-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import { selectDraftParameters } from '../../store/draft-parameters-slice';
import { ICiv } from '../../api/civs-api';
import { Loading } from '../loading';
import { Civ } from '../civ';

import './staging-civ-pool.scss';

export interface IStagingCivPoolProps {}

export const StagingCivPool: FC<IStagingCivPoolProps> = (props) => {
  const { allCivs, civsStatus } = useAppSelector(selectCivs);
  const { filteredCivPool } = useAppSelector(selectDraftParameters);
  const dispatch = useAppDispatch();

  const handleAddToMainCivPool = () => {
    filteredCivPool.forEach((civ) => {
      dispatch(addCivToPool(civ));
    });
  };

  const handleReplaceMainCivPool = () => {
    dispatch(updateCivPool(filteredCivPool));
  };

  const handleSubtractFromMainCivPool = () => {
    filteredCivPool.forEach((civ) => {
      dispatch(removeCivFromPool(civ));
    });
  };

  const isInPool = (civ: ICiv): boolean => {
    return !!filteredCivPool.find(
      (civInPool) => civInPool.civName === civ.civName
    );
  };

  return (
    <div className='staging-civ-pool-container'>
      <h3 className='staging-civ-pool-title'>Civ pool preview</h3>
      <div className='buttons-container'>
        <a
          className='button add-to-main-civ-pool-button'
          onClick={(e) => handleAddToMainCivPool()}
        >
          Add to pool
        </a>
        <a
          className='button replace-main-civ-pool-button'
          onClick={(e) => handleReplaceMainCivPool()}
        >
          Replace pool
        </a>
        <a
          className='button subtract-from-main-civ-pool-button'
          onClick={(e) => handleSubtractFromMainCivPool()}
        >
          Subtract from pool
        </a>
      </div>
      <div
        className={`staging-civ-pool ${
          civsStatus === FetchStatus.LOADING ? 'draft-loading' : 'draft-loaded'
        }`}
      >
        {civsStatus === FetchStatus.LOADING ? (
          <Loading componentName='Staging Civ Pool' />
        ) : (
          allCivs.map((civ) => (
            <Civ
              key={civ.id}
              civ={civ}
              isDrafted={false}
              isDraftable={false}
              isInPool={isInPool(civ)}
            ></Civ>
          ))
        )}
      </div>
    </div>
  );
};
