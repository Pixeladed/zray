const { config } = require('@swc/core/spack');
const { dependencies } = require('./package.json');

const externalModules = [...Object.keys(dependencies), 'electron'];
console.log('[spack]: external modules:', externalModules);

module.exports = config({
  externalModules,
  entry: {
    preload: __dirname + '/src/native/preload.ts',
    index: __dirname + '/src/native/entry.ts',
  },
  output: {
    path: __dirname + '/build/native',
  },
});
