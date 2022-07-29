import { render } from '@testing-library/react';
import PickCivParameters from '.';

test('renders pick civ parameters', () => {
  const { container: pickCivParameters } = render(<PickCivParameters />);
  const pickCivParametersEl = pickCivParameters.querySelector('.pick-civ-parameters');
  expect(pickCivParametersEl).toBeInTheDocument();
});
