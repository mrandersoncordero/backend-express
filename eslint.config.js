const globals = require("globals");
const pluginJs = require("@eslint/js");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2018, // Establecer la versión de ECMAScript
      sourceType: "commonjs",
      globals: globals.browser,
    },
    settings: {},
    rules: {
      "no-console": "warn", // Advertir sobre el uso de console.log
      "semi": ["error", "always"], // Requerir punto y coma
    },
  },
  {
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: 2018,
    },
  },
  pluginJs.configs.recommended,
  prettier,
];
