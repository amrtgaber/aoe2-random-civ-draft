import { configureStore } from '@reduxjs/toolkit';

import { ICiv } from '../../api/civs-api';
import { IUnitTechTree } from '../../api/units-api';
import { ITechTechTree } from '../../api/techs-api';
import { IBuildingTechTree } from '../../api/buildings-api';

import draftParametersReducer, {
  clearBuildingsFilter,
  clearFilters,
  clearTechsFilter,
  clearUnitsFilter,
  DraftParametersState,
  initialState,
  updateBuildingsFilter,
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
    civs: [],
  },
  {
    id: 2,
    unitName: 'knight',
    civs: [],
  },
  {
    id: 3,
    unitName: 'skirmisher',
    civs: [],
  },
];

const TEST_TECHS: ITechTechTree[] = [
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
  {
    id: 3,
    techName: 'wheelbarrow',
    civs: [],
  },
];

const TEST_BUILDINGS: IBuildingTechTree[] = [
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
  {
    id: 3,
    buildingName: 'stable',
    civs: [],
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
        isAllFilter: true,
      };

      const units = [...TEST_UNITS];

      units[0].civs = TEST_CIVS;
      units[1].civs = [TEST_CIVS[0]];

      const endState = draftParametersReducer(
        startState,
        updateUnitsFilter([units[0], units[1]])
      );

      expect(endState.unitsFilter.length).toBe(2);
      // expect(endState.filteredCivPool.length).toBe(1);
      // expect(endState.filteredCivPool[0].id).toBe(1);
    });
  });

  describe('clear filters', () => {
    it('should clear all the filters', () => {
      const startState: DraftParametersState = {
        filteredCivPool: TEST_CIVS,
        unitsFilter: [TEST_UNITS[0]],
        techsFilter: [TEST_TECHS[0]],
        buildingsFilter: [TEST_BUILDINGS[0]],
        isAllFilter: true,
      };

      const endState = draftParametersReducer(startState, clearFilters());

      expect(endState.filteredCivPool.length).toBe(0);
      expect(endState.unitsFilter.length).toBe(0);
      expect(endState.techsFilter.length).toBe(0);
      expect(endState.buildingsFilter.length).toBe(0);
    });
  });
});
