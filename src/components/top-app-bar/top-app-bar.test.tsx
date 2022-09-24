import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureMockStore } from '../../store/mock-state-service';

import { TopAppBar } from './';

describe('top app bar component', () => {
  it('renders top app bar', () => {
    const mockStore = configureMockStore();

    const { container: topAppBarContainer } = render(
      <Provider store={mockStore}>
        <TopAppBar />
      </Provider>
    );

    const topAppBarEl = topAppBarContainer.querySelector('.top-app-bar');

    expect(topAppBarEl).toBeInTheDocument();
  });
});
