module.exports = {
  plugins: ["import", "solid"],
  extends: ["eslint:recommended", "plugin:import/recommended", "plugin:solid/recommended", "prettier"],
  overrides: [
    {
      // enable eslint-plugin-testing-library rules or preset only for matching files!
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:vitest/recommended"],
    },
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript", "plugin:solid/typescript"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
  rules: {
    "import/no-unresolved": "error",
    "import/no-named-as-default": "off",
    "import/no-unused-modules": "off",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
      alias: {
        map: [
          ["@blueprint", "./src/blueprint"],
          ["@", "./src"],
        ],
      },
    },
  },
  env: {
    browser: true,
    node: true,
  },
};
