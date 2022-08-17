import { ICiv } from '../../api/civs-api';
import civPoolReducer from './civ-pool-slice';

import { CivPoolState } from './civ-pool-slice';

describe('civ pool reducer', () => {
  it('should handle initial load', () => {
    expect(civPoolReducer(undefined, { type: 'unkown' })).toEqual<CivPoolState>(
      {
        pool: [] as ICiv[],
      }
    );
  });
});
