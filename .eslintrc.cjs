module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    indent: ["error", 2, { "SwitchCase": 1 }],
    'vue/html-indent': ['error', 2],
  },
}
