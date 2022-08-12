import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../store';
import { CivDraftResult } from '.';

test('renders civ draft result', () => {
  const { container: civDraftResultContainer } = render(
    <Provider store={store}>
      <CivDraftResult />
    </Provider>
  );
  const civDraftResultEl =
    civDraftResultContainer.querySelector('.civ-draft-result');
  expect(civDraftResultEl).toBeInTheDocument();
});
