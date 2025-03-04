import { FC } from 'react';

import './civ-pool-container.scss';
import { CivPool } from '../civ-pool';
import { CivPoolButtonBar } from '../civ-pool-button-bar';
import { useAppSelector } from '../../hooks';
import { selectCivs } from '../../store/slices/civs-slice';

export interface ICivPoolContainerProps {}

export const CivPoolContainer: FC<ICivPoolContainerProps> = (props) => {
  const { allCivs, civPool, civsStatus } = useAppSelector(selectCivs);
  const civPoolCount = civPool.length > 0 ? civPool.length : allCivs.length;

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
        <CivPool />
        <CivPoolButtonBar />
      </div>
    </>
  );
};
