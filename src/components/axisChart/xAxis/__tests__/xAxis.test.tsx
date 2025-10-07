import { render, screen } from '@testing-library/react';

import { XAxis } from '../xAxis';

describe('XAxis Component', () => {
  it('renders without crashing', () => {
    render(
      <XAxis dataTestId="graphics-document" tickValues={[{ position: 100, value: 'Tick 1' }]} />
    );
    expect(screen.getByTestId('graphics-document')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    render(
      <XAxis dataTestId="graphics-document" tickValues={[{ position: 100, value: 'Tick 1' }]} />
    );
    expect(screen.getByTestId('graphics-document')).toBeInTheDocument();
  });

  it('renders tick elements based on tickValues', () => {
    const tickValues = [
      { position: 100, value: 'Tick 1' },
      { position: 200, value: 'Tick 2' },
    ];
    render(<XAxis tickValues={tickValues} />);
    tickValues.forEach(tick => {
      expect(screen.getByText(tick.value)).toBeInTheDocument();
    });
  });
});
