import { render } from '@/tests/render/render';

import { ForeignObject } from '../foreignObject';

describe('ForeignObject', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ForeignObject dataTestId="foreignObject" />);
    const foreignObject = getByTestId('foreignObject');
    expect(foreignObject).toBeInTheDocument();
  });
});
