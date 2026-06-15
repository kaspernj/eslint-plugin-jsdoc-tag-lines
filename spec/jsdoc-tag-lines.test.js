// @ts-check

import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {Linter} from "eslint"
import jsdocTagLines from "../index.js"

/**
 * Runs the JSDoc tag-line plugin against source text.
 * @param {string} source - JavaScript source.
 * @returns {import("eslint").Linter.LintMessage[]} Lint messages.
 */
function lintSource(source) {
  const linter = new Linter({configType: "flat"})

  return linter.verify(source, [
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      plugins: {
        "jsdoc-tag-lines": jsdocTagLines
      },
      rules: {
        "jsdoc-tag-lines/jsdoc-tag-lines": "error"
      }
    }
  ], {filename: "example.js"})
}

describe("jsdoc-tag-lines rule", () => {
  it("allows standard JSDoc type tags and inline type casts", () => {
    const messages = lintSource(`
      /**
       * Model class.
       * @type {typeof import("../database/record/index.js").default | undefined}
       */
      const ModelClass = undefined

      const value = /** @type {string} */ ("name")
    `)

    assert.deepEqual(messages, [])
  })

  it("allows ordinary JSDoc prose that mentions type tags", () => {
    const messages = lintSource(`
      /** Use @type to annotate values. */
      const value = "name"

      /**
       * @deprecated use @type instead.
       */
      function oldValue() {
        return value
      }
    `)

    assert.deepEqual(messages, [])
  })

  it("rejects multi-line JSDoc tag lines without an asterisk prefix", () => {
    const messages = lintSource(`
      /**
       * Model class.
        @type {typeof import("../database/record/index.js").default | undefined} */
      const ModelClass = undefined
    `)

    assert.deepEqual(messages.map((message) => message.message), [
      "JSDoc tag lines in multi-line comments must start with `* @tag`."
    ])
  })

  it("rejects inline type casts with prose before the tag", () => {
    const messages = lintSource(`
      const value = /** Narrows the runtime value to the documented type. @type {string} */ ("name")
    `)

    assert.deepEqual(messages.map((message) => message.message), [
      "Inline JSDoc type casts must start with `@type`; move prose to a normal comment."
    ])
  })
})
