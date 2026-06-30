import playwright from "eslint-plugin-playwright";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/plugin";

export default [
  {
    files: ["**/*.ts", "**/*.spec.ts"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "playwright": playwright,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        process: "readonly",
      },
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "playwright/no-missing-await": "error",
      "playwright/no-focused-test": "warn",
    },
  },
];