const path = require('path');
const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Backend configuration
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

// Frontend configuration
const frontConfig = {
  name: 'client',
  target: 'web',
  // relative path to the clients code
  entry: {
    app: './public/js/index.js',
    idb: './public/js/idb.js',
  }, // root of the bundle
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].bundle.js',
  }, // take the entry point, bundle the code and output the bundled code to a specified folder

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disable', // the report outputs to an HTML file in the dist folder. Set to 'static' to run and 'disable' to stop
    }),
  ],

  mode: 'development',

  devServer: {
    static: './public',
  },
};

// Combined 'module.exports'
module.exports = [frontConfig, backConfig];
