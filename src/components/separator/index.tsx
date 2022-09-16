import { FC } from 'react';

import './separator.scss';

export interface ISeparatorProps {
  className?: string;
}

export const Separator: FC<ISeparatorProps> = (props) => {
  const { className = '' } = props;

  return <div className={`separator ${className}`}></div>;
};
