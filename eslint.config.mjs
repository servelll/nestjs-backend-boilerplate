// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs']
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest
            },
            sourceType: 'commonjs',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', vars: 'local', caughtErrors: 'none' }],
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1,
                    ignoredNodes: ['PropertyDefinition']
                }
            ],
            'comma-dangle': ['error', 'never'],
            quotes: ['warn', 'single', { avoidEscape: true }],
            semi: ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'key-spacing': [
                'error',
                {
                    afterColon: true
                }
            ],
            'no-multi-spaces': 'error',
            'space-before-function-paren': 'off',
            'max-len': [
                'error',
                {
                    code: 120,
                    ignoreComments: true,
                    ignorePattern: '^import .*',
                    ignoreStrings: true,
                    ignoreRegExpLiterals: true,
                    ignoreTrailingComments: true,
                    ignoreUrls: true
                }
            ]
        }
    }
);
