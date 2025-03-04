import { getMockCiv } from '../../mock-state-service';

import draftResultReducer, {
  draftCiv,
  draftResultInitialState,
  DraftResultState,
  resetDraft,
} from '.';

describe('draft result reducer', () => {
  test('should handle initial load', () => {
    expect(draftResultReducer(undefined, { type: 'unkown' })).toEqual(
      draftResultInitialState,
    );
  });

  test('should handle draft civ action', () => {
    const civ = getMockCiv();

    expect(
      draftResultReducer(draftResultInitialState, draftCiv(civ)),
    ).toEqual<DraftResultState>({
      civ,
      draftCount: 1,
    });
  });

  test('should handle reset draft action', () => {
    const civ = getMockCiv();

    const startState = {
      ...draftResultInitialState,
      civ,
      draftCount: 1,
    };

    expect(
      draftResultReducer(startState, resetDraft()),
    ).toEqual<DraftResultState>({
      civ: null,
      draftCount: 0,
    });
  });
});
