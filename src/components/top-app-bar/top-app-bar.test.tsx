import { render } from '@testing-library/react';
import { TopAppBar } from './';

test('renders top app bar', () => {
  const { container: topAppBarContainer } = render(<TopAppBar />);
  const topAppBarEl = topAppBarContainer.querySelector('.top-app-bar');
  expect(topAppBarEl).toBeInTheDocument();
});
