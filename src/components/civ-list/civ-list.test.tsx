import { render } from '@testing-library/react';
import CivList from '.';

test('renders top app bar', () => {
  const { container: civListContainer } = render(<CivList />);
  const civListEl = civListContainer.querySelector('.civ-list');
  expect(civListEl).toBeInTheDocument();
});
