import { FC } from 'react';

import './separator.scss';

export interface ISeparatorProps {}

export const Separator: FC<ISeparatorProps> = (props) => {
  return <div className='separator'></div>;
};
