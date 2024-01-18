const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    mode: 'production',
    entry: './index.js',
  
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'final.js',
    },
    target: 'node',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

    

  };