import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addAllCivsToPool,
  removeAllCivsFromPool,
  selectCivs,
  setCivPool,
} from '../../store/civs-slice';
import { SaveCivPool } from '../save-civ-pool';

import './civ-draft-parameters.scss';
import { TechTreeFilter } from '../tech-tree-filter';

export interface ICivDraftParametersProps {}

export const CivDraftParameters: FC<ICivDraftParametersProps> = (props) => {
  const { allCivs, civPool } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const handleRemoveAllCivs = () => dispatch(removeAllCivsFromPool());
  const handleAddAllCivs = () => dispatch(addAllCivsToPool());
  const handleInvertPool = () => {
    const invertedSelection = allCivs.filter(
      (civ) => !civPool.some((civInPool) => civInPool.id === civ.id)
    );
    dispatch(setCivPool(invertedSelection));
  };

  return (
    <>
      <h2 className='civ-parameters-title'>Civ Pool Settings</h2>
      <SaveCivPool />
      <div className='civ-draft-parameters civ-pool-buttons'>
        <a className='add-all-civs-button' onClick={handleAddAllCivs}>
          Add all civs
        </a>
        <a className='reset-pool-button' onClick={handleRemoveAllCivs}>
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
