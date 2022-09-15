import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBuildings, selectBuildings } from '../../store/buildings-slice';
import { fetchTechs, selectTechs } from '../../store/techs-slice';
import { fetchUnits, selectUnits } from '../../store/units-slice';
import { fetchAges, selectAges } from '../../store/ages-slice';
import {
  clearFilter,
  FilterMode,
  selectDraftParameters,
  updateFilterMode,
} from '../../store/draft-parameters-slice';
import { FetchStatus } from '../../store/shared-store-utils';
import {
  isBuilding,
  isTech,
  isUnit,
  ITechTreeItem,
} from '../../api/tech-tree-item-api';
import { Loading } from '../loading';
import { TechTreeItem } from '../tech-tree-item';
import { StagingCivPool } from '../staging-civ-pool';

import './tech-tree-filter.scss';

enum SortBy {
  ALPHA = 'SORT_BY_ALPHA',
  AGE = 'SORT_BY_AGE',
  BUILDING = 'SORT_BY_BUILDING',
}

export interface ITechTreeFilterProps {}

export const TechTreeFilter: FC<ITechTreeFilterProps> = (props) => {
  const allFilterTags = ['units', 'techs', 'buildings', 'uniques'];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [isHidingUniques, setIsHidingUniques] = useState(true);
  const [sortMode, setSortMode] = useState(SortBy.ALPHA);

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.INIT);
  const [allItems, setAllItems] = useState<ITechTreeItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ITechTreeItem[]>([]);
  const [unselectedItems, setUnselectedItems] = useState<ITechTreeItem[]>([]);

  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const { allAges, agesStatus } = useAppSelector(selectAges);
  const { itemsFilter, filterMode } = useAppSelector(selectDraftParameters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch();
  }, [unitsStatus, techsStatus, buildingsStatus, agesStatus]);

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

    if (agesStatus === FetchStatus.INIT) {
      dispatch(fetchAges()).catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    updateFetchStatus();
  }, [unitsStatus, techsStatus, buildingsStatus, agesStatus]);

  const updateFetchStatus = () => {
    if (
      unitsStatus === FetchStatus.LOADING ||
      techsStatus === FetchStatus.LOADING ||
      buildingsStatus === FetchStatus.LOADING ||
      agesStatus === FetchStatus.LOADING
    ) {
      setFetchStatus(FetchStatus.LOADING);
    }

    if (
      unitsStatus === FetchStatus.FAILED ||
      techsStatus === FetchStatus.FAILED ||
      buildingsStatus === FetchStatus.FAILED ||
      agesStatus === FetchStatus.FAILED
    ) {
      setFetchStatus(FetchStatus.FAILED);
    }

    if (
      unitsStatus === FetchStatus.FULFILLED &&
      techsStatus === FetchStatus.FULFILLED &&
      buildingsStatus === FetchStatus.FULFILLED &&
      agesStatus === FetchStatus.FULFILLED
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
    setSelectedItems(itemsFilter);
  }, [itemsFilter]);

  useEffect(() => {
    setUnselectedItems(assembleUnselectedItemsList());
  }, [selectedItems, searchTerm, filterTags, isHidingUniques, sortMode]);

  const assembleUnselectedItemsList = (): ITechTreeItem[] => {
    // remove selectedItems
    let items = allItems.filter((item) => {
      return !selectedItems.some((selectedItem) => selectedItem.id === item.id);
    });

    // hide uniques
    if (isHidingUniques) {
      items = items.filter((item) => !item.isUnique);
    }

    // match search term
    if (searchTerm.length > 0) {
      items = items.filter((item) => item.itemName.includes(searchTerm));
    }

    // sort
    if (sortMode === SortBy.ALPHA) {
      items.sort((item1, item2) => (item1.itemName > item2.itemName ? 1 : -1));
    }

    if (sortMode === SortBy.AGE) {
      items.sort((item1, item2) => item1.age!.id - item2.age!.id);
    }

    if (sortMode === SortBy.BUILDING) {
      items.sort((item1, item2) => {
        let id1 = 0;
        let id2 = 0;

        if (isBuilding(item1)) {
          id1 = item1.id;
        } else if (isUnit(item1) || isTech(item1)) {
          id1 = item1.buildings[0].id;
        }

        if (isBuilding(item2)) {
          id2 = item2.id;
        } else if (isUnit(item2) || isTech(item2)) {
          id2 = item2.buildings[0].id;
        }

        return id1 - id2;
      });
    }

    // filter by tag
    if (filterTags.length > 0) {
      items = items.filter((item) => {
        if (filterTags.includes('units') && isUnit(item)) {
          if (filterTags.includes('uniques')) {
            return item.isUnique;
          }

          return true;
        }

        if (filterTags.includes('techs') && isTech(item)) {
          if (filterTags.includes('uniques')) {
            return item.isUnique;
          }

          return true;
        }

        if (filterTags.includes('buildings') && isBuilding(item)) {
          if (filterTags.includes('uniques')) {
            return item.isUnique;
          }

          return true;
        }

        if (filterTags.includes('uniques') && item.isUnique) {
          if (filterTags.includes('units')) return isUnit(item);
          if (filterTags.includes('techs')) return isTech(item);
          if (filterTags.includes('buildings')) return isBuilding(item);

          return true;
        }
      });
    }

    return items;
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
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
    setIsHidingUniques(!isHidingUniques);
  };

  const handleFilterByTag = (newTag: string, hasTag: boolean) => {
    if (hasTag) {
      setFilterTags(filterTags.filter((tag) => tag !== newTag));
    } else {
      setFilterTags([...filterTags, newTag]);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderFilterTagsButtons = () => {
    return allFilterTags.map((tag) => {
      const isOn = filterTags.includes(tag);

      return (
        <a
          key={tag}
          className={`filter-tags-button ${isOn ? 'filter-tag-on' : ''}`}
          onClick={() => handleFilterByTag(tag, isOn)}
        >
          {tag}
        </a>
      );
    });
  };

  const handleChangeSortMode = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortMode(e.target.value as SortBy);
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
                  {isHidingUniques ? 'Show uniques' : 'Hide uniques'}
                </a>
              </div>
              <div className='tech-tree-filter-sort'>
                <div className='sort-text'>sort</div>
                <select
                  value={sortMode}
                  onChange={(e) => handleChangeSortMode(e)}
                  className='sort-dropdown'
                >
                  <option value={SortBy.ALPHA}>a-z</option>
                  <option value={SortBy.AGE}>by age</option>
                  <option value={SortBy.BUILDING}>by building</option>
                </select>
              </div>
            </div>
            <div className='tech-tree-filter-filter-tags'>
              <div className='filter-tags-title'>Filter items</div>
              <div className='filter-tags-buttons'>
                {renderFilterTagsButtons()}
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
                  <TechTreeItem key={item.id} item={item} selected={true} />
                ))}
              </>
            </div>
            <div
              className={`tech-tree-filter-unselected-items ${
                unselectedItems.length === 0 ? ' empty-filter' : ''
              }`}
            >
              <>
                {unselectedItems.length === 0 && (
                  <div className='unselected-items-placeholder'>
                    No matching items
                  </div>
                )}
                {unselectedItems.map((item) => (
                  <TechTreeItem key={item.id} item={item} selected={false} />
                ))}
              </>
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
