module.exports = {
	linters: {
		'src/**/*.{js,jsx,md,ts,sass,less,graphql,yaml,json}': [
			// 'eslint --fix',
			'prettier --write',
			'git add',
		],
	},
}
