const fg = require('fast-glob');
const shelljs = require('shelljs');
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

function moveTemplateIndex() {
  return {
    name: 'vite-plugin-move-template-index',

    closeBundle() {
      const absoluteDistPath = resolve(context, 'dist');

      shelljs.mv(
        resolve(absoluteDistPath, 'index/index.html'),
        absoluteDistPath,
      );

      shelljs.rm('-rf', resolve(absoluteDistPath, 'index'));
    },
  };
}

module.exports = ({
  mode, command, pages, pagesDir, envDir,
}) => {
  if (isEmpty(pages)) {
    pages = scanPages(pagesDir);
  }

  pages = Object.keys(pages)
    .reduce((a, v) => { a[v] = normalizePage(v, pages[v]); return a; }, {});

  const isBuild = command === 'build';
  const absoluteEnvPath = resolve(context, envDir || '');
  const env = loadEnv(mode, absoluteEnvPath);

  const plugins = [
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

  if (isBuild) {
    plugins.push(
      moveTemplateIndex(),
    );
  }

  return plugins;
};
