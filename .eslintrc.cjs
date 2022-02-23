module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', 'simple-import-sort'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
	},
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'@typescript-eslint/no-empty-interface': 'off',
	},
}
