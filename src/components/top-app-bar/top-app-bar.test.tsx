import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import versionReducer from '../../store/version-slice';
import { TopAppBar } from './';

test('renders top app bar', () => {
  const reducer = {
    version: versionReducer,
  };

  const store = configureStore({ reducer });

  const { container: topAppBarContainer } = render(
    <Provider store={store}>
      <TopAppBar />
    </Provider>
  );

  const topAppBarEl = topAppBarContainer.querySelector('.top-app-bar');

  expect(topAppBarEl).toBeInTheDocument();
});
