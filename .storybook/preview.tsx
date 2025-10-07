import type { Preview } from '@storybook/react-vite';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Getting Started', ['Welcome', 'Chnagelog'], 'Charts', 'Components'],
      },
    },
  },

  decorators: [
    Story => {
      return <Story />;
    },
  ],
};

export default preview;
