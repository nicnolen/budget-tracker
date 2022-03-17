const path = require('path');

// Main configuration object to tell webpack what to do
module.exports = {
  entry: './assets/js/script.js', // root of the bundle. Give relative path to client's code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  }, // take the entry point, bundle the code and output the bundled code to a specified folder
  mode: 'development', // mode you want webpack to run in
};
