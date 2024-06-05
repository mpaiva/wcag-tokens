const path = require('path');

module.exports = {
  entry: './src/figma-scripts/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            configFile: 'tsconfig.json'  
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  mode: 'production', // Consider using 'production' for final builds
  devtool: false
};
