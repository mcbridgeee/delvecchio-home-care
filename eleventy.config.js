const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  // Add date filter
  eleventyConfig.addFilter('date', (dateObj, format = 'LLLL d, yyyy') => {
    let date = dateObj;
    if (date === 'now') {
      date = new Date();
    }
    if (!date) return '';
    const jsDate = date instanceof Date ? date : new Date(date);
    return DateTime.fromJSDate(jsDate, { zone: 'utc' }).toFormat(format);
  });

  // Passthrough copy for CSS
  eleventyConfig.addPassthroughCopy('src/style.css');
  eleventyConfig.addPassthroughCopy('src/images');

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_includes/layouts',
      output: '_site',
    },
    templateFormats: ['njk', 'md', 'html'],
  };
};
