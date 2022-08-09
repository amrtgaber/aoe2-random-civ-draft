import { FC } from 'react';
import { ICiv } from '../../../../api/civs-api';

import './civ.scss';

export interface ICivProps {
  civ: ICiv;
}

export const Civ: FC<ICivProps> = (props) => {
  return <div className='civ'>{props.civ.civName}</div>;
};
