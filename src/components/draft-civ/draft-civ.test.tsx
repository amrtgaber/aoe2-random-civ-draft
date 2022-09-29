import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import { configureMockStore } from '../../store/mock-state-service';

import { DraftCiv } from '.';

describe('civ draft result container component', () => {
  test('renders civ draft result container', () => {
    const mockStore = configureMockStore();

    const { container: civDraftResultContainerContainer } = render(
      <Provider store={mockStore}>
        <DraftCiv />
      </Provider>
    );

    const civDraftResultContainerEl =
      civDraftResultContainerContainer.querySelector('.draft-civ');

    expect(civDraftResultContainerEl).toBeInTheDocument();
  });

  test('drafts a civ and renders the result', () => {
    const mockStore = configureMockStore({
      civs: MOCK_STATE.civs,
    });

    const { container: civDraftResultContainerContainer } = render(
      <Provider store={mockStore}>
        <DraftCiv />
      </Provider>
    );

    fireEvent.click(screen.getByText('Draft Civ'));

    const draftedCivEl =
      civDraftResultContainerContainer.querySelector('.civ-main-content');

    expect(draftedCivEl).toBeInTheDocument();
  });
});
