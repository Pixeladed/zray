const { config } = require('@swc/core/spack');
const packageJson = require('./package.json');

module.exports = config({
  externalModules: ['electron', 'electron-store'],
  entry: {
    preload: __dirname + '/src/native/preload.ts',
  },
  output: {
    path: __dirname + '/build/native',
  },
});
