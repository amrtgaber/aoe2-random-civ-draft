import { FC } from 'react';

import './civ-pool-container.scss';
import { CivPool } from '../civ-pool';
import { CivPoolButtonBar } from '../civ-pool-button-bar';
import { useAppSelector } from '../../hooks';
import { selectCivs } from '../../store/slices/civs-slice';
import { selectDrafts } from '../../store/slices/drafts-slice';

export interface ICivPoolContainerProps {}

export const CivPoolContainer: FC<ICivPoolContainerProps> = (props) => {
  const { allCivs, civPool } = useAppSelector(selectCivs);
  const { draft } = useAppSelector(selectDrafts);
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
        {draft && (
          <div className='draft-name-container'>
            <h2 className='draft-name'>{draft?.name}</h2>
            <p className='draft-description'>{draft?.desc}</p>
          </div>
        )}
        <CivPool />
        <CivPoolButtonBar />
      </div>
    </>
  );
};
