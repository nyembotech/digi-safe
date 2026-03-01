/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    'alpha-value-notation': 'percentage',
    'color-function-notation': 'modern',
    'selector-class-pattern': [
      '^[a-z0-9\\-]+$',
      {
        message: 'Class selectors should be kebab-case to align with Tailwind conventions.',
      },
    ],
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
};
