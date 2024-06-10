module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "babel-eslint",
  },
  plugins: ["vue"],
  rules: {
    /* eslint:recommended */
    semi: ["error", "always"],
    indent: ["error", 2],
    "comma-spacing": ["error", { before: false, after: true }],

    /* plugin:vue/vue3-essential */
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/html-closing-bracket-spacing": ["error"],
    "vue/html-end-tags": ["error"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
        },
      },
    ],
  },
}
