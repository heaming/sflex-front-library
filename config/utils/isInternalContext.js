const { existsSync } = require('fs');
const { resolve } = require('path');

module.exports = () => existsSync(
  resolve(__dirname, '../../package-lock.json'),
);
