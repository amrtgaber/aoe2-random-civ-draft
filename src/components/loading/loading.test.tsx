import { render } from '@testing-library/react';
import { Loading } from '.';

it('renders loading', () => {
  const { container: loadingContainer } = render(
    <Loading componentName='Test' />
  );
  const loadingEl = loadingContainer.querySelector('.loading-text');
  expect(loadingEl).toBeInTheDocument();
});
