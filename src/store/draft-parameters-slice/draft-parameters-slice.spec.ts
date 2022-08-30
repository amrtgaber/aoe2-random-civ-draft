import { configureStore } from '@reduxjs/toolkit';

import { ICiv } from '../../api/civs-api';
import { IUnitTechTree } from '../../api/units-api';
import { ITechTechTree } from '../../api/techs-api';
import { IBuildingTechTree } from '../../api/buildings-api';

import draftParametersReducer, {
  addBuildingToFilter,
  addTechToFilter,
  addUnitToFilter,
  clearBuildingsFilter,
  clearFilters,
  clearTechsFilter,
  clearUnitsFilter,
  DraftParametersState,
  FilterMode,
  initialState,
  removeBuildingFromFilter,
  removeTechFromFilter,
  removeUnitFromFilter,
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

const TEST_UNITS: IUnitTechTree[] = [
  {
    id: 1,
    unitName: 'archer',
    civs: TEST_CIVS,
  },
  {
    id: 2,
    unitName: 'skirmisher',
    civs: TEST_CIVS,
  },
];

const TEST_TECHS: ITechTechTree[] = [
  {
    id: 1,
    techName: 'loom',
    civs: TEST_CIVS,
  },
  {
    id: 2,
    techName: 'wheelbarrow',
    civs: TEST_CIVS,
  },
];

const TEST_BUILDINGS: IBuildingTechTree[] = [
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
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        addUnitToFilter(TEST_UNITS[0])
      );

      expect(endState.unitsFilter.length).toBe(1);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should remove unit from filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [TEST_UNITS[0]],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        removeUnitFromFilter(TEST_UNITS[0])
      );

      expect(endState.unitsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });

    it('should update units filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        updateUnitsFilter(TEST_UNITS)
      );

      expect(endState.unitsFilter.length).toBe(2);
      expect(endState.filteredCivPool.length).toBe(3);
    });

    it('should clear units filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: TEST_UNITS,
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
    it('should add tech to filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        addTechToFilter(TEST_TECHS[0])
      );

      expect(endState.techsFilter.length).toBe(1);
      expect(endState.filteredCivPool.length).toBe(1);
    });

    it('should remove tech from filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [TEST_TECHS[0]],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        removeTechFromFilter(TEST_TECHS[0])
      );

      expect(endState.techsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(1);
    });

    it('should update techs filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        updateTechsFilter(TEST_TECHS)
      );

      expect(endState.techsFilter.length).toBe(3);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should clear techs filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: TEST_TECHS,
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearTechsFilter());

      expect(endState.techsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });
  });

  describe('draftParameter buildings filter', () => {
    it('should add building to filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        addBuildingToFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingsFilter.length).toBe(1);
      expect(endState.filteredCivPool.length).toBe(1);
      expect(endState.filteredCivPool[0].id).toBe(1);
    });

    it('should remove building from filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [TEST_BUILDINGS[0]],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        removeBuildingFromFilter(TEST_BUILDINGS[0])
      );

      expect(endState.buildingsFilter.length).toBe(0);
      expect(endState.filteredCivPool.length).toBe(0);
    });

    it('should update filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: [],
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(
        startState,
        updateBuildingsFilter(TEST_BUILDINGS)
      );

      expect(endState.buildingsFilter.length).toBe(3);
      expect(endState.filteredCivPool.length).toBe(3);
    });

    it('should clear building filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitsFilter: [],
        techsFilter: [],
        buildingsFilter: TEST_BUILDINGS,
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
        unitsFilter: TEST_UNITS,
        techsFilter: TEST_TECHS,
        buildingsFilter: TEST_BUILDINGS,
        filterMode: FilterMode.HAS_ALL,
      };

      const endState = draftParametersReducer(startState, clearFilters());

      expect(endState.filteredCivPool.length).toBe(0);
      expect(endState.unitsFilter.length).toBe(0);
      expect(endState.techsFilter.length).toBe(0);
      expect(endState.buildingsFilter.length).toBe(0);
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
