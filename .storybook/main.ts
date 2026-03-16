import { mergeRsbuildConfig } from '@rsbuild/core';
import { dirname, resolve } from 'path';
import type { StorybookConfig } from 'storybook-react-rsbuild';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../.storybook/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  staticDirs: ['./assets', '../assets'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    'storybook-addon-rslib',
  ],
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
  rsbuildFinal: (rsbuildConfig) =>
    mergeRsbuildConfig(rsbuildConfig, {
      tools: {
        rspack: {
          resolve: {
            alias: {
              '@': resolve(__dirname, '../src'),
              '@/charts': resolve(__dirname, '../src/charts'),
              '@/components': resolve(__dirname, '../src/components'),
              '@/utils': resolve(__dirname, '../src/utils'),
            },
          },
        },
      },
    }),
  docs: {
    defaultName: 'Documentation',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
};
export default config;
