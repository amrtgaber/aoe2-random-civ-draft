import { configureStore } from '@reduxjs/toolkit';

import { ICiv } from '../../api/civs-api';

import draftParametersReducer, {
  clearBuildingsFilter,
  clearFilters,
  clearTechsFilter,
  clearUnitsFilter,
  DraftParametersState,
  FilterMode,
  initialState,
  updateBuildingsFilter,
  updateFilterMode,
  updateTechsFilter,
  updateUnitsFilter,
} from '.';

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
    it('should update units filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const units = [
        {
          id: 1,
          unitName: 'archer',
          civs: TEST_CIVS,
        },
        {
          id: 2,
          unitName: 'knight',
          civs: [TEST_CIVS[0]],
        },
      ];

      const endState = draftParametersReducer(
        startState,
        updateUnitsFilter(units)
      );

      expect(endState.unitsFilter.length).toBe(2);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should clear units filter', () => {
      const units = [
        {
          id: 1,
          unitName: 'archer',
          civs: TEST_CIVS,
        },
        {
          id: 2,
          unitName: 'knight',
          civs: [TEST_CIVS[0]],
        },
      ];

      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: units,
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearUnitsFilter());

      expect(endState.unitsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });
  });

  describe('draftParameter techs filter', () => {
    it('should update techs filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const techs = [
        {
          id: 1,
          techName: 'forging',
          civs: TEST_CIVS,
        },
        {
          id: 2,
          techName: 'loom',
          civs: [TEST_CIVS[0]],
        },
      ];

      const endState = draftParametersReducer(
        startState,
        updateTechsFilter(techs)
      );

      expect(endState.techsFilter.length).toBe(2);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should clear techs filter', () => {
      const techs = [
        {
          id: 1,
          techName: 'forging',
          civs: TEST_CIVS,
        },
        {
          id: 2,
          techName: 'loom',
          civs: [TEST_CIVS[0]],
        },
      ];

      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: techs,
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearTechsFilter());

      expect(endState.techsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });
  });

  describe('draftParameter buildings filter', () => {
    it('should update buildings filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const buildings = [
        {
          id: 1,
          buildingName: 'castle',
          civs: TEST_CIVS,
        },
        {
          id: 2,
          buildingName: 'house',
          civs: [TEST_CIVS[0]],
        },
      ];

      const endState = draftParametersReducer(
        startState,
        updateBuildingsFilter(buildings)
      );

      expect(endState.buildingsFilter.length).toBe(2);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should clear buildings filter', () => {
      const buildings = [
        {
          id: 1,
          buildingName: 'castle',
          civs: TEST_CIVS,
        },
        {
          id: 2,
          buildingName: 'house',
          civs: [TEST_CIVS[0]],
        },
      ];

      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: buildings,
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        clearBuildingsFilter()
      );

      expect(endState.buildingsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });
  });

  describe('clear all filters', () => {
    it('should clear all the filters', () => {
      const startState: DraftParametersState = {
        filteredCivPool: TEST_CIVS,
        unitsFilter: [{ id: 1, unitName: 'archer', civs: [] }],
        techsFilter: [{ id: 1, techName: 'loom', civs: [] }],
        buildingsFilter: [{ id: 1, buildingName: 'house', civs: [] }],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearFilters());

      expect(endState.filteredCivPool.length).toBe(0);
      expect(endState.unitsFilter.length).toBe(0);
      expect(endState.techsFilter.length).toBe(0);
      expect(endState.buildingsFilter.length).toBe(0);
    });
  });

  describe('update filter mode', () => {
    it('should update filter mode', () => {
      const units = [
        {
          id: 1,
          unitName: 'archer',
          civs: TEST_CIVS,
        },
        {
          id: 2,
          unitName: 'knight',
          civs: [TEST_CIVS[0]],
        },
      ];

      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: units,
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      let endState = draftParametersReducer(
        startState,
        updateFilterMode(FilterMode.HAS_ANY)
      );

      expect(endState.filteredCivPool.length).toBe(3);
      expect(endState.filteredCivPool).toEqual(TEST_CIVS);

      endState = draftParametersReducer(
        startState,
        updateFilterMode(FilterMode.HAS_ALL)
      );

      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool).toEqual([TEST_CIVS[0]]);
    });
  });

  describe('filter civs', () => {
    describe('has all filter mode', () => {
      it('should filter all tech tree types', () => {
        const units = [
          {
            id: 1,
            unitName: 'archer',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            unitName: 'knight',
            civs: [TEST_CIVS[0]],
          },
        ];

        const techs = [
          {
            id: 1,
            techName: 'forging',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            techName: 'loom',
            civs: TEST_CIVS,
          },
        ];

        const buildings = [
          {
            id: 1,
            buildingName: 'castle',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            buildingName: 'house',
            civs: TEST_CIVS,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          unitsFilter: units,
          techsFilter: techs,
          buildingsFilter: buildings,
          filterMode: FilterMode.HAS_ALL,
        };

        const endState = draftParametersReducer(
          startState,
          updateFilterMode(FilterMode.HAS_ALL)
        );

        expect(endState.filteredCivPool.length).toBe(1);
        expect(endState.filteredCivPool).toEqual([TEST_CIVS[0]]);
      });

      it('should have all civs in civ pool', () => {
        const units = [
          {
            id: 1,
            unitName: 'archer',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            unitName: 'knight',
            civs: TEST_CIVS,
          },
        ];

        const techs = [
          {
            id: 1,
            techName: 'forging',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            techName: 'loom',
            civs: TEST_CIVS,
          },
        ];

        const buildings = [
          {
            id: 1,
            buildingName: 'castle',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            buildingName: 'house',
            civs: TEST_CIVS,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          unitsFilter: units,
          techsFilter: techs,
          buildingsFilter: buildings,
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
            unitName: 'archer',
            civs: [TEST_CIVS[0]],
          },
          {
            id: 2,
            unitName: 'knight',
            civs: [TEST_CIVS[0]],
          },
        ];

        const techs = [
          {
            id: 1,
            techName: 'forging',
            civs: [TEST_CIVS[1]],
          },
          {
            id: 2,
            techName: 'loom',
            civs: [TEST_CIVS[1]],
          },
        ];

        const buildings = [
          {
            id: 1,
            buildingName: 'castle',
            civs: [TEST_CIVS[2]],
          },
          {
            id: 2,
            buildingName: 'house',
            civs: [TEST_CIVS[2]],
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          unitsFilter: units,
          techsFilter: techs,
          buildingsFilter: buildings,
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
            unitName: 'archer',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            unitName: 'knight',
            civs: [TEST_CIVS[0]],
          },
        ];

        const techs = [
          {
            id: 1,
            techName: 'forging',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            techName: 'loom',
            civs: TEST_CIVS,
          },
        ];

        const buildings = [
          {
            id: 1,
            buildingName: 'castle',
            civs: TEST_CIVS,
          },
          {
            id: 2,
            buildingName: 'house',
            civs: TEST_CIVS,
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          unitsFilter: units,
          techsFilter: techs,
          buildingsFilter: buildings,
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
            unitName: 'archer',
            civs: [TEST_CIVS[0]],
          },
          {
            id: 2,
            unitName: 'knight',
            civs: [TEST_CIVS[0]],
          },
        ];

        const techs = [
          {
            id: 1,
            techName: 'forging',
            civs: [TEST_CIVS[0]],
          },
          {
            id: 2,
            techName: 'loom',
            civs: [TEST_CIVS[1]],
          },
        ];

        const buildings = [
          {
            id: 1,
            buildingName: 'castle',
            civs: [TEST_CIVS[1]],
          },
          {
            id: 2,
            buildingName: 'house',
            civs: [TEST_CIVS[1]],
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          unitsFilter: units,
          techsFilter: techs,
          buildingsFilter: buildings,
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
            unitName: 'archer',
            civs: [],
          },
          {
            id: 2,
            unitName: 'knight',
            civs: [],
          },
        ];

        const techs = [
          {
            id: 1,
            techName: 'forging',
            civs: [],
          },
          {
            id: 2,
            techName: 'loom',
            civs: [],
          },
        ];

        const buildings = [
          {
            id: 1,
            buildingName: 'castle',
            civs: [],
          },
          {
            id: 2,
            buildingName: 'house',
            civs: [],
          },
        ];

        const startState: DraftParametersState = {
          filteredCivPool: [],
          unitsFilter: units,
          techsFilter: techs,
          buildingsFilter: buildings,
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
