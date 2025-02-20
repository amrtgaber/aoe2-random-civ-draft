module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    // recommended rules
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'declaration-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,
    'import-notation': null,
    'no-empty-source': null,
    'block-no-empty': null,
    'length-zero-no-unit': null,
    'no-descending-specificity': null,
    'scss/double-slash-comment-empty-line-before': null,
    'color-function-notation': null,
  },
};
