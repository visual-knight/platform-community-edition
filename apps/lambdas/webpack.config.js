const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    processTestsessionImage:
      './apps/lambdas/src/processTestsessionImage/index.ts',
    createDiff: './apps/lambdas/src/createDiff/index.ts'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
