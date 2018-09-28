# Explanation of structure

## `package.json`

### Dependencies

* Webpack Core
  * `webpack`
  * `webpack-cli` - webpack cli script, invoked by npm script
  * `webpack-merge` - merging two or more webpack configurations
  * `webpack-dev-server`

* Webpack Loaders / Plugins
  * HTML
    * `html-webpack-plugin` - reads html file and make output html file with required resources (JS, CSS, etc)
  * JS
    * `url-loader` - if file is imported from JS, it can be embedded into source code as base64, or optionally separated as file depending on size config
    * `babel-minify-webpack-plugin` - compresses JS bundle with Babel, ES6 compatible
  * CSS
    * `style-loader` - injects CSS into DOM
    * `css-loader` - handles all CSS
    * `sass-loader` - handles all Sass / SCSS
      * `node-sass` - compiles Sass/SCSS to CSS
    * `mini-css-extract-plugin` - extracts all CSS to separate CSS fill
    * `optimize-css-assets-webpack-plugin` - compresses CSS

* Babel
  * `@babel/core`
  * `@babel/plugin-transform-runtime` - TODO
    * `@babel/runtime` - TODO
  * `@babel/preset-env` - transforms JS depending on environments defined by browserslist strings
  * `@babel/preset-stage-3` - supports ECMASCript proposal stage 3

* Babel + Webpack
  * `babel-loader`

* Vue.js
  * `vue`
  * `vue-router`

* Vue.js + Webpack
  * `vue-loader`
  * `vue-template-compiler` - compiles Vue single file component templates

* Others
  * `rimraf` - like `rm`, but cross platform (especially for Windows)

### Scripts

* `"dev": "webpack-dev-server --progress --config config/webpack.dev.js"`
  * Run webpack dev server using development config
* `"prebuild": "rimraf dist"`
  * Invoked before build script, removes `dist` directory for cleaning purpose
* `"build": "webpack --config config/webpack.prod.js"`
  * Run webpack build using production config

## Webpack config files

Read [`config/webpack.base.js`](/config/webpack.base.js), [`config/webpack.dev.js`](/config/webpack.dev.js), and [`config/webpack.prod.js`](/config/webpack.prod.js).
