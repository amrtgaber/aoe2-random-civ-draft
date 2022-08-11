import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../../store';
import { DraftCivButton } from '.';

test('renders draft civ button', () => {
  const { container: draftCivButtonContainer } = render(
    <Provider store={store}>
      <DraftCivButton />
    </Provider>
  );
  const draftCivButtonEl =
    draftCivButtonContainer.querySelector('.draft-civ-button');
  expect(draftCivButtonEl).toBeInTheDocument();
});
