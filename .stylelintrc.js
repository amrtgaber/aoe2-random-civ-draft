module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-prettier'],
  rules: {
    // recommended rules
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'declaration-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,
    'import-notation': null,
    'no-empty-source': null,
    'block-no-empty': null,
  },
};
