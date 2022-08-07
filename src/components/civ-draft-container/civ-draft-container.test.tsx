import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import CivDraftContainer from '.';
import { store } from '../../store';

test('renders civ draft container', () => {
  const { container: civDraftContainerContainer } = render(
    <Provider store={store}>
      <CivDraftContainer />
    </Provider>
  );
  const civDraftContainerEl = civDraftContainerContainer.querySelector(
    '.civ-draft-container'
  );
  expect(civDraftContainerEl).toBeInTheDocument();
});
