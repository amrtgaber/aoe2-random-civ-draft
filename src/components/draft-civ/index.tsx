import { FC } from 'react';

import { DraftCivButton } from './draft-civ-button';
import { Civ } from '../civ';
import { useAppSelector } from '../../hooks';
import { selectDraftResult } from '../../store/slices/draft-result-slice';

import './draft-civ.scss';

export const DraftCiv: FC = () => {
  const { civ } = useAppSelector(selectDraftResult);

  return (
    <>
      <div className='draft-civ'>
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
