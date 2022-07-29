import { render } from '@testing-library/react';
import PickCivContainer from '.';

test('renders pick civ container', () => {
  const { container: pickCivContainerContainer } = render(<PickCivContainer />);
  const pickCivContainerEl = pickCivContainerContainer.querySelector('.pick-civ-container');
  expect(pickCivContainerEl).toBeInTheDocument();
});