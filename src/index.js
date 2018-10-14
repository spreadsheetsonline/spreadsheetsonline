require('@babel/core').transform('code', {
  presets: ['@babel/preset-es2017'],
});

module.exports = require('./server');
