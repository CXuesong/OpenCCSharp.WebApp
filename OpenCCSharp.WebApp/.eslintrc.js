// @ts-expect-error ts80001
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
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
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default
        "project": [
          "tsconfig.json",
          "src/tsconfig.json",
        ],
      },
    },
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
    // For svelte component props
    "import/no-mutable-exports": "off",
  },
};
