import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addAllCivsToPool,
  removeAllCivsFromPool,
  selectCivs,
  setCivPool,
} from '../../store/slices/civs-slice';

import './civ-pool-button-bar.scss';
import { resetDraft } from '../../store/slices/draft-result-slice';

export interface ICivPoolButtonBarProps {}

export const CivPoolButtonBar: FC<ICivPoolButtonBarProps> = (props) => {
  const { allCivs, civPool } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const handleAddAllCivs = () => dispatch(addAllCivsToPool());
  const handleReset = () => {
    dispatch(removeAllCivsFromPool());
    dispatch(resetDraft());
  };
  const handleInvertPool = () => {
    const invertedSelection = allCivs.filter(
      (civ) => !civPool.some((civInPool) => civInPool.id === civ.id),
    );
    dispatch(setCivPool(invertedSelection));
  };

  return (
    <div className='civ-pool-button-bar civ-pool-buttons'>
      <button className='reset-pool-button' onClick={handleReset}>
        Reset
      </button>
      <button className='add-all-civs-button' onClick={handleAddAllCivs}>
        Add all civs
      </button>
      <button className='invert-pool-button' onClick={handleInvertPool}>
        Invert selection
      </button>
      <div className='civ-pool-button-bar-pad' />
      <button className='save-new-pool-button'>Save as new</button>
      <button className='save-pool-button'>Save</button>
      <button className='like-pool-button'>Like</button>
      <button className='share-pool-button'>Share</button>
    </div>
  );
};
