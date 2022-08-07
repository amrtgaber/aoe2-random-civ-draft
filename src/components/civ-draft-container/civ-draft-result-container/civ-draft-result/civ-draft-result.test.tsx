import { render } from '@testing-library/react';
import CivDraftResult from '.';

test('renders civ draft results', () => {
  const { container: civDraftResultContainer } = render(<CivDraftResult />);
  const civDraftResultEl =
    civDraftResultContainer.querySelector('.civ-draft-result');
  expect(civDraftResultEl).toBeInTheDocument();
});
