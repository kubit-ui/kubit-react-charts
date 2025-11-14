import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        'coverage/',
        'bundle/',
        'reports/',
        '__reports__/',
        '.storybook/',
        'src/**/types/**',
        'src/**/stories/**',
        'src/**/storybook/**',
        'src/**/designSystem/**',
        './vitest.setup.ts',
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/**/index.tsx',
        'src/**/*.styled.ts',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/storybook/**',
        'src/**/types/**',
        'src/**/designSystem/**',
        'src/**/stories/**',
        '.eslintrc.js',
        '.prettierrc.js',
        'depreKated-scanner.js',
        'stylelint.config.js',
        'vite.config.ts',
        'vitest.config.ts',
        'app/__reports__/test-coverage/lcov-report',
        'prettify.js',
      ],
      reporter: ['text', 'html', 'json', 'lcov'],
      reportsDirectory: '__reports__/test-coverage',
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    css: false,
    environment: 'jsdom', // Use jsdom for browser-like tests
    globals: true,
    include: ['**/__tests__/**/*.test.{js,ts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**', // Exclude all dist directories from testing
      '**/build/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
    outputFile: {
      html: '__reports__/report.html',
    },
    reporters: ['default', 'html'],
    setupFiles: './vitest.setup.ts',
  },
});
