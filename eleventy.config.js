module.exports = function (eleventyConfig) {
    // Copy static assets straight through to the built site.
    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/images");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "_site",
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    };
};
