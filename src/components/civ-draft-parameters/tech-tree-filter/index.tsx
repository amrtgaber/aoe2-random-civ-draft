import { FC, MouseEvent, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchBuildings,
  selectBuildings,
} from '../../../store/buildings-slice';
import { FetchStatus } from '../../../store/shared-store-utils';
import { fetchTechs, selectTechs } from '../../../store/techs-slice';
import { fetchUnits, selectUnits } from '../../../store/units-slice';
import { Loading } from '../../loading';

import './tech-tree-filter.scss';

export interface ITechTreeFilterProps {}

export const TechTreeFilter: FC<ITechTreeFilterProps> = (props) => {
  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initFilters();
  });

  const initFilters = () => {
    if (unitsStatus === FetchStatus.INIT) {
      dispatch(fetchUnits()).catch((error) => console.log(error));
    }

    if (techsStatus === FetchStatus.INIT) {
      dispatch(fetchTechs()).catch((error) => console.log(error));
    }

    if (buildingsStatus === FetchStatus.INIT) {
      dispatch(fetchBuildings()).catch((error) => console.log(error));
    }
  };

  const isLoading = () =>
    unitsStatus === FetchStatus.LOADING ||
    techsStatus === FetchStatus.LOADING ||
    buildingsStatus === FetchStatus.LOADING;

  return (
    <div className='tech-tree-filter-container'>
      {isLoading() ? (
        <Loading componentName='Tech Tree Filter' />
      ) : (
        <div className='tech-tree-filter'>
          🚧Tech Tree Filter will be rendered here🚧
        </div>
      )}
    </div>
  );
};
