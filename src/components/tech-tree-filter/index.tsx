import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBuildings, selectBuildings } from '../../store/buildings-slice';
import { fetchTechs, selectTechs } from '../../store/techs-slice';
import { fetchUnits, selectUnits } from '../../store/units-slice';
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

export interface ITechTreeFilterProps {}

export const TechTreeFilter: FC<ITechTreeFilterProps> = (props) => {
  const allFilterTags = ['units', 'techs', 'buildings']; // 'dark age', 'feudal age', 'castle age', 'imperial age', & buildings

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.INIT);
  const [allItems, setAllItems] = useState<ITechTreeItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ITechTreeItem[]>([]);
  const [unselectedItems, setUnselectedItems] = useState<ITechTreeItem[]>([]);

  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const { itemsFilter, filterMode } = useAppSelector(selectDraftParameters);
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
    setSelectedItems(itemsFilter);
  }, [itemsFilter]);

  useEffect(() => {
    setUnselectedItems(filterUnselectedItems());
  }, [selectedItems, searchTerm, filterTags]);

  const filterUnselectedItems = (): ITechTreeItem[] => {
    // remove selectedItems
    let items = allItems.filter((item) => {
      return !selectedItems.some((selectedItem) => selectedItem.id === item.id);
    });

    // match search term
    if (searchTerm.length > 0) {
      items = items.filter((item) => item.itemName.includes(searchTerm));
    }

    // sort
    items.sort((item1, item2) => (item1.itemName > item2.itemName ? 1 : -1));

    // filter by tag
    if (filterTags.length > 0) {
      items = items.filter((item) => {
        if (filterTags.includes('units') && isUnit(item)) {
          return true;
        }

        if (filterTags.includes('techs') && isTech(item)) {
          return true;
        }

        if (filterTags.includes('buildings') && isBuilding(item)) {
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
    // TODO
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

  const getKey = (item: ITechTreeItem) => {
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
                  <TechTreeItem
                    key={getKey(item)}
                    item={item}
                    selected={true}
                  />
                ))}
              </>
            </div>
            <div className='tech-tree-filter-unselected-items'>
              {unselectedItems.map((item) => (
                <TechTreeItem key={getKey(item)} item={item} selected={false} />
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
