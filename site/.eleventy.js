const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets/");

    eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "userlibs",
		functionsDir: "./functions/",
		copy: ["utils/"],
		excludeDependencies: ["./_data/madlibs.js"]
	});
};