import { FC } from 'react';

import { DraftCivButton } from './draft-civ-button';
import { Civ } from '../civ';
import { useAppSelector } from '../../hooks';
import { selectDraftResult } from './draft-result-slice';

import './civ-draft-result-container.scss';

export interface ICivDraftResultContainerProps {}

export const CivDraftResultContainer: FC<ICivDraftResultContainerProps> = (
  props
) => {
  const { civ } = useAppSelector(selectDraftResult);

  return (
    <div className='civ-draft-result-container'>
      <DraftCivButton />
      {civ ? (
        <Civ civ={civ} isDrafted={true}></Civ>
      ) : (
        <img
          className='undrafted-image'
          src='/assets/images/units-animated/random.apng'
          alt='image of dice'
        />
      )}
    </div>
  );
};
