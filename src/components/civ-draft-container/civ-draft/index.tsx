import { FC, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getCivs, selectCivs } from './civs-slice';

import './civ-draft.scss';

export interface ICivDraftProps {}

const CivDraft: FC<ICivDraftProps> = (props) => {
  const civs = useAppSelector(selectCivs);
  const dispatch = useAppDispatch();
  const fetch = useEffect(() => {
    dispatch(getCivs);
  });

  return <div className="civ-draft">Civ draft will be rendered here</div>;
};

export default CivDraft;
