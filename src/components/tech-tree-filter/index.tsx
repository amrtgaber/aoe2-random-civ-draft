import { FC, MouseEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBuildings, selectBuildings } from '../../store/buildings-slice';
import { fetchTechs, selectTechs } from '../../store/techs-slice';
import { fetchUnits, selectUnits } from '../../store/units-slice';
import {
  addBuildingToFilter,
  addTechToFilter,
  addUnitToFilter,
  removeBuildingFromFilter,
  removeTechFromFilter,
  removeUnitFromFilter,
  selectDraftParameters,
} from '../../store/draft-parameters-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import { Loading } from '../loading';
import {
  isBuilding,
  isTech,
  isUnit,
  TechTreeItem,
  TechTreeItemType,
} from '../tech-tree-item';
import { StagingCivPool } from '../staging-civ-pool';

import './tech-tree-filter.scss';

export interface ITechTreeFilterProps {}

export const TechTreeFilter: FC<ITechTreeFilterProps> = (props) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.INIT);

  const [allItems, setAllItems] = useState<TechTreeItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<TechTreeItemType[]>([]);
  const [unselectedItems, setUnselectedItems] = useState<TechTreeItemType[]>(
    []
  );

  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const { unitsFilter, techsFilter, buildingsFilter } = useAppSelector(
    selectDraftParameters
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch();
  }, [unitsStatus, techsStatus, buildingsStatus]);

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
    updateFetchStatus();
  }, [unitsStatus, techsStatus, buildingsStatus]);

  const updateFetchStatus = () => {
    if (
      unitsStatus === FetchStatus.LOADING ||
      techsStatus === FetchStatus.LOADING ||
      buildingsStatus === FetchStatus.LOADING
    ) {
      setFetchStatus(FetchStatus.LOADING);
    }

    if (
      unitsStatus === FetchStatus.FAILED ||
      techsStatus === FetchStatus.FAILED ||
      buildingsStatus === FetchStatus.FAILED
    ) {
      setFetchStatus(FetchStatus.FAILED);
    }

    if (
      unitsStatus === FetchStatus.FULFILLED &&
      techsStatus === FetchStatus.FULFILLED &&
      buildingsStatus === FetchStatus.FULFILLED
    ) {
      setFetchStatus(FetchStatus.FULFILLED);
    }
  };

  useEffect(() => {
    if (fetchStatus === FetchStatus.FULFILLED) {
      initItems();
    }
  }, [fetchStatus]);

  const initItems = () => {
    setAllItems([...allUnits, ...allTechs, ...allBuildings]);
    setSelectedItems([]);
    setUnselectedItems(allItems);
  };

  useEffect(() => {
    setSelectedItems([...unitsFilter, ...techsFilter, ...buildingsFilter]);
  }, [unitsFilter, techsFilter, buildingsFilter]);

  useEffect(() => {
    setUnselectedItems(
      allItems.filter((item) => {
        return !selectedItems.some((selectedItem) => {
          if (isUnit(item) && isUnit(selectedItem))
            return selectedItem.id === item.id;

          if (isTech(item) && isTech(selectedItem))
            return selectedItem.id === item.id;

          if (isBuilding(item) && isBuilding(selectedItem))
            return selectedItem.id === item.id;
        });
      })
    );
  }, [selectedItems]);

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

  const getKey = (item: TechTreeItemType) => {
    if (isUnit(item)) return 1000 + item.id;
    if (isTech(item)) return 2000 + item.id;
    if (isBuilding(item)) return 3000 + item.id;
  };

  return (
    <div className='tech-tree-filter-container'>
      {fetchStatus === FetchStatus.LOADING ? (
        <Loading componentName='Tech Tree Filter' />
      ) : (
        <div className='tech-tree-filter-panels-container'>
          <div className='tech-tree-filter-settings-panel'>
            <div className='tech-tree-filter-search'>search</div>
            <div className='tech-tree-filter-options'>
              options
              <div className='tech-tree-filter-clear'>clear filter</div>
              <div className='tech-tree-filter-mode'>filter mode</div>
              <div className='tech-tree-filter-hide-uniques'>hide uniques</div>
              <div className='tech-tree-filter-sort'>sort</div>
            </div>
            <div className='tech-tree-filter-filter'>filter</div>
          </div>
          <div className='tech-tree-filter-items-panel'>
            <div
              className={`tech-tree-filter-selected-items ${
                selectedItems.length === 0 ? ' empty-filter' : ''
              }`}
            >
              <>
                {selectedItems.length === 0 && (
                  <div className='selected-items-placeholder'>
                    Selected items will show up here
                  </div>
                )}
                {selectedItems.map((item) => (
                  <TechTreeItem
                    key={getKey(item)}
                    item={item}
                    selected={true}
                    addToFilter={addToFilter}
                    removeFromFilter={removeFromFilter}
                  />
                ))}
              </>
            </div>
            <div className='tech-tree-filter-unselected-items'>
              {unselectedItems.map((item) => (
                <TechTreeItem
                  key={getKey(item)}
                  item={item}
                  selected={false}
                  addToFilter={addToFilter}
                  removeFromFilter={removeFromFilter}
                />
              ))}
            </div>
          </div>
          <div className='tech-tree-filter-staging-panel'>
            <StagingCivPool />
          </div>
        </div>
      )}
    </div>
  );
};
