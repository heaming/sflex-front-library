const fg = require('fast-glob');
const { resolve } = require('path');
const { loadEnv } = require('vite');
const { default: mpa } = require('vite-plugin-mpa');
const { default: htmlTemplate } = require('vite-plugin-html-template');
const { isEmpty } = require('lodash');

const context = process.cwd();

const normalizePage = (entryName, page) => ({
  template: page.template || 'index.html',
  title: page.title || entryName.toUpperCase(),
});

function scanPages(pagesDir) {
  const regex = new RegExp(`${pagesDir}/(\\w+)/main\\.js$`);
  const getEntryName = (path) => path.match(regex)[1];

  return fg.sync(`${pagesDir}/*/main.js`)
    .reduce((a, v) => { a[getEntryName(v)] = {}; return a; }, {});
}

module.exports = ({
  mode, command, pages, pagesDir, envDir,
}) => {
  if (isEmpty(pages)) {
    pages = scanPages(pagesDir);
  }

  pages = Object.keys(pages)
    .reduce((a, v) => { a[v] = normalizePage(v, pages[v]); return a; }, {});

  const absoluteEnvPath = resolve(context, envDir || '');
  const env = loadEnv(mode, absoluteEnvPath);

  return [
    mpa({ scanDir: pagesDir, open: false }),

    htmlTemplate({
      pagesDir,
      pages,
      data: {
        MODE: mode,
        DEV: command === 'serve',
        PROD: command === 'build',
        ...env,
      },
    }),
  ];
};
