module.exports = {
	plugins: ['unused-imports'],
	extends: ['turbo', 'prettier'],
	parserOptions: {},
	rules: {
		'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{ vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
		],
	},
};
