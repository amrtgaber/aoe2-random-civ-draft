import { render } from '@testing-library/react';
import PickCivResult from '.';

test('renders pick civ results', () => {
  const { container: pickCivResultContainer } = render(<PickCivResult />);
  const pickCivResultEl = pickCivResultContainer.querySelector('.pick-civ-result');
  expect(pickCivResultEl).toBeInTheDocument();
});
