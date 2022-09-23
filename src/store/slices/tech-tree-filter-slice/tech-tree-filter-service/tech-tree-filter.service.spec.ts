import { assembleShownItemsOnChange } from '.';
import { isUnit } from '../../../../api/tech-tree-item-api';
import { MOCK_STATE } from '../../../mock-state-service/mock-state';
import { getTagByName } from './tags-service';

describe('tech tree filter service', () => {
  describe('assembleShownItemsOnChange', () => {
    it('searches and filters items', () => {
      const state = { ...MOCK_STATE.techTreeFilter };

      state.searchTerm = 'a';
      state.selectedTags = [getTagByName('units')];

      const shownItems = assembleShownItemsOnChange(state);

      expect(shownItems.every((item) => isUnit(item))).toBe(true);
      expect(shownItems.every((item) => item.itemName.includes('a'))).toBe(
        true
      );
    });

    it('removes selected items', () => {
      const state = { ...MOCK_STATE.techTreeFilter };

      const shownItems = assembleShownItemsOnChange(state);

      expect(
        shownItems.every((item) => !(item.itemName === 'winged hussar'))
      ).toBe(true);
    });
  });
});
