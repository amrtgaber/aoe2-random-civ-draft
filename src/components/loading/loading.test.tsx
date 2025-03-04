import { render } from '@testing-library/react';

import { Loading } from '.';

describe('loading component', () => {
  test('renders loading', () => {
    const { container: loadingContainer } = render(
      <Loading componentName='Test' />,
    );

    const loadingEl = loadingContainer.querySelector('.loading-text');
    expect(loadingEl).toBeInTheDocument();
  });
});
