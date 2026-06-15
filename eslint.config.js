import js from "@eslint/js"
import {defineConfig} from "eslint/config"

export default defineConfig([
  {
    ignores: ["node_modules/**"]
  },
  {
    files: ["**/*.js"],
    plugins: {js},
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": ["error", {argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_"}]
    }
  }
])
