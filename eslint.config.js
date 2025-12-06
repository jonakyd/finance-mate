import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier/flat";
import vitest from "@vitest/eslint-plugin";
import globals from "globals";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  prettier,
  {
    files: ["**/*.vitest.ts", "**/*.vitest.tsx"],
    ...vitest.configs.recommended,
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        // Enable parsing of modern ECMAScript features and include global config files
        projectService: {
          allowDefaultProject: ["yarn.config.cjs", "eslint.config.js"],
        },
      },
    },
    settings: {
      // React version detection for eslint-plugin-react
      react: { version: "detect" },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
);
