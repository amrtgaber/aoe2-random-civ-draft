import { render } from '@testing-library/react';
import PickCivResultContainer from '.';

test('renders pick civ result container', () => {
  const { container: pickCivResultContainerContainer } = render(<PickCivResultContainer />);
  const pickCivResultContainerEl = pickCivResultContainerContainer.querySelector('.pick-civ-result-container');
  expect(pickCivResultContainerEl).toBeInTheDocument();
});
