import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      perfectionist,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'perfectionist/sort-enums': 'warn',
      'perfectionist/sort-exports': 'warn',
      'perfectionist/sort-imports': 'warn',
      'perfectionist/sort-interfaces': [
        'warn',
        {
          groups: ['required-property', 'optional-property'],
          order: 'asc',
        },
      ],
      'perfectionist/sort-intersection-types': 'warn',
      'perfectionist/sort-jsx-props': 'warn',
      'perfectionist/sort-named-imports': 'warn',
      'perfectionist/sort-object-types': [
        'warn',
        {
          groups: ['required-property', 'optional-property'],
          order: 'asc',
        },
      ],
      'perfectionist/sort-objects': 'warn',
      'perfectionist/sort-union-types': [
        'warn',
        {
          groups: [
            'conditional',
            'function',
            'import',
            'intersection',
            'named',
            'object',
            'operator',
            'literal',
            'keyword',
            'tuple',
            'union',
            'nullish',
          ],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
    },
  },
];

export default eslintConfig;
