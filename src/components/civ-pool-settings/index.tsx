import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addAllCivsToPool,
  removeAllCivsFromPool,
  selectCivs,
  setCivPool,
} from '../../store/slices/civs-slice';
import { SaveCivPool } from '../save-civ-pool';

import './civ-pool-settings.scss';
import { TechTreeFilter } from '../tech-tree-filter';
import { resetDraft } from '../../store/slices/draft-result-slice';

export interface ICivPoolSettingsProps {}

export const CivPoolSettings: FC<ICivPoolSettingsProps> = (props) => {
  const { allCivs, civPool } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const handleAddAllCivs = () => dispatch(addAllCivsToPool());
  const handleReset = () => {
    dispatch(removeAllCivsFromPool());
    dispatch(resetDraft());
  };
  const handleInvertPool = () => {
    const invertedSelection = allCivs.filter(
      (civ) => !civPool.some((civInPool) => civInPool.id === civ.id)
    );
    dispatch(setCivPool(invertedSelection));
  };

  return (
    <>
      <h2 className='civ-pool-settings-title'>Civ Pool Settings</h2>
      <SaveCivPool />
      <div className='civ-pool-settings civ-pool-buttons'>
        <a className='add-all-civs-button' onClick={handleAddAllCivs}>
          Add all civs
        </a>
        <a className='reset-pool-button' onClick={handleReset}>
          Reset
        </a>
        <a className='invert-pool-button' onClick={handleInvertPool}>
          Invert selection
        </a>
      </div>
      <TechTreeFilter />
    </>
  );
};
