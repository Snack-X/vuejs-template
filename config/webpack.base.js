// check NODE_ENV environment variable to check current mode
// this is injected from webpack.dev.js or webpack.prod.js
const isDev = process.env.NODE_ENV === 'development';
const path = require('path');

// styles don't need to be extracted on development mode
// so conditionally use style-loader or mini-css-extract-plugin's loader
const styleLoader = isDev ? 'style-loader' : require('mini-css-extract-plugin').loader;
// passes all loaders defined by webpack config to vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// resolves directory relative to root directory
function resolve(dir = '') {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: resolve(),
  entry: {
    // define `app` entry, multiple entries can be defined
    app: './src/main.js',
  },
  output: {
    // output all files to dist directory
    path: resolve('dist/'),
    // but path are relative to / in HTML
    publicPath: '/',
    // filenames are appended with its hash
    filename: '[name].[contenthash:7].js',
  },
  resolve: {
    // if require is called without extensions, use these extensions in order to require file
    // this is required for vue single file components
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // vue components are resolved as vue bundle script
      'vue$': 'vue/dist/vue.esm.js',
      // @ acts as a magic directory which resolves to the src directory
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      // all js files (except for the node modules) are handled by babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ],
      },
      // all vue single file components are handled by vue loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // elements below are transformed as require / import for these attributes
          // it will be handled by url loader later
          transformToRequire: {
            video: [ 'src', 'poster' ],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
          },
        },
      },
      // css files are handled by style loader and css loader
      {
        test: /\.css$/,
        use: [ styleLoader, 'css-loader' ],
      },
      // especially, sass/scss files are additionally handled by sass loader
      {
        test: /\.s[ac]ss$/,
        use: [ styleLoader, 'css-loader', 'sass-loader' ],
      },
      // if these file types are imported:
      //   if size is bigger than limit bytes, separate file will be generated
      //   else, it is included as base64 data uri
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/images/[name].[hash:7].[ext]',
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
  ],
};
