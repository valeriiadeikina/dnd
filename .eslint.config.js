import jest from "eslint-plugin-jest";

export default [
  {
    languageOptions: {
      globals: {
        browser: true,
        node: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  },
  {
    files: ["**/*.test.js"],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        jest: "readonly",
      },
    },
    rules: {
      "jest/prefer-expect-assertions": "off",
    },
  },
];
