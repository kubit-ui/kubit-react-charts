# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
