import { render } from '@testing-library/react';
import PickCivButton from '.';

test('renders pick civ button', () => {
  const { container: pickCivButtonContainer } = render(<PickCivButton />);
  const pickCivButtonEl = pickCivButtonContainer.querySelector('.pick-civ-button');
  expect(pickCivButtonEl).toBeInTheDocument();
});
