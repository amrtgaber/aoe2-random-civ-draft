import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { CivDraftParameters } from '.';
import { store } from '../../store';

test('renders civ draft parameters', () => {
  const { container: civDraftParameters } = render(
    <Provider store={store}>
      <CivDraftParameters />
    </Provider>
  );
  const civDraftParametersEl = civDraftParameters.querySelector(
    '.civ-draft-parameters'
  );
  expect(civDraftParametersEl).toBeInTheDocument();
});
