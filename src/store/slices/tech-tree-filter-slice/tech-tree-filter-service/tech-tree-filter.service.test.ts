import { MOCK_STATE } from '../../../mock-state-service/mock-state';
import { isUnit } from '../../../../api/tech-tree-item-api';
import { getTagByName } from './tags-service';

import { assembleShownItemsOnChange } from '.';

describe('tech tree filter service', () => {
  describe('assembleShownItemsOnChange', () => {
    test('searches and filters items', () => {
      const state = { ...MOCK_STATE.techTreeFilter };

      state.searchTerm = 'a';
      state.selectedTags = [getTagByName('units')];

      const shownItems = assembleShownItemsOnChange(state);

      expect(shownItems.every((item) => isUnit(item))).toBe(true);
      expect(shownItems.every((item) => item.itemName.includes('a'))).toBe(
        true
      );
    });

    test('removes selected items', () => {
      const state = { ...MOCK_STATE.techTreeFilter };

      const shownItems = assembleShownItemsOnChange(state);

      expect(
        shownItems.every((item) => !(item.itemName === 'winged hussar'))
      ).toBe(true);
    });
  });
});
