import { configureStore } from '@reduxjs/toolkit';

import { ICiv } from '../../api/civs-api';
import { IUnitTechTree } from '../../api/units-api';
import { ITechTechTree } from '../../api/techs-api';
import { IBuildingTechTree } from '../../api/buildings-api';

import draftParametersReducer, {
  clearBuildingAllFilter,
  clearBuildingAnyFilter,
  clearFilters,
  clearTechAllFilter,
  clearTechAnyFilter,
  clearUnitAllFilter,
  clearUnitAnyFilter,
  DraftParametersState,
  initialState,
  updateBuildingAllFilter,
  updateBuildingAnyFilter,
  updateTechAllFilter,
  updateTechAnyFilter,
  updateUnitAllFilter,
  updateUnitAnyFilter,
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

  describe('draftParameter unit filters', () => {
    it('should update unit all filter', () => {
      const startState: DraftParametersState = {
        filteredCivPool: [],
        unitAllFilter: [],
        unitAnyFilter: [],
        techAllFilter: [],
        techAnyFilter: [],
        buildingAllFilter: [],
        buildingAnyFilter: [],
      };

      const units = [...TEST_UNITS];

      units[0].civs = TEST_CIVS;
      units[1].civs = [TEST_CIVS[0]];

      const endState = draftParametersReducer(
        startState,
        updateUnitAllFilter([units[0], units[1]])
      );

      expect(endState.unitAllFilter.length).toBe(2);
      // expect(endState.filteredCivPool.length).toBe(1);
      // expect(endState.filteredCivPool[0].id).toBe(1);
    });
  });

  describe('clear filters', () => {
    it('should clear all the filters', () => {
      const startState: DraftParametersState = {
        filteredCivPool: TEST_CIVS,
        unitAllFilter: [TEST_UNITS[0]],
        unitAnyFilter: [TEST_UNITS[1]],
        techAllFilter: [TEST_TECHS[0]],
        techAnyFilter: [TEST_TECHS[1]],
        buildingAllFilter: [TEST_BUILDINGS[0]],
        buildingAnyFilter: [TEST_BUILDINGS[1]],
      };

      const endState = draftParametersReducer(startState, clearFilters());

      expect(endState.filteredCivPool.length).toBe(0);
      expect(endState.unitAllFilter.length).toBe(0);
      expect(endState.unitAnyFilter.length).toBe(0);
      expect(endState.techAllFilter.length).toBe(0);
      expect(endState.techAnyFilter.length).toBe(0);
      expect(endState.buildingAllFilter.length).toBe(0);
      expect(endState.buildingAnyFilter.length).toBe(0);
    });
  });
});
