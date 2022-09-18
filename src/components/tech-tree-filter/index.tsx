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
import { addTags } from '../tech-tree-filter-tags/tags';
import { TechTreeFilterTags } from '../tech-tree-filter-tags';

export const TechTreeFilter: FC = () => {
  const [selectedItems, setSelectedItems] = useState<ITechTreeItem[]>([]);
  const [combinedFetchStatus, setCombinedFetchStatus] = useState<FetchStatus>(
    FetchStatus.INIT
  );

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
    const allFetchedItems = [...allUnits, ...allTechs, ...allBuildings];
    const taggedItems = allFetchedItems.map((item) => addTags(item));
    dispatch(setShownItems(taggedItems));
  };

  useEffect(() => {
    setSelectedItems(itemsFilter);
  }, [itemsFilter]);

  const hasSelectedItems = selectedItems.length > 0;
  const hasShownItems = shownItems.length > 0;

  return (
    <div className='tech-tree-filter-container'>
      {isLoading(combinedFetchStatus) ? (
        <Loading componentName='Tech Tree Filter' />
      ) : (
        <div className='tech-tree-filter-panels-container'>
          <div className='tech-tree-filter-settings-panel'>
            <TechTreeFilterSearch />
            <TechTreeFilterOptions />
            <TechTreeFilterTags />
          </div>
          <div className='tech-tree-filter-items-panel'>
            <div
              className={`tech-tree-filter-selected-items ${
                !hasSelectedItems ? ' empty-filter' : ''
              }`}
            >
              <>
                {!hasSelectedItems && (
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
                !hasShownItems ? ' empty-filter' : ''
              }`}
            >
              <>
                {!hasShownItems && (
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
