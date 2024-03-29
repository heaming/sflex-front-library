module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
  ],

  ignoreFiles: [
    'static/**/*.css',
  ],

  plugins: [
    'stylelint-order',
  ],

  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],

  rules: {
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'function-url-quotes': null,
    'max-line-length': 200,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
    'scss/no-global-function-names': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': null,
    'selector-pseudo-element-no-unknown': null,
    'selector-no-vendor-prefix': null,
  },
};
