/* eslint-disable quote-props */
module.exports = {
  root: true,

  extends: [
    require.resolve('./config/eslint'),
  ],

  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? ['warn', { allow: ['error'] }] : 'off',
  },
};
