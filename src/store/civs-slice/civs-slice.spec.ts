import { ICiv } from '../../api/civs-api';
import civsReducer, { FetchStatus } from '.';

import { CivsState } from '.';

describe('civs reducer', () => {
  it('should handle initial load', () => {
    expect(civsReducer(undefined, { type: 'unkown' })).toEqual<CivsState>({
      allCivs: [] as ICiv[],
      civPool: [] as ICiv[],
      status: FetchStatus.INIT,
    });
  });
});
