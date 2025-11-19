import { useCallback, useState } from 'react';

import { type ChartErrorCollection, normalizeToArray } from '@/types/errors.type';

import { PieChart } from '../../pieChart';
import type { DataItem } from '../../pieChart.type';

// Problematic data to trigger validation errors
const PROBLEMATIC_DATA: DataItem = {
  invalidKey: [
    { name: 'Valid Segment', value: 100 },
    { name: 'Another Valid', value: 50 },
  ],
  invalidValues: [
    { name: 'Valid Value', value: 100 },
    { name: 'Invalid Value', value: 'not-a-number' as unknown as number }, // Invalid type
  ],
  missingDataKey: [], // Empty array to trigger error
  missingName: [
    { name: 'Valid Segment', value: 100 },
    { name: '', value: 50 }, // Missing name
  ],
  negativeValues: [
    { name: 'Positive', value: 200 },
    { name: 'Negative', value: -50 }, // Negative value
  ],
  zeroTotal: [
    { name: 'Zero Value 1', value: 0 },
    { name: 'Zero Value 2', value: 0 },
  ],
};

interface ErrorInfoState {
  errors: ChartErrorCollection;
  hasErrors: boolean;
}

export const PieChartWithErrorHandlingWithHooks = (): JSX.Element => {
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
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🥧❌</div>
            <h3 style={{ color: '#6c757d', margin: '0 0 12px 0' }}>
              Pie Chart Cannot Render Due to Multiple Errors
            </h3>
            <p style={{ color: '#6c757d', fontSize: '13px', margin: '0' }}>
              Review the error panel above to see detailed diagnostics for each component.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🥧✅</div>
            <h3 style={{ color: '#28a745', margin: '0' }}>Chart would render</h3>
            <p style={{ color: '#6c757d', fontSize: '13px', margin: '8px 0 0 0' }}>
              No errors detected - chart rendering successfully
            </p>
          </div>
        )}
      </div>

      {/* Hidden PieChart for error detection */}
      <div style={{ display: 'none' }}>
        <PieChart data={PROBLEMATIC_DATA} onErrors={handleChartError}>
          {/* Test missing dataKey */}
          <PieChart.Path dataKey="nonExistentKey" fill="#3498db" />

          {/* Test empty data array */}
          <PieChart.Path dataKey="missingDataKey" fill="#e74c3c" />

          {/* Test negative values */}
          <PieChart.Path dataKey="negativeValues" fill="#2ecc71" />

          {/* Test invalid values (non-numeric) */}
          <PieChart.Path dataKey="invalidValues" fill="#f39c12" />

          {/* Test missing name property */}
          <PieChart.Path dataKey="missingName" fill="#9b59b6" />

          {/* Test zero total */}
          <PieChart.Path dataKey="zeroTotal" fill="#1abc9c" />
        </PieChart>
      </div>
    </div>
  );
};
