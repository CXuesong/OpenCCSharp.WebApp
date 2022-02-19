// @ts-expect-error ts80001
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "airbnb-base",
    "airbnb-typescript/base",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
    project: ["./tsconfig.json", "./src/tsconfig.json"],
    extraFileExtensions: [".svelte"],
    // https://github.com/typescript-eslint/typescript-eslint/issues/540
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "svelte3",
    "@typescript-eslint",
  ],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  settings: {
    "svelte3/typescript": true,
  },
  rules: {
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
      },
    ],
    "linebreak-style": "off",
    "import/prefer-default-export": "off",
    indent: [
      "warn",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "import/extensions": "off",
    "arrow-body-style": "off",
    "max-len": [
      "error",
      180,
    ],
    "no-underscore-dangle": [
      "error",
      {
        allow: [
          "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
        ],
        allowAfterThis: true,
        allowAfterSuper: true,
        enforceInMethodNames: true,
        allowAfterThisConstructor: false,
      },
    ],
    "no-constant-condition": [
      "error",
      {
        checkLoops: false,
      },
    ],
    "no-await-in-loop": "off",
    "no-param-reassign": "off",
    // Overridden
    "no-mixed-operators": [
      "error",
      {
        groups: [
          ["%", "**"],
          ["%", "+"],
          ["%", "-"],
          ["%", "*"],
          ["%", "/"],
          ["/", "*"],
          ["&", "|", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!=="],
          // ["&&", "||"]
        ],
        allowSamePrecedence: false,
      },
    ],
    "@typescript-eslint/triple-slash-reference": "off",
    "no-restricted-syntax": "off",
    "class-methods-use-this": "off",
    "max-classes-per-file": "off",
    "no-plusplus": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    // For svelte component props
    "import/no-mutable-exports": "off",
  },
};
