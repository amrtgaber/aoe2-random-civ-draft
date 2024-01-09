import snackbarReducer, {
  setSnackbarMessage,
  snackbarInitialState,
  SnackbarState,
} from '.';

describe('snackbar reducer', () => {
  test('should handle initial load', () => {
    expect(snackbarReducer(undefined, { type: 'unkown' })).toEqual(
      snackbarInitialState
    );
  });

  test('should handle set message action', () => {
    expect(
      snackbarReducer(snackbarInitialState, setSnackbarMessage('test'))
    ).toEqual<SnackbarState>({
      message: 'test',
    });
  });
});
