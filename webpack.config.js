const path = require('path');
const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');

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

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i, // find any image file with a .jpg extension
        // use is where the actual loader is implemented
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function (url) {
                return url.replace('./', '/icons');
              },
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disable', // the report outputs to an HTML file in the dist folder. Set to 'static' to run and 'disable' to stop
    }),
    new WebpackPwaManifest({
      name: 'Budget Tracker',
      short_name: 'Budget Tracker',
      description:
        'A budget tracker where users can add expenses and deposits to their budget with or without a connection.',
      start_url: '.',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve('public/images/icons/icon-72x72.png'),
          sizes: '72x72',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
        {
          src: path.resolve('public/images/icons/icon-96x96.png'),
          sizes: '96x96',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
        {
          src: path.resolve('public/images/icons/icon-128x128.png'),
          sizes: '128x128',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
        {
          src: path.resolve('public/images/icons/icon-144x144.png'),
          sizes: '144x144',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
        {
          src: path.resolve('public/images/icons/icon-152x152.png'),
          sizes: '152x152',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
        {
          src: path.resolve('public/images/icons/icon-192x192.png'),
          sizes: '192x192',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
        {
          src: path.resolve('public/images/icons/icon-384x384.png'),
          sizes: '384x384',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
        {
          src: path.resolve('public/images/icons/icon-512x512.png'),
          sizes: '512x512',
          type: 'image/png',
          destination: path.join('public', 'icons'),
        },
      ],
    }),
  ],

  mode: 'development',

  devServer: {
    static: './',
  },
};

// Combined 'module.exports'
module.exports = [frontConfig, backConfig];
