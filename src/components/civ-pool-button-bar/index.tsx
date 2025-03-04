import { FC } from 'react';
import { VscSave, VscSaveAs } from 'react-icons/vsc';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { PiShareNetworkFill } from 'react-icons/pi';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addAllCivsToPool,
  removeAllCivsFromPool,
  selectCivs,
  setCivPool,
} from '../../store/slices/civs-slice';
import { resetDraft } from '../../store/slices/draft-result-slice';

import './civ-pool-button-bar.scss';

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
      <button className='like-pool-button'>
        {allCivs.length > 0 ? <HiOutlineHeart /> : <HiHeart />}
      </button>
      <button className='share-pool-button'>
        <PiShareNetworkFill />
      </button>
      <button className='save-new-pool-button'>
        <VscSaveAs /> Save as new
      </button>
      <button className='save-pool-button'>
        <VscSave /> Save
      </button>
    </div>
  );
};
