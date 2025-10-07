import { useCallback, useState } from 'react';

import type { ChartErrorCollection } from '@/types/errors.type';
import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

// Problematic data, just one entry to trigger an error
const PROBLEMATIC_DATA = [{ cats: 20, year: '2023' }];

interface ErrorInfoState {
  hasErrors: boolean;
  errors: ChartErrorCollection;
}

export const LineChartWithErrorHandlingWithHooks = (): JSX.Element => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfoState>({
    errors: {},
    hasErrors: false,
  });

  const handleChartError = useCallback((errors: ChartErrorCollection) => {
    setErrorInfo({
      errors,
      hasErrors: true,
    });
  }, []);

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '600px',
      }}
    >
      {/* Error panel */}
      <div
        style={{
          backgroundColor: errorInfo.hasErrors ? '#fff3cd' : '#d4edda',
          borderRadius: '16px',
          padding: '12px',
          width: 'fit-content',
        }}
      >
        <h5
          style={{
            color: errorInfo.hasErrors ? '#856404' : '#155724',
            margin: '0',
          }}
        >
          {errorInfo.hasErrors ? '⚠️ Detected Error' : '✅ No errors detected'}
        </h5>

        {errorInfo.hasErrors ? (
          <div>
            {Object.entries(errorInfo.errors).map(([errorType, error]) => (
              <div key={errorType}>
                {errorType}
                <br />
                {error.error?.toString()}
                <br />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <LineChart data={PROBLEMATIC_DATA} xKey="year" onErrors={handleChartError}>
        <LineChart.Path dataKey="cats" stroke="#0078D4" strokeWidth="0.3" tabIndex={0} />
        <LineChart.XAxis
          ariaLabel="XAxis"
          position={Positions.BOTTOM}
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
        />
        <LineChart.YAxis
          ariaLabel="YAxis"
          position={Positions.LEFT}
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
        />
      </LineChart>
    </div>
  );
};
