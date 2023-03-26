module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: ["module-resolver"],
	"env": {
		"production": {
			"plugins": ["transform-remove-console"]
		},
	}
};
