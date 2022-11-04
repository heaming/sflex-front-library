const { resolve } = require('path');
const { existsSync, readFileSync } = require('fs');

const isInternalContext = require('./isInternalContext');

const context = isInternalContext() ? resolve(__dirname, '../../') : process.cwd();
const configFiles = ['jsconfig.json', 'tsconfig.json'];
const reservedAlias = [
  ['~@assets', resolve(__dirname, '../../src/assets')],
  ['~@css', resolve(__dirname, '../../src/css')],
];

function getConfigFilePath(configDir) {
  // eslint-disable-next-line no-restricted-syntax
  for (const configFile of configFiles) {
    const normalizedPath = resolve(configDir, configFile);

    if (existsSync(normalizedPath)) {
      return normalizedPath;
    }
  }

  throw new Error(`The file "${configFiles.join('" or "')}" does not exist.`);
}

function getConfigCompilerOptions(configDir) {
  const configFilePath = getConfigFilePath(configDir);
  const { compilerOptions } = JSON.parse(readFileSync(configFilePath));

  return compilerOptions || {};
}

module.exports = (configDir = context) => {
  const { baseUrl = './', paths = {} } = getConfigCompilerOptions(configDir);
  const alias = [...reservedAlias];

  Object.keys(paths).forEach((v) => {
    const key = v.replace('/*', '');

    const isReserved = reservedAlias.some((e) => e[0] === key);
    if (isReserved) {
      throw new Error(`The alias '${key}' is reserved, do not use this.`);
    }

    const isDuplicated = alias.some((e) => e[0] === key);
    if (!isDuplicated) {
      const path = resolve(configDir, baseUrl, paths[v][0]?.replace('/*', ''));
      alias.push([key, path]);
    }
  });

  return alias;
};
