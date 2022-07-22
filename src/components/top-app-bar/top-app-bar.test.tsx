import React from 'react';
import { render, screen } from '@testing-library/react';
import TopAppBar from './';

test('renders top app bar', () => {
  const { container } = render(<TopAppBar />);
  const topAppBarEl = container.querySelector('.top-app-bar');
  expect(topAppBarEl).toBeInTheDocument();
});
