import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureMockStore } from '../../store/mock-state-service';

import { Snackbar } from '.';

describe('snackbar component', () => {
  test('renders snackbar hidden', () => {
    const mockStore = configureMockStore();

    const { container: snackbarContainer } = render(
      <Provider store={mockStore}>
        <Snackbar />
      </Provider>
    );
    const snackbarEl = snackbarContainer.querySelector('.snackbar');
    expect(snackbarEl).not.toBeInTheDocument();
  });

  test('renders snackbar shown', () => {
    const mockStore = configureMockStore({
      snackbar: {
        message: 'test message',
      },
    });

    const { container: snackbarContainer } = render(
      <Provider store={mockStore}>
        <Snackbar />
      </Provider>
    );

    const snackbarEl = snackbarContainer.querySelector('.snackbar');
    expect(snackbarEl).toBeInTheDocument();
  });

  test('should dismiss snackbar when clicked', () => {
    const mockStore = configureMockStore({
      snackbar: {
        message: 'test message',
      },
    });

    const { container: snackbarContainer } = render(
      <Provider store={mockStore}>
        <Snackbar />
      </Provider>
    );

    const snackbarEl = snackbarContainer.querySelector('.snackbar');
    fireEvent.click(screen.getByText('✖'));
    expect(mockStore.getState().snackbar.message).toBe('');
  });

  test('should dismiss snackbar when animation ends', () => {
    const mockStore = configureMockStore({
      snackbar: {
        message: 'test message',
      },
    });

    const { container: snackbarContainer } = render(
      <Provider store={mockStore}>
        <Snackbar />
      </Provider>
    );

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const snackbarEl = snackbarContainer.querySelector('.snackbar');
    fireEvent.animationEnd(snackbarEl!);
    expect(setTimeoutSpy).toHaveBeenCalled();
  });
});
