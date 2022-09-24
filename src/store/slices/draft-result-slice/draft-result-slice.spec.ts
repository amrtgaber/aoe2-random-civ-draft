import { getMockCiv } from '../../mock-state-service';

import draftResultReducer, { draftCiv, DraftResultState } from '.';

const initialState: DraftResultState = {
  civ: null,
  draftCount: 0,
};

describe('civs reducer', () => {
  it('should handle initial load', () => {
    expect(
      draftResultReducer(undefined, { type: 'unkown' })
    ).toEqual<DraftResultState>(initialState);
  });

  it('should handle draft civ action', () => {
    const civ = getMockCiv();
    expect(
      draftResultReducer(initialState, draftCiv(civ))
    ).toEqual<DraftResultState>({
      civ,
      draftCount: 1,
    });
  });
});
