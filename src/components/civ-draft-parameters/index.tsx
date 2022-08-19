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

export interface ICivDraftParametersProps {}

export const CivDraftParameters: FC<ICivDraftParametersProps> = (props) => {
  const { allCivs, civPool } = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();

  const handleRemoveAllCivs = (e: MouseEvent<HTMLAnchorElement>) => {
    dispatch(removeAllCivsFromPool());
  };

  const handleAddAllCivs = (e: MouseEvent<HTMLAnchorElement>) => {
    dispatch(addAllCivsToPool());
  };

  const handleInvertPool = (e: MouseEvent<HTMLAnchorElement>) => {
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
      <div className='civ-draft-parameters'>
        <a
          className='button add-all-civs-button'
          onClick={(e) => handleAddAllCivs(e)}
        >
          Add all civs
        </a>
        <a
          className='button reset-pool-button'
          onClick={(e) => handleRemoveAllCivs(e)}
        >
          Reset
        </a>
        <a
          className='button invert-pool-button'
          onClick={(e) => handleInvertPool(e)}
        >
          Invert selection
        </a>
      </div>
    </>
  );
};
