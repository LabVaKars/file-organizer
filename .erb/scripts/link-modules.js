const fs = require('fs');
const path = require('path')
// const {
//   appNodeModulesPath,
//   srcNodeModulesPath,
// } require('../configs/webpack.paths');

const rootPath = path.join(__dirname, '../..');
const releasePath = path.join(rootPath, 'release');
const appPath = path.join(releasePath, 'app');
const appNodeModulesPath = path.join(appPath, 'node_modules');
const srcPath = path.join(rootPath, 'src');
const srcNodeModulesPath = path.join(srcPath, 'node_modules');


if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
