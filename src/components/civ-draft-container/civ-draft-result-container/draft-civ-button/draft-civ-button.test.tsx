import { render } from '@testing-library/react';
import { DraftCivButton } from '.';

test('renders draft civ button', () => {
  const { container: draftCivButtonContainer } = render(<DraftCivButton />);
  const draftCivButtonEl =
    draftCivButtonContainer.querySelector('.draft-civ-button');
  expect(draftCivButtonEl).toBeInTheDocument();
});
