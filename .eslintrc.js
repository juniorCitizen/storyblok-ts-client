module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    souceType: "module"
  },
  plugins: ["node", "promise", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:promise/recommended"
  ],
  rules: {
    "promise/no-callback-in-promise": "off",
    "promise/no-nesting": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        trailingComma: "es5",
        bracketSpacing: false,
        jsxBracketSameLine: true,
        arrowParens: "avoid",
        parser: "babylon",
        proseWrap: "never"
      }
    ],
    "no-console": "off",
    "no-debugger": isProdMode ? "error" : "off"
  }
}
