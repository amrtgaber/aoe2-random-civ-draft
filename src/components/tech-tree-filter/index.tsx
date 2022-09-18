import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBuildings, selectBuildings } from '../../store/buildings-slice';
import { fetchTechs, selectTechs } from '../../store/techs-slice';
import { fetchUnits, selectUnits } from '../../store/units-slice';
import { fetchAges, selectAges } from '../../store/ages-slice';
import {
  selectTechTreeFilter,
  setShownItems,
} from '../../store/tech-tree-filter-slice';
import {
  FetchStatus,
  isFailed,
  isFulfilled,
  isInit,
  isLoading,
} from '../../store/shared-store-utils';
import { ITechTreeItem } from '../../api/tech-tree-item-api';

import { Loading } from '../loading';
import { TechTreeFilterSearch } from '../tech-tree-filter-search';
import { TechTreeFilterOptions } from '../tech-tree-filter-options';
import { TechTreeItem } from '../tech-tree-item';
import { StagingCivPool } from '../staging-civ-pool';

import './tech-tree-filter.scss';

export const TechTreeFilter: FC = () => {
  const allFilterTags = ['units', 'techs', 'buildings', 'uniques'];

  const [filterTags, setFilterTags] = useState<string[]>([]);

  const [combinedFetchStatus, setCombinedFetchStatus] = useState<FetchStatus>(
    FetchStatus.INIT
  );
  const [selectedItems, setSelectedItems] = useState<ITechTreeItem[]>([]);

  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const { allAges, agesStatus } = useAppSelector(selectAges);
  const { itemsFilter, shownItems } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchFuckingEverything();
  }, [unitsStatus, techsStatus, buildingsStatus, agesStatus]);

  const fetchFuckingEverything = () => {
    if (isInit(unitsStatus)) {
      dispatch(fetchUnits());
    }

    if (isInit(techsStatus)) {
      dispatch(fetchTechs());
    }

    if (isInit(buildingsStatus)) {
      dispatch(fetchBuildings());
    }

    if (isInit(agesStatus)) {
      dispatch(fetchAges());
    }
  };

  useEffect(() => {
    updateFetchStatus();
  }, [unitsStatus, techsStatus, buildingsStatus, agesStatus]);

  const updateFetchStatus = () => {
    if (
      isLoading(unitsStatus) ||
      isLoading(techsStatus) ||
      isLoading(buildingsStatus) ||
      isLoading(agesStatus)
    ) {
      setCombinedFetchStatus(FetchStatus.LOADING);
    }

    if (
      isFailed(unitsStatus) ||
      isFailed(techsStatus) ||
      isFailed(buildingsStatus) ||
      isFailed(agesStatus)
    ) {
      setCombinedFetchStatus(FetchStatus.FAILED);
    }

    if (
      isFulfilled(unitsStatus) &&
      isFulfilled(techsStatus) &&
      isFulfilled(buildingsStatus) &&
      isFulfilled(agesStatus)
    ) {
      setCombinedFetchStatus(FetchStatus.FULFILLED);
    }
  };

  useEffect(() => {
    if (isFulfilled(combinedFetchStatus)) {
      initItems();
    }
  }, [combinedFetchStatus]);

  const initItems = () => {
    dispatch(setShownItems([...allUnits, ...allTechs, ...allBuildings]));
  };

  useEffect(() => {
    setSelectedItems(itemsFilter);
  }, [itemsFilter]);

  // useEffect(() => {
  //   setUnselectedItems(assembleUnselectedItems());
  // }, [selectedItems, searchTerm, filterTags, isHidingUniques, sortMode]);

  // const assembleUnselectedItems = (): ITechTreeItem[] => {
  //   // remove selectedItems
  //   const selectedItemIds = selectedItems.map((item) => item.id);
  //   let items = allItems.filter((item) => {
  //     return !selectedItemIds.includes(item.id);
  //   });

  //   // hide uniques
  //   if (isHidingUniques) {
  //     items = items.filter((item) => !item.isUnique);
  //   }

  //   // sort
  //   if (sortMode === SortBy.ALPHA) {
  //     items.sort((item1, item2) => (item1.itemName > item2.itemName ? 1 : -1));
  //   }

  //   if (sortMode === SortBy.AGE) {
  //     items.sort((item1, item2) => item1.age!.id - item2.age!.id);
  //   }

  //   if (sortMode === SortBy.BUILDING) {
  //     items.sort((item1, item2) => {
  //       let id1 = 0;
  //       let id2 = 0;

  //       if (isBuilding(item1)) {
  //         id1 = item1.id;
  //       } else if (isUnit(item1) || isTech(item1)) {
  //         id1 = item1.buildings[0].id;
  //       }

  //       if (isBuilding(item2)) {
  //         id2 = item2.id;
  //       } else if (isUnit(item2) || isTech(item2)) {
  //         id2 = item2.buildings[0].id;
  //       }

  //       return id1 - id2;
  //     });
  //   }

  //   // filter by tag
  //   if (filterTags.length > 0) {
  //     items = items.filter((item) => {
  //       if (filterTags.includes('units') && isUnit(item)) {
  //         if (filterTags.includes('uniques')) {
  //           return item.isUnique;
  //         }

  //         return true;
  //       }

  //       if (filterTags.includes('techs') && isTech(item)) {
  //         if (filterTags.includes('uniques')) {
  //           return item.isUnique;
  //         }

  //         return true;
  //       }

  //       if (filterTags.includes('buildings') && isBuilding(item)) {
  //         if (filterTags.includes('uniques')) {
  //           return item.isUnique;
  //         }

  //         return true;
  //       }

  //       if (filterTags.includes('uniques') && item.isUnique) {
  //         if (filterTags.includes('units')) return isUnit(item);
  //         if (filterTags.includes('techs')) return isTech(item);
  //         if (filterTags.includes('buildings')) return isBuilding(item);

  //         return true;
  //       }
  //     });
  //   }

  //   return items;
  // };

  const handleFilterByTag = (newTag: string, hasTag: boolean) => {
    if (hasTag) {
      setFilterTags(filterTags.filter((tag) => tag !== newTag));
    } else {
      setFilterTags([...filterTags, newTag]);
    }
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

  return (
    <div className='tech-tree-filter-container'>
      {isLoading(combinedFetchStatus) ? (
        <Loading componentName='Tech Tree Filter' />
      ) : (
        <div className='tech-tree-filter-panels-container'>
          <div className='tech-tree-filter-settings-panel'>
            <TechTreeFilterSearch />
            <TechTreeFilterOptions />
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
                shownItems.length === 0 ? ' empty-filter' : ''
              }`}
            >
              <>
                {shownItems.length === 0 && (
                  <div className='unselected-items-placeholder'>
                    No matching items
                  </div>
                )}
                {shownItems.map((item) => (
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
