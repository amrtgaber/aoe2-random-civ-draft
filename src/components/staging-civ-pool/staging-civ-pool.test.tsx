import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import civsReducer from '../../store/civs-slice';
import draftResultReducer from '../../store/draft-result-slice';
import { StagingCivPool } from '.';

describe('staging civ pool component', () => {
  test('renders staging civ pool', () => {
    const store = configureStore({
      reducer: {
        civs: civsReducer,
        draftResult: draftResultReducer,
      },
    });

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
