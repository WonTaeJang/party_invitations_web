/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ["vue"],
  rules: {
    'keyword-spacing': 1,
    'space-before-function-paren': 1,
    'comma-spacing': 1,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multi-word-component-names': [
      'error', {
        'ignores': [
          'Index', 
          'Icon', 
          'Loading',
          'Intro',
        ]
      }]
  },
}
