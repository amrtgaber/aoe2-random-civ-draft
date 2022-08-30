import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCivs } from '../../store/civs-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import { ICiv } from '../../api/civs-api';
import { Civ } from '../civ';

import './staging-civ-pool.scss';
import { Loading } from '../loading';

export interface IStagingCivPoolProps {}

export const StagingCivPool: FC<IStagingCivPoolProps> = (props) => {
  const { allCivs, civsStatus } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const isInPool = (civ: ICiv): boolean => {
    return false;
    // return !!civPool.find((civInPool) => civInPool.civName === civ.civName);
  };

  return (
    <>
      <h2 className='staging-civ-pool-title'>Staging Civ Pool</h2>
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
              isInPool={isInPool(civ)}
            ></Civ>
          ))
        )}
      </div>
    </>
  );
};
