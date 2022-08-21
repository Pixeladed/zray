const { config } = require('@swc/core/spack');
const packageJson = require('./package.json');

// Electron copies over all dependencies during build, so exclude them from bundling.
const PACKAGE_DEPENDENCIES = Object.keys(packageJson.dependencies).map(
  pkg => pkg
);

module.exports = config({
  externalModules: PACKAGE_DEPENDENCIES,
  entry: {
    preload: __dirname + '/src/native/preload.ts',
  },
  output: {
    path: __dirname + '/build/native',
  },
});
