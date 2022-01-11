const pageAssetsPlugin = require('./helpers/page-assets');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');
const moment = require('moment-timezone');
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addFilter("dateformat", function(dateIn) {
    moment.locale('ru');
      return moment(dateIn).tz('Europe/Moscow').format('DD MMMM YYYY');
  });

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addPlugin(pageAssetsPlugin, {
    mode: "directory",
    postsMatching: ["src/blog/**/*.md", "src/ytmap/**/*.md"],
    recursive: true,
  });

  // eleventyConfig.addPlugin(pageAssetsPlugin, {
  //   mode: "directory",
  //   postsMatching: "src/ytmap/**/*.md",
  //   recursive: true,
  // });

  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('consoleDump', function(asd) {
    console.log(asd);
  });

  eleventyConfig.addFilter('categoryFilter', function(collection, category) {
    if (!category) return false;
      const filtered = collection.filter(item => item.data.cat == category)
      return filtered;
  });

  eleventyConfig.addFilter('filterLastArticles', (array) => {
    let lastElement = [];
    lastElement.push(array[array.length - 1]);
    return lastElement;
  });

  return {
    addPassthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "app",
      includes: "includes",
      layouts: "layouts",
      data: "_data",
    }
  }
}
