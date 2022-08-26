import { exec } from 'child_process';
import path from 'path';

const dirs = [
  path.resolve(__dirname + '../../../build'),
  path.resolve(__dirname + '../../../dist'),
  path.resolve(__dirname + '../../../bundle'),
];

dirs.forEach(dir => {
  exec(`rm -rf ${dir}`).stdout?.pipe(process.stdout);
});
