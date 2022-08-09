import { render } from '@testing-library/react';
import { CivDraftParameters } from '.';

test('renders civ draft parameters', () => {
  const { container: civDraftParameters } = render(<CivDraftParameters />);
  const civDraftParametersEl = civDraftParameters.querySelector(
    '.civ-draft-parameters'
  );
  expect(civDraftParametersEl).toBeInTheDocument();
});
