import civsReducer from './civs-slice';

import { CivsState } from './civs-slice';

describe('civs reducer', () => {
  it('should handle initial load', () => {
    expect(civsReducer(undefined, { type: 'unkown' })).toEqual<CivsState>({
      list: [],
      status: 'idle',
    });
  });
});
