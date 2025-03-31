import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks';
import { selectCivs } from '../../store/slices/civs-slice';
import { CivPool } from '../civ-pool';
import { CivPoolButtonBar } from '../civ-pool-button-bar';
import { Draft } from '../draft';
import './civ-pool-container.scss';

export interface ICivPoolContainerProps {}

export const CivPoolContainer: FC<ICivPoolContainerProps> = (props) => {
  const { allCivs, civPool } = useAppSelector(selectCivs);
  const civPoolCount = useMemo(
    () => (civPool.length > 0 ? civPool.length : allCivs.length),
    [civPool],
  );

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
      <div className='civ-pool-container'>
        <Draft />
        <CivPool />
        <CivPoolButtonBar />
      </div>
    </>
  );
};
