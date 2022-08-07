import { FC } from 'react';

import './draft-civ-button.scss';

export interface IDraftCivButtonProps {}

const DraftCivButton: FC<IDraftCivButtonProps> = (props) => {
  return (
    <a className="button draft-civ-button" href="/">
      Draft Civ
    </a>
  );
};

export default DraftCivButton;
