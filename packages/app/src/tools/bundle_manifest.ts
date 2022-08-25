import fs from 'fs';
import path from 'path';
import manifest from '../../package.json';

const content = { ...manifest };
console.log('omitting monorepo packages from package.json');
Object.keys(content.dependencies).forEach(pkg => {
  if (pkg.startsWith('@highbeam')) {
    delete content.dependencies[pkg as keyof typeof content.dependencies];
  }
});

console.log('writing package.json to build folder');
fs.writeFileSync(
  path.resolve(__dirname, '../../build/package.json'),
  JSON.stringify(content, null, 2)
);
