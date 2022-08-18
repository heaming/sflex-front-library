module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
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
    'no-empty-source': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
    'scss/no-global-function-names': null,
    'selector-class-pattern': null,
    'selector-pseudo-element-no-unknown': null,
  },
};
