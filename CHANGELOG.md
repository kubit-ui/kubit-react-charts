# @kubit-ui-web/react-charts

## 1.11.4

### Patch Changes

- Update peerdependencies

  PR: #23

## 1.11.3

### Patch Changes

- PieChart disappearing on resize when halfChart=true

  PR: #22

## 1.11.2

### Patch Changes

- Add mouse event handlers to Bar component for tooltip support

  PR: #21

## 1.11.1

### Patch Changes

- Add changesets and update packages

  PR: #20

## Changelog

All notable changes to this project will be documented in this file.

This project uses [Changesets](https://github.com/changesets/changesets) for automated version management and changelog generation. The changelog is automatically updated when releases are published.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.5.0] - 2025-11-19

### Added

#### Error Handling System

- **PieChart Error Accumulator**: Implemented comprehensive error accumulation system for PieChart components
  - Added error validation for canvas dimensions (width and height must be > 0)
  - Added dataKey existence validation in dataset
  - Added validation for segment values (numeric, non-negative)
  - Added validation for segment names (non-empty required property)
  - Added validation for total values (must be > 0)
  - Added radius validation (must be positive number)
  - Added innerRadius validation (must be non-negative number)
  - Added innerRadius < radius constraint validation
  - Implemented `onErrors` callback prop for error handling
  - Added error builders: `buildPieDataKeyNotFoundError`, `buildEmptyDataArrayError`, `buildInvalidTotalError`, `buildSegmentValueError`, `buildSegmentNegativeValueError`, `buildInvalidGroupError`, `buildInvalidRadiusError`, `buildInvalidInnerRadiusError`, `buildInnerRadiusOutOfRangeError`
  - Added error types: `PIE_CHART_CONTEXT_ERROR`, `PIE_CHART_PATH_ERROR`, `PIE_CHART_SEGMENT_ERROR`
  - Added PieChart-specific error messages and constants

- **Interactive Error Handling Story**: Added comprehensive Storybook story demonstrating PieChart error handling
  - Real-time error detection visualization with error panel
  - Multiple error scenarios demonstration (missing dataKey, empty data, negative values, invalid values, missing names, zero totals)
  - Interactive UI showing error count and categorization by component type
  - Fallback UI demonstration for error states

- **Chart Constants**: Extended chart defaults with PieChart-specific constants
  - Added `PIE_CHART_DEFAULTS` for radius percentage and minimum segments
  - Added `PIE_CHART_FALLBACK_DATA` for fallback data keys, segment names, and values

### Changed

#### Performance Optimizations

- **useEffect Dependencies Optimization**: Optimized React hooks across chart components
  - BarChart: Optimized `barChartPath.tsx` and `barChartSeparator.tsx` dependencies by extracting stable primitive values
  - LineChart: Optimized `lineChartPath.tsx`, `lineChartSeparator.tsx`, and `lineChartProjection.tsx` dependencies
  - Extracted computed values (numeric conversions, array accesses) outside useEffect to ensure stable references
  - Removed unnecessary function dependencies (`addError`) from dependency arrays

#### Documentation

- **Storybook Argtypes**: Standardized `onErrors` prop descriptions across all chart components
  - Updated BarChart argtypes with consistent error callback documentation
  - Updated LineChart argtypes with consistent error callback documentation
  - Added PieChart argtypes with comprehensive error callback documentation
  - Unified documentation format across all chart types

## [1.4.0] - 2025-11-18

### Added

#### CI/CD Enhancements

- **Chromatic Visual Regression Testing Integration**: Automated visual regression testing in CI/CD pipeline
  - Added Chromatic build and publish steps to auto-publish GitHub Actions workflow
  - Integrated visual testing with automatic change acceptance during releases
  - Enhanced release process to include Storybook visual regression validation
  - Ensures design system consistency and catches visual regressions before production

### Changed

#### Security & Configuration

- **Environment Variable Security**: Improved token management and security practices
  - Replaced hardcoded Chromatic project token with environment variable (`$CHROMATIC_PROJECT_TOKEN`)
  - Enhanced GitHub Actions workflow to use secrets for sensitive tokens
  - Updated workflow documentation with comprehensive secret configuration guide
  - Improved error handling and notifications for missing or invalid tokens

#### Developer Experience

- **Enhanced Release Notifications**: Improved CI/CD feedback and status reporting
  - Updated success notifications to include Chromatic publication status
  - Enhanced error notifications with Chromatic-specific troubleshooting guidance
  - Added comprehensive secret configuration documentation
  - Improved workflow status visibility for visual regression testing

### Infrastructure

- **GitHub Actions Workflow Updates**: Enhanced automated release pipeline
  - Added Storybook build step specifically for Chromatic integration
  - Implemented automatic visual regression testing during releases
  - Enhanced workflow resilience with proper error handling for Chromatic steps
  - Updated release process documentation with new requirements

## [1.3.0] - 2025-11-17

### Added

#### Logger System

- **Centralized Logging Utility**: New logging system with configurable log levels (debug, info, warn, error)
  - Production-safe logging (automatically disabled in production builds)
  - Configurable logger with customizable prefix and minimum log level
  - SSR-compatible environment detection using globalThis
  - Tree-shakable implementation optimized for build tools

#### SSR (Server-Side Rendering) Support

- **Complete SSR Compatibility**: New utilities for server-side rendering support
  - Safe browser API access utilities (`safeWindow`, `safeDocument`, `safeQuerySelector`)
  - Environment detection functions (`isBrowser`, `isServer`)
  - Safe execution wrappers with fallback support (`safeExecute`, `safeExecuteWithFallback`)
  - SVG creation utilities compatible with server environments (`createSVGElement`)
  - Safe `getComputedStyle` access for server-side rendering (`safeGetComputedStyle`)

## [1.2.0] - 2025-11-14

### Added

#### Error Management System

- **Centralized Error Accumulator**: Implemented a higher-order function with closures for centralized error handling across chart components
  - Creates isolated error state per chart instance using `Map<string, ChartError[]>`
  - Provides `addError`, `getAccumulatedErrors`, and `clearErrors` functions
  - State maintained in closure (not React state) to avoid unnecessary re-renders
  - Supports multiple internal components reporting errors centrally

#### Chart Component Enhancements

- **LineChart Error Integration**:
  - Modified `buildLineContextValue` to include error accumulator functions
  - Updated `LineChartContextType` with new error handling methods
  - Child components can now report errors via context
  - Replaced existing `useEffect` error handling with accumulated error reporting

- **BarChart Error Integration**:
  - Modified `buildBarContextValues` to include error accumulator functions
  - Updated `BarChartContextType` with new error handling methods
  - Consistent implementation with LineChart for unified error management
  - Maintains backward compatibility with existing `onErrors` callbacks

#### Utility Functions

- **Error Validation System**:
  - Chart-specific error builders for LineChart and BarChart in `src/utils/buildErrors/charts/`
  - Comprehensive error messages for different error scenarios
  - Type-safe error definitions and validation
  - Centralized chart defaults in `src/charts/constants/chartDefaults.ts`

#### Developer Experience

- **Enhanced Testing**:
  - Added comprehensive test suites for `createErrorAccumulator` utility
  - Added test cases for LineChart and BarChart error integration
  - Updated existing error handling tests to cover new functionality
  - All error accumulator test cases passing

- **Documentation & Stories**:
  - Added Storybook stories demonstrating error handling
  - JSDoc comments for all public error handling APIs
  - Self-documenting code with clear variable/function names
  - Enhanced TypeScript type definitions

### Technical Details

- **Compound Components Pattern**: Foundation for scalable error management across all chart components with multiple internal components (XAxis, YAxis, Path, Separator, etc.) reporting errors centrally
- **Performance Optimized**: Closure-based state management prevents React re-renders while maintaining full compatibility
- **Backward Compatible**: 100% compatibility with existing `onErrors` callback implementations
- **Independent Instances**: Each chart instance maintains its own isolated error accumulator

### Testing

- ✅ Unit tests for error accumulator utility
- ✅ Integration tests for LineChart error handling
- ✅ Integration tests for BarChart error handling
- ✅ Existing error callback compatibility tests
- ✅ Performance validation (no unnecessary re-renders)
- ✅ ESLint and code quality checks passing

## [1.1.0] - 2025-11-12

### Updated

- **Testing Mocks**: Refactored `ResizeObserver` mock implementation in `zoomArea.test.js` to use a class-based approach for better clarity and maintainability.
- **Hexagon & Pentagon Tests**: Updated imports in `hexagon.test.tsx` and `pentagon.test.tsx` to ensure proper mocking and testing of shape point calculations.
- **Vitest Imports**: Standardized Vitest imports across test files for consistency.
- **Storybook**: versions updated to latest compatible versions for improved documentation experience.

## [1.0.0] - 2025-10-23

🎉 **Official Release** - First stable version of Kubit React Charts library with comprehensive charting components and full TypeScript support.

### Added

#### Core Chart Components

- **BarChart**: Full-featured bar chart component with horizontal and vertical orientations
- **LineChart**: Interactive line chart with smooth curves and data point highlighting
- **PieChart**: Responsive pie chart with customizable segments and labels

#### Interactive Features

- **Hover Effects**: Built-in hover states for all chart elements with `useHover` hook
- **Focus Management**: Keyboard navigation support with `useFocus` hook
- **Zoom Functionality**: Interactive zoom area component for detailed data exploration

#### SVG Components Library

- **AxisChart**: Configurable X and Y axis components with custom tick formatting
- **Bar**: Reusable bar elements with animation support
- **ChartText**: Text rendering component with automatic positioning
- **Line**: SVG line components with smooth path generation
- **Node**: Interactive data point components
- **Path**: Custom SVG path rendering utilities
- **Plot**: Main plotting area component
- **SvgContainer**: Responsive SVG wrapper with viewBox management
- **Tick**: Customizable axis tick components

#### Utility Functions

- **Data Processing**: Functions for coordinate calculation, data fingerprinting, and axis data generation
- **Text Rendering**: Advanced text bounds calculation and space adjustment utilities
- **Styling**: CSS gradient to SVG conversion and className utilities
- **Positioning**: Comprehensive coordinate system and tick positioning utilities
- **Error Handling**: Built-in error validation and user-friendly error messages

#### Developer Experience

- **TypeScript Support**: Full TypeScript definitions for all components and utilities
- **Storybook Documentation**: Interactive component documentation with live examples
- **Testing Suite**: Comprehensive test coverage with Vitest and custom render utilities
- **Modern Build System**: Vite-based build with optimized bundle output

#### Configuration & Tooling

- **ESLint Configuration**: Modern ESLint setup with TypeScript support
- **Prettier Integration**: Consistent code formatting across the project
- **Babel Configuration**: Optimized JavaScript compilation
- **Stylelint**: CSS/SCSS linting configuration
- **HTML Validation**: Built-in HTML validation for generated markup

### Technical Details

- Built with React 18+ and TypeScript 5+
- D3.js integration for mathematical calculations
- Responsive design with CSS Grid and Flexbox
- Accessibility features following WCAG guidelines
- Tree-shakable modular architecture
- Support for both CommonJS and ES modules
