import { configureStore } from '@reduxjs/toolkit';

import { ICiv } from '../../api/civs/civs-api';
import { IUnit } from '../../api/units/units-api';
import { ITech } from '../../api/techs/techs-api';
import { IBuilding } from '../../api/buildings/buildings-api';

import techTreeFilterReducer, {
  addItemToFilter,
  clearFilter,
  FilterMode,
  initialState,
  removeItemFromFilter,
  setFilterMode,
  setItemsFilter,
  TechTreeFilterState,
} from '.';
import { TechTreeItemType } from '../../api/tech-tree-item-api';
import {
  TEST_BUILDINGS,
  TEST_CIVS,
  TEST_TECHS,
  TEST_UNITS,
} from '../../test/shared-test-data';

const store = configureStore({
  reducer: techTreeFilterReducer,
});

describe('draftParameters reducer', () => {
  it('should handle initial load', () => {
    expect(
      techTreeFilterReducer(undefined, { type: 'unkown' })
    ).toEqual<TechTreeFilterState>(initialState);
  });

  // describe('draftParameter units filter', () => {
  //   it('should add unit to filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       addItemToFilter(TEST_UNITS[0])
  //     );

  //     expect(endState.itemsFilter.length).toBe(1);
  //     expect(endState.filteredCivPool.length).toBe(1);
  //     expect(endState.filteredCivPool[0].id).toBe(1);
  //   });

  //   it('should remove unit from filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [TEST_UNITS[0]],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       removeItemFromFilter(TEST_UNITS[0])
  //     );

  //     expect(endState.itemsFilter.length).toBe(0);
  //     expect(endState.filteredCivPool.length).toBe(0);
  //   });

  //   it('should update units filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       setItemsFilter(TEST_UNITS)
  //     );

  //     expect(endState.itemsFilter.length).toBe(2);
  //     expect(endState.filteredCivPool.length).toBe(3);
  //   });

  //   it('should clear units filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: TEST_UNITS,
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(startState, clearFilter());

  //     expect(endState.itemsFilter.length).toBe(0);
  //     expect(endState.filteredCivPool.length).toBe(0);
  //   });
  // });

  // describe('draftParameter techs filter', () => {
  //   it('should add tech to filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       addItemToFilter(TEST_TECHS[0])
  //     );

  //     expect(endState.itemsFilter.length).toBe(1);
  //     expect(endState.filteredCivPool.length).toBe(1);
  //   });

  //   it('should remove tech from filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [TEST_TECHS[0]],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       removeItemFromFilter(TEST_TECHS[0])
  //     );

  //     expect(endState.itemsFilter.length).toBe(0);
  //     expect(endState.filteredCivPool.length).toBe(1);
  //   });

  //   it('should update techs filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       setItemsFilter(TEST_TECHS)
  //     );

  //     expect(endState.itemsFilter.length).toBe(3);
  //     expect(endState.filteredCivPool.length).toBe(1);
  //     expect(endState.filteredCivPool[0].id).toBe(1);
  //   });

  //   it('should clear techs filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: TEST_TECHS,
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(startState, clearFilter());

  //     expect(endState.itemsFilter.length).toBe(0);
  //     expect(endState.filteredCivPool.length).toBe(0);
  //   });
  // });

  // describe('draftParameter buildings filter', () => {
  //   it('should add building to filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       addItemToFilter(TEST_BUILDINGS[0])
  //     );

  //     expect(endState.filteredCivPool.length).toBe(1);
  //     expect(endState.filteredCivPool[0].id).toBe(1);
  //   });

  //   it('should remove building from filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       removeItemFromFilter(TEST_BUILDINGS[0])
  //     );

  //     expect(endState.filteredCivPool.length).toBe(0);
  //   });

  //   it('should update buildings filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: [],
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(
  //       startState,
  //       setItemsFilter(TEST_BUILDINGS)
  //     );

  //     expect(endState.itemsFilter.length).toBe(3);
  //     expect(endState.filteredCivPool.length).toBe(1);
  //     expect(endState.filteredCivPool[0].id).toBe(1);
  //   });

  //   it('should clear buildings filter', () => {
  //     const startState: TechTreeFilterState = {
  //       filteredCivPool: [],
  //       itemsFilter: TEST_BUILDINGS,
  //       filterMode: FilterMode.HAS_ALL,
  //       searchTerm: '',
  //     };

  //     const endState = techTreeFilterReducer(startState, clearFilter());

  //     expect(endState.itemsFilter.length).toBe(0);
  //     expect(endState.filteredCivPool.length).toBe(0);
  //   });
  // });

  // describe('filter civs', () => {
  //   describe('has all filter mode', () => {
  //     it('should filter all tech tree types', () => {
  //       const startState: TechTreeFilterState = {
  //         filteredCivPool: [],
  //         itemsFilter: [TEST_UNITS[0], TEST_TECHS[0], TEST_BUILDINGS[0]],
  //         filterMode: FilterMode.HAS_ALL,
  //         searchTerm: '',
  //       };

  //       const endState = techTreeFilterReducer(
  //         startState,
  //         setFilterMode(FilterMode.HAS_ALL)
  //       );

  //       expect(endState.filteredCivPool.length).toBe(3);
  //       expect(endState.filteredCivPool).toEqual(TEST_CIVS);
  //     });

  //     it('should have all civs in civ pool', () => {
  //       const units = [
  //         {
  //           id: 1,
  //           itemName: 'archer',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'knight',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //       ];

  //       const techs = [
  //         {
  //           id: 1,
  //           itemName: 'forging',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'loom',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //       ];

  //       const buildings = [
  //         {
  //           id: 1,
  //           itemName: 'castle',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'house',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //       ];

  //       const startState: TechTreeFilterState = {
  //         filteredCivPool: [],
  //         itemsFilter: units,
  //         filterMode: FilterMode.HAS_ALL,
  //         searchTerm: '',
  //       };

  //       const endState = techTreeFilterReducer(
  //         startState,
  //         setFilterMode(FilterMode.HAS_ALL)
  //       );

  //       expect(endState.filteredCivPool.length).toBe(3);
  //       expect(endState.filteredCivPool).toEqual(TEST_CIVS);
  //     });

  //     it('should have no civs in civ pool', () => {
  //       const units = [
  //         {
  //           id: 1,
  //           itemName: 'archer',
  //           civs: [TEST_CIVS[0]],
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'knight',
  //           civs: [TEST_CIVS[0]],
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //       ];

  //       const techs = [
  //         {
  //           id: 1,
  //           itemName: 'forging',
  //           civs: [TEST_CIVS[1]],
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'loom',
  //           civs: [TEST_CIVS[1]],
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //       ];

  //       const buildings = [
  //         {
  //           id: 1,
  //           itemName: 'castle',
  //           civs: [TEST_CIVS[2]],
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'house',
  //           civs: [TEST_CIVS[2]],
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //       ];

  //       const startState: TechTreeFilterState = {
  //         filteredCivPool: [],
  //         itemsFilter: [...units, ...techs],
  //         filterMode: FilterMode.HAS_ALL,
  //         searchTerm: '',
  //       };

  //       const endState = techTreeFilterReducer(
  //         startState,
  //         setFilterMode(FilterMode.HAS_ALL)
  //       );

  //       expect(endState.filteredCivPool.length).toBe(0);
  //     });
  //   });

  //   describe('has any filter mode', () => {
  //     it('should filter all tech tree types', () => {
  //       const units = [
  //         {
  //           id: 1,
  //           itemName: 'archer',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'knight',
  //           civs: [TEST_CIVS[0]],
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //       ];

  //       const techs = [
  //         {
  //           id: 1,
  //           itemName: 'forging',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'loom',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //       ];

  //       const buildings = [
  //         {
  //           id: 1,
  //           itemName: 'castle',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'house',
  //           civs: TEST_CIVS,
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //       ];

  //       const startState: TechTreeFilterState = {
  //         filteredCivPool: [],
  //         itemsFilter: techs,
  //         filterMode: FilterMode.HAS_ANY,
  //         searchTerm: '',
  //       };

  //       const endState = techTreeFilterReducer(
  //         startState,
  //         setFilterMode(FilterMode.HAS_ANY)
  //       );

  //       expect(endState.filteredCivPool.length).toBe(3);
  //       expect(endState.filteredCivPool).toEqual(TEST_CIVS);
  //     });

  //     it('should have 2 civs in civ pool', () => {
  //       const units = [
  //         {
  //           id: 1,
  //           itemName: 'archer',
  //           civs: [TEST_CIVS[0]],
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'knight',
  //           civs: [TEST_CIVS[0]],
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //       ];

  //       const techs = [
  //         {
  //           id: 1,
  //           itemName: 'forging',
  //           civs: [TEST_CIVS[0]],
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'loom',
  //           civs: [TEST_CIVS[1]],
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //       ];

  //       const buildings = [
  //         {
  //           id: 1,
  //           itemName: 'castle',
  //           civs: [TEST_CIVS[1]],
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'house',
  //           civs: [TEST_CIVS[1]],
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //       ];

  //       const startState: TechTreeFilterState = {
  //         filteredCivPool: [],
  //         itemsFilter: techs,
  //         filterMode: FilterMode.HAS_ANY,
  //         searchTerm: '',
  //       };

  //       const endState = techTreeFilterReducer(
  //         startState,
  //         setFilterMode(FilterMode.HAS_ANY)
  //       );

  //       expect(endState.filteredCivPool.length).toBe(2);
  //       expect(endState.filteredCivPool).toEqual([TEST_CIVS[0], TEST_CIVS[1]]);
  //     });

  //     it('should have no civs in civ pool', () => {
  //       const units = [
  //         {
  //           id: 1,
  //           itemName: 'archer',
  //           civs: [],
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'knight',
  //           civs: [],
  //           kind: TechTreeItemType.UNIT,
  //           isUnique: false,
  //         },
  //       ];

  //       const techs = [
  //         {
  //           id: 1,
  //           itemName: 'forging',
  //           civs: [],
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'loom',
  //           civs: [],
  //           kind: TechTreeItemType.TECH,
  //           isUnique: false,
  //         },
  //       ];

  //       const buildings = [
  //         {
  //           id: 1,
  //           itemName: 'castle',
  //           civs: [],
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //         {
  //           id: 2,
  //           itemName: 'house',
  //           civs: [],
  //           kind: TechTreeItemType.BUILDING,
  //           isUnique: false,
  //         },
  //       ];

  //       const startState: TechTreeFilterState = {
  //         filteredCivPool: [],
  //         itemsFilter: techs,
  //         filterMode: FilterMode.HAS_ANY,
  //         searchTerm: '',
  //       };

  //       const endState = techTreeFilterReducer(
  //         startState,
  //         setFilterMode(FilterMode.HAS_ANY)
  //       );

  //       expect(endState.filteredCivPool.length).toBe(0);
  //     });
  //   });
  // });
});
