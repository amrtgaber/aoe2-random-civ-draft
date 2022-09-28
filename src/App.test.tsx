import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { store } from './store';

test('renders app', () => {
  const { container: appContainer } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
  const appEl = appContainer.querySelector('.App');
  expect(appEl).toBeInTheDocument();
});
