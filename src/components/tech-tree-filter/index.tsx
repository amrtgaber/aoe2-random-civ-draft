import { FC, MouseEvent, SyntheticEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBuildings, selectBuildings } from '../../store/buildings-slice';
import { fetchTechs, selectTechs } from '../../store/techs-slice';
import { fetchUnits, selectUnits } from '../../store/units-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import { Loading } from '../loading';
import {
  isBuilding,
  isTech,
  isUnit,
  TechTreeItem,
  TechTreeItemType,
} from '../tech-tree-item';

import './tech-tree-filter.scss';
import {
  addBuildingToFilter,
  addTechToFilter,
  addUnitToFilter,
  removeBuildingFromFilter,
  removeTechFromFilter,
  removeUnitFromFilter,
  selectDraftParameters,
  updateBuildingsFilter,
  updateTechsFilter,
  updateUnitsFilter,
} from '../../store/draft-parameters-slice';
import { updateCivPool } from '../../store/civs-slice';

export interface ITechTreeFilterProps {}

export const TechTreeFilter: FC<ITechTreeFilterProps> = (props) => {
  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const { filteredCivPool, unitsFilter, techsFilter, buildingsFilter } =
    useAppSelector(selectDraftParameters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch();
  });

  const fetch = () => {
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

  useEffect(() => {
    dispatch(updateUnitsFilter(unitsFilter));
  }, [unitsFilter]);

  useEffect(() => {
    dispatch(updateTechsFilter(techsFilter));
  }, [techsFilter]);

  useEffect(() => {
    dispatch(updateBuildingsFilter(buildingsFilter));
  }, [buildingsFilter]);

  useEffect(() => {
    dispatch(updateCivPool(filteredCivPool));
  }, [filteredCivPool]);

  const addToFilter = (item: TechTreeItemType) => {
    if (isUnit(item)) {
      dispatch(addUnitToFilter(item));
    }

    if (isTech(item)) {
      dispatch(addTechToFilter(item));
    }

    if (isBuilding(item)) {
      dispatch(addBuildingToFilter(item));
    }
  };

  const removeFromFilter = (item: TechTreeItemType) => {
    if (isUnit(item)) {
      dispatch(removeUnitFromFilter(item));
    }

    if (isTech(item)) {
      dispatch(removeTechFromFilter(item));
    }

    if (isBuilding(item)) {
      dispatch(removeBuildingFromFilter(item));
    }
  };

  const renderSelectedItems = (): JSX.Element => {
    const selectedUnits = unitsFilter.map((unit) => (
      <TechTreeItem
        key={unit.id}
        item={unit}
        selected={true}
        addToFilter={addToFilter}
        removeFromFilter={removeFromFilter}
      />
    ));

    const selectedTechs = techsFilter.map((tech) => (
      <TechTreeItem
        key={tech.id}
        item={tech}
        selected={true}
        addToFilter={addToFilter}
        removeFromFilter={removeFromFilter}
      />
    ));

    const selectedBuildings = buildingsFilter.map((building) => (
      <TechTreeItem
        key={building.id}
        item={building}
        selected={true}
        addToFilter={addToFilter}
        removeFromFilter={removeFromFilter}
      />
    ));

    return (
      <>
        {selectedUnits}
        {selectedTechs}
        {selectedBuildings}
      </>
    );
  };

  const renderUnselectedItems = (): JSX.Element => {
    const unselectedUnits = allUnits
      .filter(
        (unit) => !unitsFilter.some((filterUnit) => filterUnit.id === unit.id)
      )
      .map((unit) => (
        <TechTreeItem
          key={unit.id}
          item={unit}
          selected={false}
          addToFilter={addToFilter}
          removeFromFilter={removeFromFilter}
        />
      ));

    const unselectedTechs = allTechs
      .filter(
        (tech) => !techsFilter.some((filterTech) => filterTech.id === tech.id)
      )
      .map((tech) => (
        <TechTreeItem
          key={tech.id}
          item={tech}
          selected={false}
          addToFilter={addToFilter}
          removeFromFilter={removeFromFilter}
        />
      ));

    const unselectedBuildings = allBuildings
      .filter(
        (building) =>
          !buildingsFilter.some(
            (filterBuilding) => filterBuilding.id === building.id
          )
      )
      .map((building) => (
        <TechTreeItem
          key={building.id}
          item={building}
          selected={false}
          addToFilter={addToFilter}
          removeFromFilter={removeFromFilter}
        />
      ));

    return (
      <>
        {unselectedUnits}
        {unselectedTechs}
        {unselectedBuildings}
      </>
    );
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
        <div className='tech-tree-filter-panels-container'>
          <div className='tech-tree-filter-settings-panel'>
            <div className='tech-tree-filter-search'>search</div>
            <div className='tech-tree-filter-options'>
              options
              <div className='tech-tree-filter-clear'>clear filter</div>
              <div className='tech-tree-filter-mode'>mode</div>
              <div className='tech-tree-filter-hide-uniques'>hide uniques</div>
              <div className='tech-tree-filter-sort'>sort</div>
            </div>
            <div className='tech-tree-filter-filter'>filter</div>
          </div>
          <div className='tech-tree-filter-items-panel'>
            <div className='tech-tree-filter-selected-items'>
              <>
                {unitsFilter.length === 0 &&
                  techsFilter.length === 0 &&
                  buildingsFilter.length === 0 &&
                  `Selected items will show up here`}
                {renderSelectedItems()}
              </>
            </div>
            <div className='tech-tree-filter-unselected-items'>
              {renderUnselectedItems()}
            </div>
          </div>
          <div className='tech-tree-filter-staging-panel'>
            <div>merge with main pool</div>
            Staging civ pool will be rendered here
          </div>
        </div>
      )}
    </div>
  );
};
