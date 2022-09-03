import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBuildings, selectBuildings } from '../../store/buildings-slice';
import { fetchTechs, selectTechs } from '../../store/techs-slice';
import { fetchUnits, selectUnits } from '../../store/units-slice';
import {
  addBuildingToFilter,
  addTechToFilter,
  addUnitToFilter,
  clearFilters,
  FilterMode,
  removeBuildingFromFilter,
  removeTechFromFilter,
  removeUnitFromFilter,
  selectDraftParameters,
  updateFilterMode,
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
  const [searchTerm, setSearchTerm] = useState('');

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.INIT);
  const [allItems, setAllItems] = useState<TechTreeItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<TechTreeItemType[]>([]);
  const [unselectedItems, setUnselectedItems] = useState<TechTreeItemType[]>(
    []
  );

  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const { unitsFilter, techsFilter, buildingsFilter, filterMode } =
    useAppSelector(selectDraftParameters);
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
    let items = allItems.filter((item) => {
      return !selectedItems.some((selectedItem) => {
        if (isUnit(item) && isUnit(selectedItem))
          return selectedItem.id === item.id;

        if (isTech(item) && isTech(selectedItem))
          return selectedItem.id === item.id;

        if (isBuilding(item) && isBuilding(selectedItem))
          return selectedItem.id === item.id;
      });
    });

    if (searchTerm.length > 0) {
      items = items.filter((item) => {
        if (isUnit(item)) return item.unitName.includes(searchTerm);
        if (isTech(item)) return item.techName.includes(searchTerm);
        if (isBuilding(item)) return item.buildingName.includes(searchTerm);
      });
    }

    items.sort((item1, item2) => {
      let item1Name = '';
      let item2Name = '';

      if (isUnit(item1)) item1Name = item1.unitName;
      if (isTech(item1)) item1Name = item1.techName;
      if (isBuilding(item1)) item1Name = item1.buildingName;

      if (isUnit(item2)) item2Name = item2.unitName;
      if (isTech(item2)) item2Name = item2.techName;
      if (isBuilding(item2)) item2Name = item2.buildingName;

      return item1Name > item2Name ? 1 : -1;
    });

    setUnselectedItems(items);
  }, [selectedItems, searchTerm]);

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

  const handleClearFilter = () => {
    dispatch(clearFilters());
  };

  const handleToggleFilterMode = () => {
    dispatch(
      updateFilterMode(
        filterMode === FilterMode.HAS_ALL
          ? FilterMode.HAS_ANY
          : FilterMode.HAS_ALL
      )
    );
  };

  const handleHideUniques = () => {
    // TODO
  };

  const handleFilterByType = () => {
    // TODO
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
            <div className='tech-tree-filter-search'>
              <input
                type='text'
                className='search-input'
                placeholder='search'
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
              />
              <span className='clear-search' onClick={() => setSearchTerm('')}>
                ✖
              </span>
            </div>
            <div className='tech-tree-filter-options'>
              <div className='options-title'>Options</div>
              <div className='tech-tree-filter-mode'>
                Civ has{' '}
                <a
                  className='filter-mode-button'
                  onClick={() => handleToggleFilterMode()}
                >
                  {filterMode === FilterMode.HAS_ALL ? 'ALL' : 'ANY'}
                </a>{' '}
                selected item{filterMode === FilterMode.HAS_ALL ? 's' : ''}
              </div>
              <div className='tech-tree-filter-clear-filter'>
                <a
                  className='clear-filter-button'
                  onClick={() => handleClearFilter()}
                >
                  Clear selected items
                </a>
              </div>
              <div className='tech-tree-filter-hide-uniques'>
                <a
                  className='hide-uniques-button'
                  onClick={() => handleHideUniques()}
                >
                  Hide uniques
                </a>
              </div>
              <div className='tech-tree-filter-sort'>
                <div className='sort-text'>sort</div>
                <select className='sort-dropdown'>
                  <option>a-z</option>
                  <option>by age</option>
                  <option>by building</option>
                </select>
              </div>
            </div>
            <div className='tech-tree-filter-filter-types'>
              <div className='filter-types-title'>Filter items</div>
              <div className='filter-types-buttons'>
                <a
                  className='filter-types-button'
                  onClick={() => handleFilterByType()}
                >
                  units
                </a>
                <a
                  className='filter-types-button'
                  onClick={() => handleFilterByType()}
                >
                  techs
                </a>
                <a
                  className='filter-types-button'
                  onClick={() => handleFilterByType()}
                >
                  buildings
                </a>
                <a
                  className='filter-types-button'
                  onClick={() => handleFilterByType()}
                >
                  dark age
                </a>
                <a
                  className='filter-types-button'
                  onClick={() => handleFilterByType()}
                >
                  feudal age
                </a>
                <a
                  className='filter-types-button'
                  onClick={() => handleFilterByType()}
                >
                  castle age
                </a>
                <a
                  className='filter-types-button'
                  onClick={() => handleFilterByType()}
                >
                  imperial age
                </a>
              </div>
            </div>
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
