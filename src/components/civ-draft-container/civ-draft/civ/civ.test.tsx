import { render } from '@testing-library/react';
import { Civ } from '.';

test('renders civ draft', () => {
  const { container: civContainer } = render(
    <Civ civ={{ civName: 'Aztecs', id: 1 }} />
  );
  const civEl = civContainer.querySelector('.civ');
  expect(civEl).toBeInTheDocument();
});
