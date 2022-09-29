import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../store/mock-state-service';

import { TopAppBar } from './';

describe('top app bar component', () => {
  test('renders top app bar', () => {
    const mockStore = configureMockStore({
      version: MOCK_STATE.version,
    });

    const { container: topAppBarContainer } = render(
      <Provider store={mockStore}>
        <TopAppBar />
      </Provider>
    );

    const topAppBarEl = topAppBarContainer.querySelector('.top-app-bar');

    expect(topAppBarEl).toBeInTheDocument();
  });
});
