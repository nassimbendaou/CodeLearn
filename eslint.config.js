const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['node_modules/', '.expo/', 'web-build/', 'dist/', 'storybook-static/', 'Components/'] },
  { files: ['__tests__/**/*.js'], languageOptions: { globals: { describe: 'readonly', it: 'readonly', expect: 'readonly' } } },
]);
