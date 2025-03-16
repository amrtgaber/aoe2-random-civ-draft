import { ChangeEvent, FC, useState } from 'react';

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

  const [editName, setEditName] = useState(draft?.name || '');
  const [editDescription, setEditDescription] = useState(draft?.desc || '');

  const handleEditName = (element: ChangeEvent<HTMLInputElement>) => {
    const newName = element.target.value;
    if (newName.length < 51) {
      setEditName(newName);
    }
  };

  const handleEditDescription = (element: ChangeEvent<HTMLInputElement>) => {
    const newDescription = element.target.value;
    if (newDescription.length < 127) {
      setEditDescription(newDescription);
    }
  };

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
            <input
              className='draft-name'
              value={editName}
              onChange={handleEditName}
            />
            <input
              className='draft-description'
              value={editDescription}
              onChange={handleEditDescription}
            />
          </div>
        )}
        <CivPool />
        <CivPoolButtonBar />
      </div>
    </>
  );
};
