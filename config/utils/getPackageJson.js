const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = () => {
  const packageJsonPath = resolve(__dirname, '../../package.json');
  return JSON.parse(readFileSync(packageJsonPath));
};
