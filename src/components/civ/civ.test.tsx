import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MOCK_STATE } from '../../store/mock-state-service/mock-state';
import {
  configureMockStore,
  getMockCiv,
  getMockCivs,
} from '../../store/mock-state-service';

import { Civ } from '.';

describe('civ component', () => {
  describe('renders civ component', () => {
    test('renders civ component', () => {
      const mockCiv = getMockCiv();

      const mockStore = configureMockStore();

      const { container: civContainer } = render(
        <Provider store={mockStore}>
          <Civ
            civ={mockCiv}
            isDrafted={false}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      const civEl = civContainer.querySelector('.civ-container');
      expect(civEl).toBeInTheDocument();
    });
  });

  describe('civ in civ draft component', () => {
    test('adds civ to civ pool when clicked', () => {
      const mockCiv = getMockCiv();

      const mockStore = configureMockStore();

      const { container: civContainer } = render(
        <Provider store={mockStore}>
          <Civ
            civ={mockCiv}
            isDrafted={false}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      fireEvent.click(screen.getByText(mockCiv.civName));
      expect(mockStore.getState().civs.civPool[0].id).toBe(mockCiv.id);
    });

    test('removes civ from civ pool when clicked', () => {
      const mockCiv = getMockCiv();

      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civPool: [mockCiv],
        },
      });

      const { container: civContainer } = render(
        <Provider store={mockStore}>
          <Civ
            civ={mockCiv}
            isDrafted={false}
            isDraftable={true}
            isInPool={true}
          />
        </Provider>
      );

      fireEvent.click(screen.getByText(mockCiv.civName));
      expect(mockStore.getState().civs.civPool.length).toBe(0);
    });

    test('clicking tech tree does not affect pool state', () => {
      const mockCivs = getMockCivs();
      const mockCiv1 = mockCivs[0];
      const mockCiv2 = mockCivs[1];

      const mockStore = configureMockStore({
        civs: {
          ...MOCK_STATE.civs,
          civPool: [mockCiv1],
        },
      });

      const { container: civContainer } = render(
        <Provider store={mockStore}>
          <Civ
            civ={mockCiv1}
            isDrafted={false}
            isDraftable={true}
            isInPool={true}
          />
          <Civ
            civ={mockCiv2}
            isDrafted={false}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      fireEvent.click(screen.getByAltText(`${mockCiv1.civName} emblem`));
      expect(mockStore.getState().civs.civPool[0].id).toBe(mockCiv1.id);

      fireEvent.click(screen.getByAltText(`${mockCiv2.civName} emblem`));
      expect(mockStore.getState().civs.civPool[0].id).toBe(mockCiv1.id);
    });
  });

  describe('civ in draft result component', () => {
    test('renders civ in draft result component', () => {
      const mockCiv = getMockCiv();

      const mockStore = configureMockStore();

      const { container: civContainer } = render(
        <Provider store={mockStore}>
          <Civ
            civ={mockCiv}
            isDrafted={true}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      const civEl = screen.getByText(mockCiv.civName);
      expect(civEl).toBeInTheDocument();
    });

    test('removes animation class when animation ends', () => {
      const mockCiv = getMockCiv();

      const mockStore = configureMockStore();

      const { container: civContainer } = render(
        <Provider store={mockStore}>
          <Civ
            civ={mockCiv}
            isDrafted={true}
            isDraftable={true}
            isInPool={false}
          />
        </Provider>
      );

      const mainContentEl = civContainer.querySelector('.civ-main-content');
      fireEvent.animationEnd(mainContentEl!);
      expect(mainContentEl!.classList).not.toContain('highlight-drafted');
    });
  });
});
