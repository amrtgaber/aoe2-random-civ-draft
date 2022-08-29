import { FC, MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectBuildings } from '../../../store/buildings-slice';
import { selectTechs } from '../../../store/techs-slice';
import { selectUnits } from '../../../store/units-slice';

import './tech-tree-filter.scss';

export interface ITechTreeFilterProps {}

export const TechTreeFilter: FC<ITechTreeFilterProps> = (props) => {
  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const dispatch = useAppDispatch();

  return (
    <div className='tech-tree-filter-container'>
      🚧Tech Tree Filter will be rendered here🚧
    </div>
  );
};
