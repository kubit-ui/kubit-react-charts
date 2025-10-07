import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tjx|tdx|tsx))',
    '../.storybook/**/*.@(mdx|stories.@(js|jsx|ts|tjx|tdx|tsx))',
  ],
  staticDirs: ['./assets', '../assets'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
};
export default config;
