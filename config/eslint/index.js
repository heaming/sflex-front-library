/* eslint-disable quote-props */
const getConfigAlias = require('../utils/getConfigAlias');

const importResolver = {
  // https://github.com/benmosher/eslint-plugin-import/issues/1396
  [require.resolve('eslint-import-resolver-node')]: {},
};

try {
  importResolver[
    require.resolve('eslint-import-resolver-alias')
  ] = getConfigAlias();
} catch (e) {
  // ignore
}

module.exports = {
  root: true,

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    'airbnb-base',
    './autoImport.json',
  ],

  settings: {
    'import/resolver': importResolver,
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs', // ?
      '.ts',
      '.tsx',
    ],
  },

  ignorePatterns: [
    '**/*.ts',
  ],

  globals: {
    __IMPORT_META_ENV__: 'readonly',
    __VUE_TEST_APP__: 'readonly',
    __VUE_MOBILE_APP__: 'readonly',
  },

  rules: {
    // https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/issues/97
    'vuejs-accessibility/no-onchange': 'off',

    // conflict with quasar.
    'vuejs-accessibility/no-autofocus': 'off',

    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],

    // disable for convenience
    'prefer-destructuring': ['error', {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        object: false,
      },
    }, {
      enforceForRenamedProperties: false,
    }],

    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    'consistent-return': 'off',
    'default-case': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'object-curly-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',

    // allow during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
