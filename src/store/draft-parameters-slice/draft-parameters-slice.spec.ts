import { configureStore } from '@reduxjs/toolkit';

import { ICiv } from '../../api/civs-api';
import { IUnit } from '../../api/units-api';
import { ITech } from '../../api/techs-api';
import { IBuilding } from '../../api/buildings-api';

import draftParametersReducer, {
  addItemToFilter,
  clearFilter,
  DraftParametersState,
  FilterMode,
  initialState,
  removeItemFromFilter,
  updateFilter,
  updateFilterMode,
} from '.';
import { TechTreeItemType } from '../../api/tech-tree-item-api';

const TEST_CIVS: ICiv[] = [
  {
    id: 1,
    civName: 'Aztecs',
  },
  {
    id: 2,
    civName: 'Malians',
  },
  {
    id: 3,
    civName: 'Vikings',
  },
];

const TEST_UNITS: IUnit[] = [
  {
    id: 1,
    itemName: 'archer',
    civs: TEST_CIVS,
    kind: TechTreeItemType.UNIT,
  },
  {
    id: 2,
    itemName: 'skirmisher',
    civs: TEST_CIVS,
    kind: TechTreeItemType.UNIT,
  },
];

const TEST_TECHS: ITech[] = [
  {
    id: 1,
    itemName: 'loom',
    civs: TEST_CIVS,
    kind: TechTreeItemType.TECH,
  },
  {
    id: 2,
    itemName: 'wheelbarrow',
    civs: TEST_CIVS,
    kind: TechTreeItemType.TECH,
  },
];

const TEST_BUILDINGS: IBuilding[] = [
  {
    id: 1,
    itemName: 'castle',
    civs: TEST_CIVS,
    kind: TechTreeItemType.BUILDING,
  },
  {
    id: 2,
    itemName: 'house',
    civs: TEST_CIVS,
    kind: TechTreeItemType.BUILDING,
  },
];

const store = configureStore({
  reducer: draftParametersReducer,
});

