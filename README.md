# eslint-plugin-jsdoc-tag-lines

ESLint plugin for enforcing stable JSDoc tag-line formatting.

## Installation

```sh
npm install --save-dev eslint-plugin-jsdoc-tag-lines
```

## Usage

```js
import jsdocTagLines from "eslint-plugin-jsdoc-tag-lines"
import {defineConfig} from "eslint/config"

export default defineConfig([
  {
    files: ["src/**/*.js"],
    plugins: {
      "jsdoc-tag-lines": jsdocTagLines
    },
    rules: {
      "jsdoc-tag-lines/jsdoc-tag-lines": "error"
    }
  }
])
```

## Rule

`jsdoc-tag-lines/jsdoc-tag-lines` enforces two formatting contracts:

- Tag lines in multi-line JSDoc blocks must keep the leading `*`, for example `* @type {string}`.
- Inline JSDoc type casts must be tag-only, for example `/** @type {string} */ (value)`.
