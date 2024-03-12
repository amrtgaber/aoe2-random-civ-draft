import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchBuildings,
  selectBuildings,
} from '../../store/slices/buildings-slice';
import { fetchTechs, selectTechs } from '../../store/slices/techs-slice';
import { fetchUnits, selectUnits } from '../../store/slices/units-slice';
import { fetchAges, selectAges } from '../../store/slices/ages-slice';
import {
  selectTechTreeFilter,
  setTaggedItems,
} from '../../store/slices/tech-tree-filter-slice';
import {
  FetchStatus,
  isFulfilled,
  isInit,
} from '../../store/fetch-status-service';
import { addTagsToItem } from '../../store/slices/tech-tree-filter-slice/tech-tree-filter-service/tags-service';
import { ITechTreeItem } from '../../api/tech-tree-item-api';

import { Loading } from '../loading';
import { TechTreeFilterSearch } from './tech-tree-filter-search';
import { TechTreeFilterOptions } from './tech-tree-filter-options';
import { TechTreeItem } from './tech-tree-item';
import { MatchingCivs } from './matching-civs';
import { TechTreeFilterTags } from './tech-tree-filter-tags';

import './tech-tree-filter.scss';

export const TechTreeFilter: FC = () => {
  const [selectedItems, setSelectedItems] = useState<ITechTreeItem[]>([]);
  const [allItemsFetchStatus, setAllItemsFetchStatus] = useState<FetchStatus>(
    FetchStatus.INIT
  );

  const { allUnits, unitsStatus } = useAppSelector(selectUnits);
  const { allTechs, techsStatus } = useAppSelector(selectTechs);
  const { allBuildings, buildingsStatus } = useAppSelector(selectBuildings);
  const { agesStatus } = useAppSelector(selectAges);

  const { itemsFilter, shownItems } = useAppSelector(selectTechTreeFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAllTechTreeItems();
  }, [unitsStatus, techsStatus, buildingsStatus, agesStatus]);

  const fetchAllTechTreeItems = () => {
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
      isFulfilled(unitsStatus) &&
      isFulfilled(techsStatus) &&
      isFulfilled(buildingsStatus) &&
      isFulfilled(agesStatus)
    ) {
      setAllItemsFetchStatus(FetchStatus.FULFILLED);
    }
  };

  useEffect(() => {
    if (isFulfilled(allItemsFetchStatus)) {
      initItems();
    }
  }, [allItemsFetchStatus]);

  const initItems = () => {
    const allFetchedItems = [...allUnits, ...allTechs, ...allBuildings];
    const taggedItems = allFetchedItems.map((item) => addTagsToItem(item));
    dispatch(setTaggedItems(taggedItems));
  };

  useEffect(() => {
    setSelectedItems(itemsFilter);
  }, [itemsFilter]);

  const hasSelectedItems = selectedItems.length > 0;
  const hasShownItems = shownItems.length > 0;

  return (
    <div className='tech-tree-filter-container'>
      {!isFulfilled(allItemsFetchStatus) ? (
        <Loading componentName='Tech Tree Filter' />
      ) : (
        <div className='tech-tree-filter-panels-container'>
          <div className='tech-tree-filter-options-panel tech-tree-filter-panel-border'>
            <h3 className='tech-tree-filter-panel-header'>Options</h3>
            <TechTreeFilterSearch />
            <TechTreeFilterOptions />
            <TechTreeFilterTags />
          </div>
          <div className='tech-tree-filter-items-panel tech-tree-filter-panel-border'>
            <h3 className='tech-tree-filter-panel-header'>Tech Tree</h3>
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
          <div className='tech-tree-filter-matching-civs-panel'>
            <h3 className='tech-tree-filter-panel-header'>Matching Civs</h3>
            <MatchingCivs />
          </div>
        </div>
      )}
    </div>
  );
};
