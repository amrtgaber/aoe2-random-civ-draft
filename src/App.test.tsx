import { render } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  const { container: appContainer } = render(<App />);
  const appEl = appContainer.querySelector('.App');
  expect(appEl).toBeInTheDocument();
});
