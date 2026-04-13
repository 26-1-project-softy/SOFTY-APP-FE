module.exports = api => {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@emotion/babel-plugin',
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
      ],
    ],
  };
};
