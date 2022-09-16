import { FC } from 'react';

import { DraftCivButton } from './draft-civ-button';
import { Civ } from '../civ';
import { useAppSelector } from '../../hooks';
import { selectDraftResult } from '../../store/draft-result-slice';

import './civ-draft-result-container.scss';

export const CivDraftResultContainer: FC = () => {
  const { civ } = useAppSelector(selectDraftResult);

  return (
    <>
      <div className='civ-draft-result-container'>
        <DraftCivButton />
        {civ ? (
          <Civ
            civ={civ}
            isDrafted={true}
            isDraftable={false}
            isInPool={false}
          />
        ) : (
          <img
            className='undrafted-image'
            src='/assets/images/units-animated/random.apng'
            alt='image of dice'
          />
        )}
      </div>
    </>
  );
};
