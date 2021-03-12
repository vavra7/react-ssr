module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: require.resolve('style-loader')
        },
        {
          loader: require.resolve('css-loader')
        },
        {
          loader: require.resolve('sass-loader')
        }
      ],
    });
    return config;
  }
};
