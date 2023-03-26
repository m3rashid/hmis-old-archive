const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");

module.exports = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
	resolver: {
		resolveRequest: MetroSymlinksResolver(),
	},
};
