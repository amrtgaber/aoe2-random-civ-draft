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
    <>
      <div className='civ-pool-button-bar civ-pool-buttons'>
        <a className='reset-pool-button' onClick={handleReset}>
          Reset
        </a>
        <a className='add-all-civs-button' onClick={handleAddAllCivs}>
          Add all civs
        </a>
        <a className='invert-pool-button' onClick={handleInvertPool}>
          Invert selection
        </a>
      </div>
    </>
  );
};
