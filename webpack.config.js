const path = require('path');
const nodeExternals = require('webpack-node-externals');

// Main configuration object to tell webpack what to do
const backConfig = {
  target: 'node',
  entry: {
    app: './server.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  externals: nodeExternals(),
};

const frontConfig = {
  name: 'client',
  target: 'web',
  // relative path to the clients code
  entry: {
    app: './public/js/index.js',
  }, // root of the bundle
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].bundle.js',
  }, // take the entry point, bundle the code and output the bundled code to a specified folder
  mode: 'development',
  devServer: {
    static: './',
  },
};

// Combined 'module.exports'
module.exports = [frontConfig, backConfig];
