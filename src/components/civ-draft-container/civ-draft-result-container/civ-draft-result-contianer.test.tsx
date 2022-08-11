import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../store';
import { CivDraftResultContainer } from '.';

test('renders civ draft result container', () => {
  const { container: civDraftResultContainerContainer } = render(
    <Provider store={store}>
      <CivDraftResultContainer />
    </Provider>
  );
  const civDraftResultContainerEl =
    civDraftResultContainerContainer.querySelector(
      '.civ-draft-result-container'
    );
  expect(civDraftResultContainerEl).toBeInTheDocument();
});
