import { FC, MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addAllCivsToPool,
  removeAllCivsFromPool,
  selectCivs,
  updateCivPool,
} from '../../store/civs-slice';
import { SaveCivPool } from '../save-civ-pool';
import { Separator } from '../separator';

import './civ-draft-parameters.scss';
import { TechTreeFilter } from './tech-tree-filter';

export interface ICivDraftParametersProps {}

export const CivDraftParameters: FC<ICivDraftParametersProps> = (props) => {
  const { allCivs, civPool } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const handleRemoveAllCivs = () => dispatch(removeAllCivsFromPool());
  const handleAddAllCivs = () => dispatch(addAllCivsToPool());
  const handleInvertPool = () => {
    const invertedSelection = allCivs.filter((civ) => !civPool.includes(civ));
    dispatch(updateCivPool(invertedSelection));
  };

  return (
    <>
      <div className='civ-draft-parameters-separator'>
        <Separator />
      </div>
      <h2 className='civ-parameters-title'>Civ Pool Settings</h2>
      <SaveCivPool />
      <div className='civ-draft-parameters civ-pool-buttons'>
        <a
          className='button add-all-civs-button'
          onClick={(e) => handleAddAllCivs()}
        >
          Add all civs
        </a>
        <a
          className='button reset-pool-button'
          onClick={(e) => handleRemoveAllCivs()}
        >
          Reset
        </a>
        <a
          className='button invert-pool-button'
          onClick={(e) => handleInvertPool()}
        >
          Invert selection
        </a>
      </div>
      <TechTreeFilter />
    </>
  );
};