describe('draftParameters reducer', () => {
  it('should handle initial load', () => {
    expect(
      draftParametersReducer(undefined, { type: 'unkown' })
    ).toEqual<DraftParametersState>(initialState);
  });

  describe('draftParameter units filter', () => {
    it('should add unit to filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        addItemToFilter(TEST_UNITS[0])
      );

      expect(endState.itemsFilter.length).toBe(1);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should remove unit from filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [TEST_UNITS[0]],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        removeItemFromFilter(TEST_UNITS[0])
      );

      expect(endState.itemsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });

    it('should update units filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        updateFilter(TEST_UNITS)
      );

      expect(endState.itemsFilter.length).toBe(2);
      expect(endState.filteredCivPool.length).toBe(3);
    });

    it('should clear units filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: TEST_UNITS,
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearFilter());

      expect(endState.itemsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });
  });

  describe('draftParameter techs filter', () => {
    it('should add tech to filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        addItemToFilter(TEST_TECHS[0])
      );

      expect(endState.itemsFilter.length).toBe(1);
      expect(endState.filteredCivPool.length).toBe(1);
    });

    it('should remove tech from filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [TEST_TECHS[0]],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        removeItemFromFilter(TEST_TECHS[0])
      );

      expect(endState.itemsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(1);
    });

    it('should update techs filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        updateFilter(TEST_TECHS)
      );

      expect(endState.itemsFilter.length).toBe(3);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should clear techs filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: TEST_TECHS,
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearFilter());

      expect(endState.itemsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });
  });

  describe('draftParameter buildings filter', () => {
    it('should add building to filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        addItemToFilter(TEST_BUILDINGS[0])
      );

      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should remove building from filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        removeItemFromFilter(TEST_BUILDINGS[0])
      );

      expect(endState.filteredCivPool.length).toBe(0);
    });

    it('should update buildings filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        updateFilter(TEST_BUILDINGS)
      );

      expect(endState.itemsFilter.length).toBe(3);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should clear buildings filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        itemsFilter: TEST_BUILDINGS,
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearFilter());

      expect(endState.itemsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });
  });

  describe('filter civs', () => {
    describe('has all filter mode', () => {
      it('should filter all tech tree types', () => {
        const startState: DraftParametersState = {
          filteredCivPool: [],
          itemsFilter: [TEST_UNITS[0], TEST_TECHS[0], TEST_BUILDINGS[0]],
          filterMode: FilterMode.HAS_ALL,
        };

        const endState = draftParametersReducer(
          startState,
          updateFilterMode(FilterMode.HAS_ALL)
        );

        expect(endState.filteredCivPool.length).toBe(3);
        expect(endState.filteredCivPool).toEqual(TEST_CIVS);
      });

      it('should have all civs in civ pool', () => {
        const units = [
          {
            id: 1,
            itemName: 'archer',
            civs: TEST_CIVS,
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 2,
            itemName: 'knight',
            civs: TEST_CIVS,
            kind: TechTreeItemType.UNIT,
          },
        ];

        const techs = [
          {
            id: 1,
            itemName: 'forging',
            civs: TEST_CIVS,
            kind: TechTreeItemType.TECH,
          },
          {
            id: 2,
            itemName: 'loom',
            civs: TEST_CIVS,
            kind: TechTreeItemType.TECH,
          },
        ];

        const buildings = [
          {
            id: 1,
            itemName: 'castle',
            civs: TEST_CIVS,
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 2,
            itemName: 'house',
            civs: TEST_CIVS,
            kind: TechTreeItemType.BUILDING,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          itemsFilter: units,
          filterMode: FilterMode.HAS_ALL,
        };

        const endState = draftParametersReducer(
          startState,
          updateFilterMode(FilterMode.HAS_ALL)
        );

        expect(endState.filteredCivPool.length).toBe(3);
        expect(endState.filteredCivPool).toEqual(TEST_CIVS);
      });

      it('should have no civs in civ pool', () => {
        const units = [
          {
            id: 1,
            itemName: 'archer',
            civs: [TEST_CIVS[0]],
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 2,
            itemName: 'knight',
            civs: [TEST_CIVS[0]],
            kind: TechTreeItemType.UNIT,
          },
        ];

        const techs = [
          {
            id: 1,
            itemName: 'forging',
            civs: [TEST_CIVS[1]],
            kind: TechTreeItemType.TECH,
          },
          {
            id: 2,
            itemName: 'loom',
            civs: [TEST_CIVS[1]],
            kind: TechTreeItemType.TECH,
          },
        ];

        const buildings = [
          {
            id: 1,
            itemName: 'castle',
            civs: [TEST_CIVS[2]],
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 2,
            itemName: 'house',
            civs: [TEST_CIVS[2]],
            kind: TechTreeItemType.BUILDING,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          itemsFilter: techs,
          filterMode: FilterMode.HAS_ALL,
        };

        const endState = draftParametersReducer(
          startState,
          updateFilterMode(FilterMode.HAS_ALL)
        );

        expect(endState.filteredCivPool.length).toBe(0);
      });
    });

    describe('has any filter mode', () => {
      it('should filter all tech tree types', () => {
        const units = [
          {
            id: 1,
            itemName: 'archer',
            civs: TEST_CIVS,
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 2,
            itemName: 'knight',
            civs: [TEST_CIVS[0]],
            kind: TechTreeItemType.UNIT,
          },
        ];

        const techs = [
          {
            id: 1,
            itemName: 'forging',
            civs: TEST_CIVS,
            kind: TechTreeItemType.TECH,
          },
          {
            id: 2,
            itemName: 'loom',
            civs: TEST_CIVS,
            kind: TechTreeItemType.TECH,
          },
        ];

        const buildings = [
          {
            id: 1,
            itemName: 'castle',
            civs: TEST_CIVS,
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 2,
            itemName: 'house',
            civs: TEST_CIVS,
            kind: TechTreeItemType.BUILDING,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          itemsFilter: techs,
          filterMode: FilterMode.HAS_ANY,
        };

        const endState = draftParametersReducer(
          startState,
          updateFilterMode(FilterMode.HAS_ANY)
        );

        expect(endState.filteredCivPool.length).toBe(3);
        expect(endState.filteredCivPool).toEqual(TEST_CIVS);
      });

      it('should have 2 civs in civ pool', () => {
        const units = [
          {
            id: 1,
            itemName: 'archer',
            civs: [TEST_CIVS[0]],
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 2,
            itemName: 'knight',
            civs: [TEST_CIVS[0]],
            kind: TechTreeItemType.UNIT,
          },
        ];

        const techs = [
          {
            id: 1,
            itemName: 'forging',
            civs: [TEST_CIVS[0]],
            kind: TechTreeItemType.TECH,
          },
          {
            id: 2,
            itemName: 'loom',
            civs: [TEST_CIVS[1]],
            kind: TechTreeItemType.TECH,
          },
        ];

        const buildings = [
          {
            id: 1,
            itemName: 'castle',
            civs: [TEST_CIVS[1]],
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 2,
            itemName: 'house',
            civs: [TEST_CIVS[1]],
            kind: TechTreeItemType.BUILDING,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          itemsFilter: techs,
          filterMode: FilterMode.HAS_ANY,
        };

        const endState = draftParametersReducer(
          startState,
          updateFilterMode(FilterMode.HAS_ANY)
        );

        expect(endState.filteredCivPool.length).toBe(2);
        expect(endState.filteredCivPool).toEqual([TEST_CIVS[0], TEST_CIVS[1]]);
      });

      it('should have no civs in civ pool', () => {
        const units = [
          {
            id: 1,
            itemName: 'archer',
            civs: [],
            kind: TechTreeItemType.UNIT,
          },
          {
            id: 2,
            itemName: 'knight',
            civs: [],
            kind: TechTreeItemType.UNIT,
          },
        ];

        const techs = [
          {
            id: 1,
            itemName: 'forging',
            civs: [],
            kind: TechTreeItemType.TECH,
          },
          {
            id: 2,
            itemName: 'loom',
            civs: [],
            kind: TechTreeItemType.TECH,
          },
        ];

        const buildings = [
          {
            id: 1,
            itemName: 'castle',
            civs: [],
            kind: TechTreeItemType.BUILDING,
          },
          {
            id: 2,
            itemName: 'house',
            civs: [],
            kind: TechTreeItemType.BUILDING,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          itemsFilter: techs,
          filterMode: FilterMode.HAS_ANY,
        };

        const endState = draftParametersReducer(
          startState,
          updateFilterMode(FilterMode.HAS_ANY)
        );

        expect(endState.filteredCivPool.length).toBe(0);
      });
    });
  });
});
