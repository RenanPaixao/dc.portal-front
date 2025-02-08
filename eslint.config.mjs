import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsRecommended from "@eslint/js/src/configs/eslint-recommended.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: jsRecommended
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
      root: true,
      env: { browser: true, es2020: true },
      extends: ['next/core-web-vitals', 'eslint:recommended', 'plugin:react-hooks/recommended'],
      ignorePatterns: ['*.d.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        parser: '@typescript-eslint/parser',
      },
      plugins: ['react-refresh', 'unused-imports'],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
        'no-unreachable': ['error'],
        'no-var': ['error'],
        'no-console': ['warn', {allow: ['warn', 'error']}],
        'no-debugger': ['warn'],
        'no-unused-vars': 'off', // This rule is handled by @typescript-eslint/no-unused-vars
        'prefer-destructuring': [
          'error',
          {object: true, array: false},
          {enforceForRenamedProperties: false},
        ],
        'require-jsdoc': 'off',
        "no-trailing-spaces": "error",
        'no-empty': 'warn',
        'require-await': 'warn',
        'no-extra-semi': 'off',
        semi: ['warn', 'never'],
        quotes: ['warn', 'single', {avoidEscape: true, 'allowTemplateLiterals': true}],
        'comma-dangle': ['warn', 'never'],
        'max-len': ['warn', {
          code: 120,
          ignoreUrls: true,
          tabWidth: 2,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
          ignoreComments: true,
        }],
        'func-call-spacing': ['warn', 'never'],
        'arrow-spacing': ['warn', {after: true, before: true}],
        'arrow-parens': ['warn', 'as-needed'],
        'no-multi-spaces': 'warn',
        'no-multiple-empty-lines': ['warn', {max: 1}],
        "space-before-blocks": ["error", "always"],
        'space-in-parens': ['warn', 'never'],
        "space-before-function-paren": ["warn", {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
        }],
        "array-bracket-spacing": ["error", "never"],
        "comma-spacing": ["error", {"before": false, "after": true}],
        "object-curly-spacing": ["error", "always"],
        "computed-property-spacing": ["error", "never"],
        'key-spacing': ['warn', {afterColon: true}],
        'keyword-spacing': ['warn', {after: true, before: true}],
        indent: ['warn', 2, {SwitchCase: 1}],
        eqeqeq: ['warn', 'always'],
        'curly': ['warn', 'all'],
        'brace-style': ['warn', '1tbs', {allowSingleLine: false}],
        
        
        // React
        'jsx-quotes': ['warn', 'prefer-single'],
        'react/jsx-indent': ['warn', 2],
        'react/jsx-indent-props': ['warn', 2],
        'react/jsx-tag-spacing': [
          'warn',
          {
            'closingSlash': 'never',
            'beforeSelfClosing': 'always',
            'afterOpening': 'never',
            'beforeClosing': 'never'
          }
        ],
        'react/jsx-curly-spacing': [
          'warn',
          { 'when': 'never', 'children': true }
        ],
        "react/jsx-equals-spacing": ["warn", "never"],
        "react/jsx-first-prop-new-line": ["warn", "multiline"],
        "react/jsx-closing-bracket-location": ["warn", "line-aligned"],
      },
      overrides: [
        {
          extends: ['plugin:@typescript-eslint/recommended'],
          files: ["*.ts", "*.tsx", "*.mts"],
          rules: {
            '@typescript-eslint/array-type': ['error', {default: 'array'}],
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', {
              argsIgnorePattern: '^_',
              varsIgnorePattern: '^_',
            }],
          }
        },
      ],
  })
];

export default eslintConfig;
