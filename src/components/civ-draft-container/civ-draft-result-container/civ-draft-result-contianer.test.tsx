import { render } from '@testing-library/react';
import { CivDraftResultContainer } from '.';

test('renders civ draft result container', () => {
  const { container: civDraftResultContainerContainer } = render(
    <CivDraftResultContainer />
  );
  const civDraftResultContainerEl =
    civDraftResultContainerContainer.querySelector(
      '.civ-draft-result-container'
    );
  expect(civDraftResultContainerEl).toBeInTheDocument();
});
