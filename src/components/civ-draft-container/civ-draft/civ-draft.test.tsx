import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CivDraft } from '.';
import { store } from '../../../store';

test('renders civ draft', () => {
  const { container: civDraftContainer } = render(
    <Provider store={store}>
      <CivDraft />
    </Provider>
  );
  const civDraftEl = civDraftContainer.querySelector('.civ-draft');
  expect(civDraftEl).toBeInTheDocument();
});
