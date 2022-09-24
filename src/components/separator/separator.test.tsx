import { render } from '@testing-library/react';

import { Separator } from '.';

describe('separator component', () => {
  it('renders separator', () => {
    const { container: separatorContainer } = render(<Separator />);
    const separatorEl = separatorContainer.querySelector('.separator');
    expect(separatorEl).toBeInTheDocument();
  });
});
