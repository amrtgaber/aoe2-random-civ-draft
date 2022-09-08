import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { configureTestStore } from '../../test/shared-test-data';
import { StagingCivPool } from '.';

describe('staging civ pool component', () => {
  test('renders staging civ pool', () => {
    const store = configureTestStore();

    const { container: stagingCivPoolContainer } = render(
      <Provider store={store}>
        <MemoryRouter>
          <StagingCivPool />
        </MemoryRouter>
      </Provider>
    );

    const stagingCivPoolEl =
      stagingCivPoolContainer.querySelector('.staging-civ-pool');
    expect(stagingCivPoolEl).toBeInTheDocument();
  });
});
