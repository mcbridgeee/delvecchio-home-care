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

  // Image optimization
  const Image = require('@11ty/eleventy-img');

  eleventyConfig.addNunjucksAsyncShortcode(
    'image',
    async function (src, alt, sizes = '100vw', classes = '') {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
      }

      // prepend src/ if it's not strictly absolute path starting with / or ./,
      // but in this project context images seem to be in src/images.
      // The previous usage was {{ '/images/foo.png' | url }} which resolves to /delvecchio-home-care/images/foo.png in prod
      // We need to point to the source file on disk.
      // Based on file list, images are in src/images.
      // The inputs in index.njk are like '/images/carpentry.png'.
      // We should strip the leading slash and prepend src.

      let fileInput = src;
      if (src.startsWith('/')) {
        fileInput = '.' + src; // e.g. ./images/carpentry.png
        // But wait, the images are in src/images. And we are running from root.
        // So ./src/images/carpentry.png would be correct if src was /src/images...
        // The src in index.njk is "/images/carpentry.png" relative to site root (which is src/).
        fileInput = 'src' + src;
      }

      let metadata = await Image(fileInput, {
        widths: [300, 600, 900],
        formats: ['avif', 'webp', 'jpeg'],
        outputDir: './_site/images/',
        urlPath: '/delvecchio-home-care/images/',
      });

      let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
        class: classes,
      };

      return Image.generateHTML(metadata, imageAttributes);
    }
  );

  eleventyConfig.addNunjucksAsyncShortcode('imageUrl', async function (src) {
    let fileInput = src;
    if (src.startsWith('/')) {
      fileInput = 'src' + src;
    }

    let metadata = await Image(fileInput, {
      widths: [1200], // Optimize for a reasonable max width for background
      formats: ['webp'],
      outputDir: './_site/images/',
      urlPath: '/delvecchio-home-care/images/',
    });

    return metadata.webp[0].url;
  });

  // Passthrough copy for CSS
  eleventyConfig.addPassthroughCopy('src/style.css');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_includes/layouts',
      output: '_site',
    },
    templateFormats: ['njk', 'md', 'html'],
    pathPrefix: '/delvecchio-home-care/',
  };
};
