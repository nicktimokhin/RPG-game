// .eslintrc.cjs
module.exports = {
  extends: ['airbnb-base'],
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
  rules: {
    // Разрешить .js в импортах (обязательно для ESM)
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never', // ← но это не сработает в ESM!
      },
    ],
    // Вместо этого — отключите правило полностью:
    'import/extensions': 'off',

    // Игнорировать неиспользуемые импорты в тестах и классах
    'no-unused-vars': ['warn', { args: 'none' }],
    'import/prefer-default-export': 'off',

    // Разрешить глобалы Jest
    'no-undef': 'error',
  },
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      env: { jest: true },
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
};
