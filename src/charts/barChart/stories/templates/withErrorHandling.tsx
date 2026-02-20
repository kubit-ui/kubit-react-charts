import { useCallback, useState } from 'react';

import { type ChartErrorCollection, normalizeToArray } from '@/types/errors.type';
import { Positions } from '@/types/position.enum';

import { BarChart, type BarChartIDataPoint } from '../../barChart';

// Problematic data to trigger validation errors
const PROBLEMATIC_DATA: BarChartIDataPoint[] = [
  { dogs: 150, revenue: -100, year: '2020' }, // Negative value
  { cats: 'invalid' as unknown as number, dogs: 250, year: '2021' }, // Invalid type
  { cats: 200, dogs: 300, year: '2022' }, // For testing non-existent dataKey
];

const barConfig = {
  barWidth: 50,
  singleConfig: [{ color: 'pink', coverage: 100 }],
};

interface ErrorInfoState {
  errors: ChartErrorCollection;
  hasErrors: boolean;
}

export const BarChartWithErrorHandlingWithHooks = (): React.JSX.Element => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfoState>({
    errors: {},
    hasErrors: false,
  });

  const handleChartError = useCallback((errors: ChartErrorCollection) => {
    setErrorInfo({
      errors,
      hasErrors: Object.keys(errors).length > 0,
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
        padding: '20px',
      }}
    >
      {/* Error panel */}
      <div
        style={{
          backgroundColor: errorInfo.hasErrors ? '#fff3cd' : '#d4edda',
          borderRadius: '16px',
          fontFamily:
            "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
          {errorInfo.hasErrors ? '⚠️ Errors detected' : '✅ No errors detected'}
        </h5>

        {errorInfo.hasErrors ? (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <strong>
                {Object.values(errorInfo.errors).reduce(
                  (total, errorValue) => total + normalizeToArray(errorValue).length,
                  0
                )}{' '}
                error(s) detected across {Object.keys(errorInfo.errors).length} component(s):
              </strong>
            </div>
            <div style={{ marginTop: '8px' }}>
              {Object.entries(errorInfo.errors).map(([errorType, errorValue]) => {
                const errorArray = normalizeToArray(errorValue);
                return (
                  <div key={errorType} style={{ marginBottom: '12px' }}>
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        padding: '8px',
                      }}
                    >
                      <strong>📍 {errorType} </strong>
                      <span
                        style={{
                          backgroundColor: '#dc3545',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          marginLeft: '8px',
                          padding: '2px 6px',
                        }}
                      >
                        {errorArray.length} error{errorArray.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    {errorArray.map((error, index) => (
                      <div
                        key={`${errorType}-${error?.error?.message || 'unknown'}-${Date.now()}-${Math.random()}`}
                        style={{
                          backgroundColor: '#fff5f5',
                          borderLeft: '3px solid #dc3545',
                          color: '#721c24',
                          fontSize: '13px',
                          marginBottom: '4px',
                          marginLeft: '10px',
                          padding: '6px 8px',
                        }}
                      >
                        <span style={{ fontWeight: 'bold' }}>#{index + 1}:</span>{' '}
                        {error?.error?.message || 'Unknown error'}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Chart area with explanatory message when errors prevent rendering */}
      <div
        style={{
          alignItems: 'center',
          border: '2px dashed #dee2e6',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          fontFamily:
            "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          gap: '16px',
          height: '300px',
          justifyContent: 'center',
          maxWidth: '600px',
          padding: '20px',
          width: '100%',
        }}
      >
        {errorInfo.hasErrors ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊❌</div>
            <h3 style={{ color: '#6c757d', margin: '0 0 12px 0' }}>
              Bar Chart Cannot Render Due to Multiple Errors
            </h3>
            <p style={{ color: '#6c757d', fontSize: '13px', margin: '0' }}>
              Review the error panel above to see detailed diagnostics for each component.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊✅</div>
            <h3 style={{ color: '#28a745', margin: '0' }}>Chart would render</h3>
            <p style={{ color: '#6c757d', fontSize: '13px', margin: '8px 0 0 0' }}>
              No errors detected - chart rendering successfully
            </p>
          </div>
        )}
      </div>
      {/* Hidden BarChart for error detection */}
      <div style={{ display: 'none' }}>
        <BarChart
          data={PROBLEMATIC_DATA}
          orientation="VERTICAL"
          pKey="year"
          onErrors={handleChartError}
        >
          {/* Data points with negative values */}
          <BarChart.Path barConfig={barConfig} dataIdx={0} dataKey="revenue" order={0} />
          {/* Data point with NaN value */}
          <BarChart.Path barConfig={barConfig} dataIdx={1} dataKey="cats" order={1} />
          <BarChart.XAxis
            key="x"
            ariaLabel="Year"
            position={Positions.BOTTOM}
            showTickLines={true}
            stroke="black"
            strokeWidth="0.1"
            tickText={{ fontSize: 1, textAnchor: 'middle' }}
            tickValues={{
              custom: { values: ['2023'] }, // Only 1 value to trigger insufficient data error
            }}
          />
          <BarChart.YAxis
            key="y"
            ariaLabel="Rabbits"
            position={Positions.LEFT}
            showTickLines={true}
            stroke="black"
            strokeWidth="0.1"
            tickText={{ fontSize: 1, textAnchor: 'middle' }}
            tickValues={{
              numeric: { max: 20, min: 20, step: 1 }, // min = max configuration to trigger error
            }}
          />
          <BarChart.Separator areaSeparator={{ fill: 'rgba(255,0,0,0.1)' }} xBreakAxis="2025" />
        </BarChart>
      </div>
    </div>
  );
};
