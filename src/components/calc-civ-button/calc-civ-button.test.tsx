import React from 'react';
import { render, screen } from '@testing-library/react';
import CalcCivButton from '.';

test('renders calc civ button', () => {
  const { container: calcCivButtonContainer } = render(<CalcCivButton />);
  const calcCivButtonEl = calcCivButtonContainer.querySelector('.calc-civ-button');
  expect(calcCivButtonEl).toBeInTheDocument();
});
