import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tailwind from 'eslint-plugin-tailwindcss';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
  },
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.webextensions, global: 'writable' } } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
