import { MOCK_STATE } from '../../../mock-state-service/mock-state';
import { getMockTechTreeItems } from '../../../mock-state-service';
import { FilterMode } from '..';

import { filterCivPool } from '.';

describe('filter civ pool service', () => {
  test('returns no civs if no items in filter', () => {
    const state = { ...MOCK_STATE.techTreeFilter };

    state.itemsFilter = [];

    const filterResult = filterCivPool(state);

    expect(filterResult.length).toBe(0);
  });

  describe('filter by all', () => {
    test('returns civs that have all of the items in their tech tree', () => {
      const mockItems = getMockTechTreeItems();
      mockItems[0].civs = [
        { id: 1, civName: 'Aztecs' },
        { id: 2, civName: 'Franks' },
      ];
      mockItems[1].civs = [
        { id: 1, civName: 'Aztecs' },
        { id: 3, civName: 'Vikings' },
      ];

      const state = { ...MOCK_STATE.techTreeFilter };
      state.filterMode = FilterMode.HAS_ALL;
      state.itemsFilter = [mockItems[0], mockItems[1]];

      const filterResult = filterCivPool(state);

      expect(filterResult.length).toBe(1);
      expect(filterResult[0].civName).toBe('Aztecs');
    });
  });

  describe('filter by any', () => {
    test('returns civs that have any of the items in their tech tree', () => {
      const mockItems = getMockTechTreeItems();
      mockItems[0].civs = [
        { id: 1, civName: 'Aztecs' },
        { id: 2, civName: 'Franks' },
      ];
      mockItems[1].civs = [
        { id: 1, civName: 'Aztecs' },
        { id: 3, civName: 'Vikings' },
      ];

      const state = { ...MOCK_STATE.techTreeFilter };
      state.filterMode = FilterMode.HAS_ANY;
      state.itemsFilter = [mockItems[0], mockItems[1]];

      const filterResult = filterCivPool(state);

      expect(filterResult.length).toBe(3);
    });
  });
});
