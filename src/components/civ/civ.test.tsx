import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { Civ } from '.';
import { store } from '../../store';

test('renders civ', () => {
  const { container: civContainer } = render(
    <Provider store={store}>
      <Civ
        civ={{ civName: 'Aztecs', id: 1 }}
        isDrafted={false}
        isInPool={false}
      />
    </Provider>
  );
  const civEl = civContainer.querySelector('.civ-container');
  expect(civEl).toBeInTheDocument();
});
