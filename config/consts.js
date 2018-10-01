const path = require('path');

// resolves directory relative to root directory
function resolve(dir = '') {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  dirRoot: resolve(),
  dirSource: resolve('src/'),
  dirDestination: resolve('dist/'),
};
