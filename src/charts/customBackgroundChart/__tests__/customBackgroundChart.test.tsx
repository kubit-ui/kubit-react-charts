import { screen } from '@testing-library/react';

import { render } from '@/tests/render/render';

import { CustomBackgroundChart } from '../customBackgroundChart';
import type { CustomBackgroundData } from '../customBackgroundChart.type';

const MOCK_BACKGROUND_URL =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20fill%3D%22%23f0f0f0%22%20width%3D%22800%22%20height%3D%22600%22%2F%3E%3C%2Fsvg%3E';

const mockViewBox = { height: 600, width: 800 };

const mockData: CustomBackgroundData<number> = {
  'point-a': { name: 'Point A', value: 100, x: 200, y: 150 },
  'point-b': { name: 'Point B', value: 200, x: 400, y: 300 },
};

describe('CustomBackgroundChart', () => {
  it('renders background and plots with correct structure', () => {
    const { container } = render(
      <CustomBackgroundChart
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={mockData}
        viewBox={mockViewBox}
      >
        <CustomBackgroundChart.Plot dataKey="point-a" fill="#0074D9" size={20} />
        <CustomBackgroundChart.Plot dataKey="point-b" fill="#FF4136" size={24} />
      </CustomBackgroundChart>,
      false
    );

    // Background image renders
    const backgroundImage = container.querySelector('[data-testid$="-background"]');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute('href', MOCK_BACKGROUND_URL);

    // Plots render with correct dataKey
    expect(container.querySelector('[data-testid$="-plot-point-a-circle"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid$="-plot-point-b-circle"]')).toBeInTheDocument();
  });

  it('applies viewBox to SVG container', () => {
    render(
      <CustomBackgroundChart
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={mockData}
        role="img"
        viewBox={mockViewBox}
      />,
      false
    );

    expect(screen.getByRole('img')).toHaveAttribute('viewBox', '0 0 800 600');
  });

  it('reports error when dataKey not found in data', () => {
    const onErrors = vi.fn();

    render(
      <CustomBackgroundChart
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={mockData}
        viewBox={mockViewBox}
        onErrors={onErrors}
      >
        <CustomBackgroundChart.Plot dataKey="non-existent" fill="#0074D9" size={20} />
      </CustomBackgroundChart>,
      false
    );

    expect(onErrors).toHaveBeenCalled();
    expect(onErrors.mock.calls[0][0]).toHaveProperty('CUSTOM_BACKGROUND_CHART_PLOT_ERROR');
  });

  it('reports error when data object is empty', () => {
    const onErrors = vi.fn();

    render(
      <CustomBackgroundChart
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={{}}
        viewBox={mockViewBox}
        onErrors={onErrors}
      />,
      false
    );

    expect(onErrors).toHaveBeenCalled();
    expect(onErrors.mock.calls[0][0]).toHaveProperty('CUSTOM_BACKGROUND_CHART_CONTEXT_ERROR');
  });

  it('uses dataKey as fallback when name is not provided', () => {
    const dataWithoutName: CustomBackgroundData<number> = {
      'test-point': { value: 100, x: 200, y: 150 },
    };

    render(
      <CustomBackgroundChart
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={dataWithoutName}
        viewBox={mockViewBox}
      >
        <CustomBackgroundChart.Plot dataKey="test-point" fill="#0074D9" size={20} />
      </CustomBackgroundChart>,
      false
    );

    // Default template uses dataKey as fallback for name
    expect(screen.getByLabelText('test-point, 100')).toBeInTheDocument();
  });

  it('supports generic types with formatAriaValue', () => {
    interface CustomValue {
      amount: number;
      currency: string;
    }

    const dataWithCustomValue: CustomBackgroundData<CustomValue> = {
      spain: {
        name: 'Spain',
        value: { amount: 1250000, currency: 'EUR' },
        x: 200,
        y: 350,
      },
    };

    render(
      <CustomBackgroundChart<CustomValue>
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={dataWithCustomValue}
        viewBox={mockViewBox}
      >
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="spain"
          fill="#0074D9"
          formatAriaValue={(v: CustomValue) => `${v.amount.toLocaleString()} ${v.currency}`}
          size={20}
        />
      </CustomBackgroundChart>,
      false
    );

    expect(screen.getByLabelText('Spain: 1,250,000 EUR')).toBeInTheDocument();
  });

  it('supports custom ariaLabel template', () => {
    render(
      <CustomBackgroundChart
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={mockData}
        viewBox={mockViewBox}
      >
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}} at ({{x}}, {{y}})"
          dataKey="point-a"
          fill="#0074D9"
          size={20}
        />
      </CustomBackgroundChart>,
      false
    );

    expect(screen.getByLabelText('Point A at (200, 150)')).toBeInTheDocument();
  });

  it('applies accessibility attributes', () => {
    render(
      <CustomBackgroundChart
        ariaLabel="Map chart"
        backgroundUrl={MOCK_BACKGROUND_URL}
        data={mockData}
        role="img"
        viewBox={mockViewBox}
      />,
      false
    );

    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Map chart');
  });
});
