import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async config => {
    if (config && config.module && config.module.rules) {
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      const imageRule = config.module.rules.find((rule) => rule?.['test']?.test('.svg'));
      if (imageRule) {
        imageRule['exclude'] = /\.svg$/;
      }
    
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      config.module.rules.push({
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      });
    } else {
      console.error('No module.rules found in webpack config');
    }
    return config;
  },
};
export default config;
