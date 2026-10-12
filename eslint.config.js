import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Agent worktrees are whole checkouts of their own; lint them from inside.
  globalIgnores(['dist', '.claude/worktrees']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['server/**', 'scripts/**'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
    },
  },
  {
    files: ['src/**/*.{js,jsx}', 'shared/**/*.js'],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']", message: 'Render untrusted text as React children; do not inject HTML.' },
        { selector: "AssignmentExpression[left.type='MemberExpression'][left.property.name=/^(innerHTML|outerHTML)$/]", message: 'Use textContent or React text rendering instead of an HTML sink.' },
        { selector: "CallExpression[callee.type='MemberExpression'][callee.property.name=/^(insertAdjacentHTML|write|writeln)$/]", message: 'Use safe text rendering; do not build HTML from strings.' },
      ],
    },
  },
  // The Express API and the dev scripts. Node globals, no React — so none of
  // the React plugins, and `globals.browser` would be wrong here.
  {
    files: ['server/**/*.js', 'scripts/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
