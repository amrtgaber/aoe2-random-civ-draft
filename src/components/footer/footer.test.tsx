import { render } from '@testing-library/react';

import { Footer } from '.';

describe('footer component', () => {
  test('renders footer', () => {
    const { container: footerContainer } = render(<Footer />);
    const footerEl = footerContainer.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
  });
});
