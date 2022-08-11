import { ICiv } from '../../../../api/civs-api';
import draftResultReducer, {
  draftCiv,
  DraftResultState,
  DraftResultStatus,
} from './draft-result-slice';

const initialState: DraftResultState = {
  civ: null,
  status: DraftResultStatus.INIT,
};

describe('civs reducer', () => {
  it('should handle initial load', () => {
    expect(
      draftResultReducer(undefined, { type: 'unkown' })
    ).toEqual<DraftResultState>(initialState);
  });

  it('should handle draft civ action', () => {
    const civ: ICiv = { civName: 'Aztecs', id: 1 };
    expect(
      draftResultReducer(initialState, draftCiv({ civName: 'Aztecs', id: 1 }))
    ).toEqual<DraftResultState>({
      civ,
      status: DraftResultStatus.DRAFTED,
    });
  });
});
