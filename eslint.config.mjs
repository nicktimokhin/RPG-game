// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';

export default [
  // Общие правила для всех JS-файлов (src + tests)
  {
    files: ['src/**/*.js', '__tests__/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-undef': 'error',
      'no-console': 'warn',
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
    },
  },
  // ОТКЛЮЧАЕМ no-unused-vars ТОЛЬКО ДЛЯ src/
  {
    files: ['src/**/*.js'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
  // Для тестов можно оставить предупреждение или тоже отключить
  {
    files: ['__tests__/**/*.js'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
];
