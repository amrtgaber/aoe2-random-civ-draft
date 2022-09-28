import { getMockCiv } from '../../mock-state-service';

import draftResultReducer, {
  draftCiv,
  draftResultinitialState,
  DraftResultState,
} from '.';

describe('civs reducer', () => {
  test('should handle initial load', () => {
    expect(draftResultReducer(undefined, { type: 'unkown' })).toEqual(
      draftResultinitialState
    );
  });

  test('should handle draft civ action', () => {
    const civ = getMockCiv();

    expect(
      draftResultReducer(draftResultinitialState, draftCiv(civ))
    ).toEqual<DraftResultState>({
      civ,
      draftCount: 1,
    });
  });
});
