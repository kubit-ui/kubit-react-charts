# Kubit React Charts

<p align="center">
  <img src="./assets/readme_logo.png" alt="Kubito" width="120" height="120" />
</p>

<p align="center">
  <strong>A modern React charting library</strong><br/>
  Reusable, accessible, and interactive SVG components for data visualization
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?logo=react" alt="React version" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript" alt="TypeScript version" />
  <img src="https://img.shields.io/badge/license-ISC-green" alt="License" />
</p>

---

## Table of Contents

### For Library Users

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Available Components](#available-components)
- [API Reference](#api-reference)

### For Contributors & Developers

- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Development Scripts](#development-scripts)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

---

# For Library Users

## Features

**Composable**: Modular architecture where each chart is composed of specialized elements  
**Performant**: Optimized SVG rendering with React 18  
**Accessible**: WCAG compliant with keyboard navigation support  
**Customizable**: Flexible styling and granular configurations  
**Responsive**: Adaptable to different screen sizes  
**TypeScript**: Fully typed for better developer experience  
**Tested**: Complete coverage with Vitest and Testing Library

## Installation

### NPM

```bash
npm install @kubit-ui-web/react-charts
```

### Yarn

```bash
yarn add @kubit-ui-web/react-charts
```

### Peer Dependencies

This library requires React as a peer dependency:

```bash
npm install react react-dom
# or
yarn add react react-dom
```

**Compatible versions:**

- React: ^18.3.1
- React DOM: ^18.3.1

## Quick Start

### Importing Components

```typescript
// Import complete charts
import { BarChart, LineChart, PieChart } from "@kubit-ui-web/react-charts";

// Import specific components
import { Plot, Path, Node } from "@kubit-ui-web/react-charts/components";

// Import types
import type { ChartData, BarOrientation } from "@kubit-ui-web/react-charts/types";
```

### LineChart Example

```tsx
import React from "react";
import { LineChart } from "@kubit-ui-web/react-charts";

const data = [
  { year: "2020", sales: 100, profit: 20 },
  { year: "2021", sales: 150, profit: 35 },
  { year: "2022", sales: 180, profit: 45 },
  { year: "2023", sales: 200, profit: 60 },
];

function MyLineChart() {
  return (
    <LineChart data={data} xKey="year" width="100%" height="400px">
      <LineChart.Path dataKey="sales" stroke="#0078D4" strokeWidth={2} />
      <LineChart.Path dataKey="profit" stroke="#FF6B35" strokeWidth={2} />
      <LineChart.XAxis position="BOTTOM" showTickLines />
      <LineChart.YAxis position="LEFT" valueFormatter={(val) => `$${val}k`} />
    </LineChart>
  );
}
```

### BarChart Example

```tsx
import React from "react";
import { BarChart, BarOrientation } from "@kubit-ui-web/react-charts";

const data = [
  { category: "A", value: 30 },
  { category: "B", value: 45 },
  { category: "C", value: 25 },
  { category: "D", value: 60 },
];

function MyBarChart() {
  return (
    <BarChart
      data={data}
      pKey="category"
      orientation={BarOrientation.VERTICAL}
      gapBetweenBars={5}
      width="100%"
      height="400px"
    >
      <BarChart.Path
        dataKey="value"
        dataIdx={0}
        barConfig={{
          barWidth: 40,
          singleConfig: [{ color: "#0078D4", coverage: 100 }],
        }}
      />
      <BarChart.XAxis position="BOTTOM" />
      <BarChart.YAxis position="LEFT" />
    </BarChart>
  );
}
```

## Available Components

### Main Charts

| Component       | Description                   | Use Cases                           |
| --------------- | ----------------------------- | ----------------------------------- |
| **`LineChart`** | Multi-series line chart       | Time trends, metric comparisons     |
| **`BarChart`**  | Horizontal/vertical bar chart | Category comparisons, discrete data |
| **`PieChart`**  | Circular chart with segments  | Part-to-whole relationships         |

### Base Components

| Component       | Description                   |
| --------------- | ----------------------------- |
| **`Plot`**      | Base SVG container for charts |
| **`Path`**      | Customizable SVG path element |
| **`Node`**      | Interactive points in charts  |
| **`Line`**      | Lines and connectors          |
| **`Bar`**       | Rectangular bars              |
| **`ChartText`** | Formatted text for labels     |

### Available Hooks

| Hook           | Description                              |
| -------------- | ---------------------------------------- |
| **`useFocus`** | Focus state management for accessibility |
| **`useHover`** | Hover detection with callbacks           |

## API Reference

For detailed API documentation, component props, and advanced examples, please refer to our individual component READMEs:

- [BarChart Documentation](./app/src/charts/barChart/README.md)
- [LineChart Documentation](./app/src/charts/lineChart/README.md)
- [PieChart Documentation](./app/src/charts/pieChart/README.md)

---

# For Contributors & Developers

<p align="center">
  <img src="./app/assets/KubitoJumping.gif" alt="Kubito jumping" width="100" />
</p>

## Development Setup

### Environment Requirements

- Node.js >= 16
- Yarn (recommended) or npm
- Git

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/kubit-ui/kubit-react-charts
   cd web-ui-charts/app
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn start
   ```

This will launch Storybook at `http://localhost:6006` where you can interact with all components.

## Project Architecture

```
src/
├── charts/           # High-level chart components
│   ├── barChart/     # BarChart and subcomponents
│   ├── lineChart/    # LineChart and subcomponents
│   └── pieChart/     # PieChart and subcomponents
├── components/       # Reusable SVG base components
│   ├── plot/         # Main SVG container
│   ├── path/         # Path elements
│   ├── node/         # Interactive points
│   ├── line/         # Lines and connectors
│   └── ...
├── hooks/            # Custom hooks
├── types/            # TypeScript definitions
├── utils/            # Shared utility functions
└── storybook/        # Storybook configuration and constants
```

### Composition Pattern

Each chart follows a consistent compositional pattern:

```typescript
const LineChart = Object.assign(LineChartStructure, {
  Path: LineChartPath,
  XAxis: LineChartXAxis,
  YAxis: LineChartYAxis,
  Separator: LineChartSeparator,
});
```

This pattern enables:

- **Flexibility**: Use only the components you need
- **Reusability**: Shared components between different charts
- **Extensibility**: Easy addition of new subcomponents

## Development Scripts

### Main Commands

```bash
# Start Storybook in development mode
yarn start

# Build library for production
yarn dist

# Run tests with coverage
yarn test

# Lint code with ESLint
yarn eslint

# Build Storybook for production
yarn build

# Run accessibility tests
yarn storybook:axe
```

### Build Commands

```bash
# Complete build (ESM + CJS)
yarn dist

# Build in watch mode
yarn dist:watch

# CommonJS only
yarn dist:cjs

# ES Modules only
yarn dist:esm
```

### Testing Commands

```bash
# Unit tests with UI
yarn vitest-report

# Storybook tests
yarn test-storybook

# ESLint only
yarn eslint --fix
```

## Contributing Guidelines

### Code Standards

- **TypeScript**: Fully typed code
- **ESLint**: Strict configuration with Kubit rules
- **Prettier**: Automatic code formatting
- **Testing**: Minimum 80% coverage

### Contribution Workflow

1. Create a feature branch from `main`
2. Develop following project conventions
3. Write tests for new features
4. Run `yarn test` to verify
5. Create Pull Request

### Conventions

- **Commits**: Use conventional commits
- **Components**: Follow existing composition pattern
- **Tests**: One test file per component
- **Stories**: Document all use cases

### Component Development Guidelines

Please refer to our [development instructions](./.github/copilot-instructions.md) for detailed guidelines on:

- Component structure and patterns
- Naming conventions
- TypeScript usage
- Error handling
- CSS and styling
- Accessibility requirements

## License

This project is licensed under the ISC License.

---

<p align="center">
  Made with ❤️ by the <strong>Kubit</strong> team <img src="./assets/kubito.png" alt="Kubito" width="15" height="15" />
</p>
