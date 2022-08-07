import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

test('renders app', () => {
  const { container: appContainer } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const appEl = appContainer.querySelector('.App');
  expect(appEl).toBeInTheDocument();
});
