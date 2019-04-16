module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 11 },
      },
    ],
  ],
  ignore: ['**/*.test.js', '**/__mocks__'],
}
